/* === API para Vagas de Emprego === */

// Lista de áreas padronizadas conforme protocolo
const JOB_AREAS = [
    'Administração',
    'Agricultura',
    'Artes',
    'Atendimento ao Cliente',
    'Comercial',
    'Comunicação',
    'Construção Civil',
    'Consultoria',
    'Contabilidade',
    'Design',
    'Educação',
    'Engenharia',
    'Finanças',
    'Jurídica',
    'Logística',
    'Marketing',
    'Produção',
    'Recursos Humanos',
    'Saúde',
    'Segurança',
    'Tecnologia da Informação',
    'Telemarketing',
    'Vendas',
    'Outros'
];

// Lista de estados brasileiros
const BRAZILIAN_STATES = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

/**
 * Obtém a URL base da API
 */
function getApiBase() {
    return localStorage.getItem('apiServerUrl') || 'http://localhost:22000';
}

/**
 * Obtém o token correto (usuário ou empresa)
 */
function getAuthToken() {
    return sessionStorage.getItem('companyToken') || sessionStorage.getItem('jwtToken');
}

/**
 * Verifica se é uma empresa logada
 */
function isCompanyLogged() {
    return !!sessionStorage.getItem('companyToken');
}

/**
 * Verifica se é um usuário logado
 */
function isUserLogged() {
    return !!sessionStorage.getItem('jwtToken');
}

/**
 * Decodifica JWT para obter informações
 */
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

/**
 * Faz requisição para a API de Jobs
 * @param {string} endpoint - Caminho do endpoint
 * @param {string} method - Método HTTP
 * @param {object} body - Corpo da requisição (opcional)
 * @returns {Promise<object>}
 */
