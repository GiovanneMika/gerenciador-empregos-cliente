/* === Validador de Protocolo ===
 * 
 * Este módulo valida se as respostas do servidor estão de acordo com o protocolo.
 * Quando detecta inconsistências, envia automaticamente um POST para /error
 * informando o problema encontrado.
 */

/**
 * Envia erro de protocolo para o servidor
 * POST /error
 * @param {string} message - Mensagem descrevendo o erro
 */
async function reportProtocolError(message) {
    const apiBase = localStorage.getItem('apiServerUrl') || 'http://localhost:22000';
    const token = sessionStorage.getItem('companyToken') || sessionStorage.getItem('jwtToken');

    try {
        const headers = { 'Content-Type': 'application/json' };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        await fetch(`${apiBase}/error`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ message })
        });

        console.warn('🚨 Protocol error reported:', message);
    } catch (e) {
        console.error('Failed to report protocol error:', e);
    }
}

/**
 * Tipos de dados suportados para validação
 */
const DataTypes = {
    STRING: 'string',
    NUMBER: 'number',
    INTEGER: 'integer',
    BOOLEAN: 'boolean',
    ARRAY: 'array',
    OBJECT: 'object',
    EMAIL: 'email',
    NULLABLE_STRING: 'nullable_string',
    NULLABLE_NUMBER: 'nullable_number'
};

/**
 * Verifica o tipo de um valor
 * @param {*} value - Valor a verificar
 * @param {string} expectedType - Tipo esperado (de DataTypes)
 * @returns {boolean}
 */
function checkType(value, expectedType) {
    switch (expectedType) {
        case DataTypes.STRING:
            return typeof value === 'string';
        case DataTypes.NUMBER:
            return typeof value === 'number' && !isNaN(value);
        case DataTypes.INTEGER:
            return Number.isInteger(value);
        case DataTypes.BOOLEAN:
            return typeof value === 'boolean';
        case DataTypes.ARRAY:
            return Array.isArray(value);
        case DataTypes.OBJECT:
            return typeof value === 'object' && value !== null && !Array.isArray(value);
        case DataTypes.EMAIL:
            return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        case DataTypes.NULLABLE_STRING:
            return value === null || typeof value === 'string';
        case DataTypes.NULLABLE_NUMBER:
            return value === null || (typeof value === 'number' && !isNaN(value));
        default:
            return true;
    }
}

/**
 * Valida resposta do servidor contra um schema esperado
 * @param {object} data - Dados recebidos do servidor
 * @param {object} schema - Schema esperado { field: { type, required, nullable } }
 * @param {string} context - Contexto da validação (ex: "GET /users/1")
 * @returns {boolean} - true se válido, false se encontrou erros
 */
function validateResponse(data, schema, context = '') {
    if (!data || typeof data !== 'object') {
        reportProtocolError(`${context}: Response is not a valid object`);
        return false;
    }

    let isValid = true;

    for (const [field, rules] of Object.entries(schema)) {
        const value = data[field];
        const isRequired = rules.required !== false; // default: required
        const expectedType = rules.type;
        const isNullable = rules.nullable === true;

        // Verifica campo obrigatório ausente
        if (!(field in data)) {
            if (isRequired) {
                reportProtocolError(`${context}: Index '${field}' not found in server data.`);
                isValid = false;
            }
            continue;
        }

        // Verifica valor null quando não permitido
        if (value === null && !isNullable) {
            reportProtocolError(`${context}: Field '${field}' is null but should not be nullable.`);
            isValid = false;
            continue;
        }

        // Pula verificação de tipo se valor é null e é nullable
        if (value === null && isNullable) {
            continue;
        }

        // Verifica tipo
        if (expectedType && !checkType(value, expectedType)) {
            const actualType = Array.isArray(value) ? 'array' : typeof value;
            reportProtocolError(`${context}: Field '${field}' has wrong type. Expected '${expectedType}', got '${actualType}'.`);
            isValid = false;
        }

        // Validação de enum se especificado
        if (rules.enum && !rules.enum.includes(value)) {
            reportProtocolError(`${context}: Field '${field}' has invalid value '${value}'. Expected one of: ${rules.enum.join(', ')}`);
            isValid = false;
        }

        // Validação de min/max para números
        if (expectedType === DataTypes.NUMBER || expectedType === DataTypes.INTEGER) {
            if (rules.min !== undefined && value < rules.min) {
                reportProtocolError(`${context}: Field '${field}' value ${value} is below minimum ${rules.min}.`);
                isValid = false;
            }
            if (rules.max !== undefined && value > rules.max) {
                reportProtocolError(`${context}: Field '${field}' value ${value} is above maximum ${rules.max}.`);
                isValid = false;
            }
        }

        // Validação de minLength/maxLength para strings
        if (expectedType === DataTypes.STRING && typeof value === 'string') {
            if (rules.minLength !== undefined && value.length < rules.minLength) {
                reportProtocolError(`${context}: Field '${field}' length ${value.length} is below minimum ${rules.minLength}.`);
                isValid = false;
            }
            if (rules.maxLength !== undefined && value.length > rules.maxLength) {
                reportProtocolError(`${context}: Field '${field}' length ${value.length} is above maximum ${rules.maxLength}.`);
                isValid = false;
            }
        }
    }

    return isValid;
}