async function jobsApiCall(endpoint, method = 'GET', body = null) {
    const url = `${getApiBase()}${endpoint}`;
    const token = getAuthToken();
    
    const headers = {
        'Content-Type': 'application/json'
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    try {
        const options = {
            method: method,
            headers: headers
        };
        
        if (body && method !== 'GET') {
            options.body = JSON.stringify(body);
        }
        
        const response = await fetch(url, options);
        const data = await response.json();
        
        data.status = response.status;
        
        // Tratamento de erro 401 (token inválido)
        if (response.status === 401) {
            handleUnauthorized();
        }
        
        return data;
    } catch (error) {
        console.error('Erro na API de Jobs:', error);
        return {
            status: 0,
            message: 'Falha na conexão com o servidor'
        };
    }
}

/**
 * Trata erro de autorização
 */
function handleUnauthorized() {
    sessionStorage.clear();
    alert('❌ Sessão expirada. Redirecionando para login...');
    window.location.href = 'login-selection.html';
}

/**
 * Envia erro de protocolo para o servidor (fallback)
 * @param {string} message - Mensagem de erro
 */
async function reportProtocolError(message) {
    try {
        await jobsApiCall('/error', 'POST', { message });
        console.warn('Protocol error reported:', message);
    } catch (e) {
        console.error('Failed to report protocol error:', e);
    }
}

/**
 * Valida se resposta contém campos esperados
 * @param {object} data - Dados recebidos
 * @param {array} expectedFields - Campos esperados
 * @returns {boolean}
 */
function validateResponseFields(data, expectedFields) {
    for (const field of expectedFields) {
        if (!(field in data)) {
            reportProtocolError(`Index '${field}' not found in server data.`);
            return false;
        }
    }
    return true;
}

// =====================
// CRUD DE VAGAS
// =====================

/**
 * Criar vaga (apenas empresa)
 * POST /jobs
 */
async function createJob(jobData) {
    return await jobsApiCall('/jobs', 'POST', jobData);
}

/**
 * Ler dados de uma vaga específica
 * GET /jobs/{job_id}
 */
async function getJob(jobId) {
    const data = await jobsApiCall(`/jobs/${jobId}`, 'GET');
    
    if (data.status === 200) {
        const expectedFields = ['job_id', 'title', 'area', 'description', 'company', 'state', 'city', 'contact'];
        validateResponseFields(data, expectedFields);
    }
    
    return data;
}

/**
 * Buscar vagas com filtros
 * POST /jobs/search
 */
async function searchJobs(filters = {}) {
    const body = {
        filters: [filters]
    };
    
    const data = await jobsApiCall('/jobs/search', 'POST', body);
    return data;
}

/**
 * Buscar vagas da empresa logada
 * POST /companies/{company_id}/jobs
 */
async function getCompanyJobs(companyId, filters = {}) {
    const body = {
        filters: [filters]
    };
    
    return await jobsApiCall(`/companies/${companyId}/jobs`, 'POST', body);
}

/**
 * Atualizar vaga (apenas empresa dona)
 * PATCH /jobs/{job_id}
 */
async function updateJob(jobId, jobData) {
    return await jobsApiCall(`/jobs/${jobId}`, 'PATCH', jobData);
}

/**
 * Deletar vaga (apenas empresa dona)
 * DELETE /jobs/{job_id}
 */
async function deleteJob(jobId) {
    return await jobsApiCall(`/jobs/${jobId}`, 'DELETE');
}

// =====================
// CANDIDATURAS
// =====================

/**
 * Aplicar a uma vaga (apenas usuário)
 * POST /jobs/{job_id}
 */
async function applyToJob(jobId, applicationData) {
    return await jobsApiCall(`/jobs/${jobId}`, 'POST', applicationData);
}

/**
 * Listar candidaturas do usuário logado
 * GET /users/{user_id}/jobs
 */
async function getUserApplications(userId) {
    const data = await jobsApiCall(`/users/${userId}/jobs`, 'GET');
    return data;
}

/**
 * Listar candidatos de uma vaga (apenas empresa dona)
 * GET /companies/{company_id}/jobs/{job_id}
 */
async function getJobApplicants(companyId, jobId) {
    return await jobsApiCall(`/companies/${companyId}/jobs/${jobId}`, 'GET');
}

/**
 * Enviar feedback para candidato (apenas empresa)
 * POST /jobs/{job_id}/feedback
 */
async function sendFeedback(jobId, userId, message) {
    return await jobsApiCall(`/jobs/${jobId}/feedback`, 'POST', {
        user_id: userId,
        message: message
    });
}

// =====================
// HELPERS
// =====================

/**
 * Formata salário para exibição
 */
function formatSalary(salary) {
    if (!salary) return 'A combinar';
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(salary);
}

/**
 * Formata localização
 */
function formatLocation(city, state) {
    return `${city}/${state}`;
}

/**
 * Formata erros de validação para exibição
 */
function formatJobValidationErrors(details) {
    if (!details || !Array.isArray(details)) return 'Erro de validação';
    
    const fieldTranslations = {
        'title': 'Título',
        'area': 'Área',
        'description': 'Descrição',
        'state': 'Estado',
        'city': 'Cidade',
        'salary': 'Salário',
        'contact': 'Contato',
        'name': 'Nome',
        'email': 'Email',
        'phone': 'Telefone',
        'education': 'Formação',
        'experience': 'Experiência',
        'user_id': 'ID do Usuário',
        'message': 'Mensagem'
    };
    
    const errorTranslations = {
        'required': 'campo obrigatório',
        'too_short': 'muito curto',
        'too_long': 'muito longo',
        'invalid_format': 'formato inválido',
        'must_be_number': 'deve ser um número',
        'must_be_positive': 'deve ser positivo',
        'invalid_area': 'área inválida',
        'invalid_state': 'estado inválido'
    };
    
    return details.map(error => {
        const field = fieldTranslations[error.field] || error.field;
        const errorMsg = errorTranslations[error.error] || error.error;
        return `• ${field}: ${errorMsg}`;
    }).join('\n');
}

/**
 * Cria card HTML para uma vaga
 */
function createJobCard(job, showActions = false, isCompany = false) {
    const card = document.createElement('div');
    card.className = 'job-card';
    card.dataset.jobId = job.job_id;
    
    let actionsHtml = '';
    
    if (showActions) {
        if (isCompany) {
            actionsHtml = `
                <div class="job-actions">
                    <button class="btn-edit" onclick="editJob(${job.job_id})">✏️ Editar</button>
                    <button class="btn-view-applicants" onclick="viewApplicants(${job.job_id})">👥 Candidatos</button>
                    <button class="btn-delete" onclick="deleteJobConfirm(${job.job_id})">🗑️ Excluir</button>
                </div>
            `;
        } else {
            actionsHtml = `
                <div class="job-actions">
                    <button class="btn-apply" onclick="viewJobDetail(${job.job_id})">📝 Ver Detalhes</button>
                </div>
            `;
        }
    }
    
    // Verifica se tem feedback (para candidaturas do usuário)
    let feedbackHtml = '';
    if ('feedback' in job && job.feedback !== null) {
        feedbackHtml = `
            <div class="job-feedback">
                <strong>📬 Feedback:</strong>
                <p>${job.feedback}</p>
            </div>
        `;
    } else if ('feedback' in job && job.feedback === null) {
        feedbackHtml = `
            <div class="job-feedback pending">
                <em>⏳ Aguardando feedback da empresa...</em>
            </div>
        `;
    }
    
    card.innerHTML = `
        <div class="job-header">
            <h3 class="job-title">${job.title}</h3>
            <span class="job-area">${job.area}</span>
        </div>
        <div class="job-company">🏢 ${job.company}</div>
        <div class="job-location">📍 ${formatLocation(job.city, job.state)}</div>
        <div class="job-salary">💰 ${formatSalary(job.salary)}</div>
        <p class="job-description">${job.description ? job.description.substring(0, 150) + '...' : ''}</p>
        ${feedbackHtml}
        ${actionsHtml}
    `;
    
    return card;
}

/**
 * Popula um select com as áreas de trabalho
 */
function populateAreasSelect(selectElement, selectedValue = '') {
    selectElement.innerHTML = '<option value="">Selecione a área...</option>';
    
    JOB_AREAS.forEach(area => {
        const option = document.createElement('option');
        option.value = area;
        option.textContent = area;
        if (area === selectedValue) option.selected = true;
        selectElement.appendChild(option);
    });
}

/**
 * Popula um select com os estados brasileiros
 */
function populateStatesSelect(selectElement, selectedValue = '') {
    selectElement.innerHTML = '<option value="">Selecione o estado...</option>';
    
    BRAZILIAN_STATES.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        if (state === selectedValue) option.selected = true;
        selectElement.appendChild(option);
    });
}