/**
 * Valida um array de items contra um schema
 * @param {array} items - Array de objetos a validar
 * @param {object} itemSchema - Schema para cada item
 * @param {string} context - Contexto da validação
 * @returns {boolean}
 */
function validateArrayItems(items, itemSchema, context = '') {
    if (!Array.isArray(items)) {
        reportProtocolError(`${context}: Expected array but got ${typeof items}.`);
        return false;
    }

    let isValid = true;
    items.forEach((item, index) => {
        if (!validateResponse(item, itemSchema, `${context}[${index}]`)) {
            isValid = false;
        }
    });

    return isValid;
}

// =====================
// SCHEMAS DO PROTOCOLO
// =====================

/**
 * Schemas para validação de respostas
 */
const ProtocolSchemas = {
    // === USERS ===
    user: {
        id: { type: DataTypes.INTEGER, required: false }, // pode vir como 'id' ou não vir
        name: { type: DataTypes.STRING },
        username: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING, required: false },
        phone: { type: DataTypes.STRING, required: false },
        education: { type: DataTypes.STRING, required: false },
        experience: { type: DataTypes.STRING, required: false }
    },

    // === COMPANIES ===
    company: {
        id: { type: DataTypes.INTEGER, required: false },
        name: { type: DataTypes.STRING },
        business: { type: DataTypes.STRING },
        username: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        phone: { type: DataTypes.STRING },
        street: { type: DataTypes.STRING },
        number: { type: DataTypes.STRING },
        city: { type: DataTypes.STRING },
        state: { type: DataTypes.STRING }
    },

    // === JOBS ===
    job: {
        job_id: { type: DataTypes.INTEGER },
        title: { type: DataTypes.STRING, minLength: 3, maxLength: 150 },
        area: { type: DataTypes.STRING },
        description: { type: DataTypes.STRING, minLength: 10, maxLength: 5000 },
        company: { type: DataTypes.STRING },
        state: { type: DataTypes.STRING },
        city: { type: DataTypes.STRING },
        salary: { type: DataTypes.NUMBER, required: false, nullable: true },
        contact: { type: DataTypes.STRING }
    },

    // Job em listagem (pode ter menos campos)
    jobListItem: {
        job_id: { type: DataTypes.INTEGER },
        title: { type: DataTypes.STRING },
        area: { type: DataTypes.STRING },
        company: { type: DataTypes.STRING },
        description: { type: DataTypes.STRING },
        state: { type: DataTypes.STRING },
        city: { type: DataTypes.STRING },
        salary: { type: DataTypes.NUMBER, required: false, nullable: true },
        contact: { type: DataTypes.STRING }
    },

    // Candidatura do usuário (inclui feedback)
    userApplication: {
        job_id: { type: DataTypes.INTEGER },
        title: { type: DataTypes.STRING },
        area: { type: DataTypes.STRING },
        company: { type: DataTypes.STRING },
        description: { type: DataTypes.STRING },
        state: { type: DataTypes.STRING },
        city: { type: DataTypes.STRING },
        salary: { type: DataTypes.NUMBER, required: false, nullable: true },
        contact: { type: DataTypes.STRING },
        feedback: { type: DataTypes.NULLABLE_STRING, nullable: true }
    },

    // Candidato de uma vaga
    jobApplicant: {
        user_id: { type: DataTypes.INTEGER },
        name: { type: DataTypes.STRING },
        email: { type: DataTypes.NULLABLE_STRING, required: false, nullable: true },
        phone: { type: DataTypes.NULLABLE_STRING, required: false, nullable: true },
        education: { type: DataTypes.STRING },
        experience: { type: DataTypes.STRING }
    },

    // Resposta simples com message
    simpleMessage: {
        message: { type: DataTypes.STRING }
    },

    // Erro de validação (422)
    validationError: {
        message: { type: DataTypes.STRING },
        code: { type: DataTypes.STRING, required: false },
        details: { type: DataTypes.ARRAY, required: false }
    },

    // Item de detalhe de erro
    validationErrorDetail: {
        field: { type: DataTypes.STRING },
        error: { type: DataTypes.STRING }
    }
};

// =====================
// FUNÇÕES DE VALIDAÇÃO ESPECÍFICAS
// =====================

/**
 * Valida resposta de GET /users/{id}
 */
function validateUserResponse(data, context = 'GET /users/{id}') {
    if (data.status !== 200) return true; // Só valida sucesso
    return validateResponse(data, ProtocolSchemas.user, context);
}

/**
 * Valida resposta de GET /companies/{id}
 */
function validateCompanyResponse(data, context = 'GET /companies/{id}') {
    if (data.status !== 200) return true;
    return validateResponse(data, ProtocolSchemas.company, context);
}

/**
 * Valida resposta de GET /jobs/{id}
 */
function validateJobResponse(data, context = 'GET /jobs/{id}') {
    if (data.status !== 200) return true;
    return validateResponse(data, ProtocolSchemas.job, context);
}

/**
 * Valida resposta de POST /jobs/search
 */
function validateJobSearchResponse(data, context = 'POST /jobs/search') {
    if (data.status !== 200) return true;
    
    if (!('items' in data)) {
        reportProtocolError(`${context}: Index 'items' not found in server data.`);
        return false;
    }
    
    return validateArrayItems(data.items, ProtocolSchemas.jobListItem, context);
}

/**
 * Valida resposta de POST /companies/{id}/jobs (vagas da empresa)
 */
function validateCompanyJobsResponse(data, context = 'POST /companies/{id}/jobs') {
    if (data.status !== 200) return true;
    
    if (!('items' in data)) {
        reportProtocolError(`${context}: Index 'items' not found in server data.`);
        return false;
    }
    
    return validateArrayItems(data.items, ProtocolSchemas.jobListItem, context);
}

/**
 * Valida resposta de GET /users/{id}/jobs (candidaturas do usuário)
 */
function validateUserApplicationsResponse(data, context = 'GET /users/{id}/jobs') {
    if (data.status !== 200) return true;
    
    if (!('items' in data)) {
        reportProtocolError(`${context}: Index 'items' not found in server data.`);
        return false;
    }
    
    return validateArrayItems(data.items, ProtocolSchemas.userApplication, context);
}

/**
 * Valida resposta de GET /companies/{id}/jobs/{job_id} (candidatos de uma vaga)
 */
function validateJobApplicantsResponse(data, context = 'GET /companies/{id}/jobs/{job_id}') {
    if (data.status !== 200) return true;
    
    if (!('items' in data)) {
        reportProtocolError(`${context}: Index 'items' not found in server data.`);
        return false;
    }
    
    return validateArrayItems(data.items, ProtocolSchemas.jobApplicant, context);
}

/**
 * Valida resposta de erro 422
 */
function validateValidationErrorResponse(data, context = 'Validation Error') {
    if (data.status !== 422) return true;
    
    const isValid = validateResponse(data, ProtocolSchemas.validationError, context);
    
    if (data.details && Array.isArray(data.details)) {
        validateArrayItems(data.details, ProtocolSchemas.validationErrorDetail, `${context} details`);
    }
    
    return isValid;
}

// Exporta para uso global
window.ProtocolValidator = {
    DataTypes,
    ProtocolSchemas,
    reportProtocolError,
    validateResponse,
    validateArrayItems,
    validateUserResponse,
    validateCompanyResponse,
    validateJobResponse,
    validateJobSearchResponse,
    validateCompanyJobsResponse,
    validateUserApplicationsResponse,
    validateJobApplicantsResponse,
    validateValidationErrorResponse
};

console.log('✅ Protocol Validator loaded');
