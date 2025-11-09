/* === API para Empresas === */

// Função para obter a URL base configurada
function getApiBase() {
    return localStorage.getItem('apiServerUrl') || 'http://localhost:8000';
}

// Função para definir nova URL base
function setApiBase(url) {
    localStorage.setItem('apiServerUrl', url);
}

// Função para testar conexão com o servidor
async function testServerConnection(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok || response.status === 405; // HEAD pode não ser implementado
    } catch (error) {
        return false;
    }
}

// Função principal para requisições da API de empresas
async function companyApiCall(endpoint, method = 'GET', body = null) {
    const url = `${getApiBase()}${endpoint}`;
    const token = sessionStorage.getItem('companyToken');
    
    const headers = {
        'Content-Type': 'application/json'
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    try {
        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: body ? JSON.stringify(body) : null
        });
        
        const data = await response.json();
        
        // Adiciona o status HTTP à resposta para controle
        data.status = response.status;
        
        // Tratamento automático de erro 401 (token inválido)
        if (response.status === 401) {
            sessionStorage.removeItem('companyToken');
            sessionStorage.removeItem('companyId');
            sessionStorage.removeItem('companyUsername');
            
            if (window.location.pathname !== '/pages/company-login.html') {
                alert('Sessão expirada. Redirecionando para login...');
                window.location.href = 'company-login.html';
            }
        }
        
        return data;
    } catch (error) {
        console.error('Erro na API:', error);
        return {
            status: 0,
            message: 'Falha na conexão com o servidor'
        };
    }
}

// Função para decodificar JWT
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

// Função para verificar se o token está válido
function isTokenValid() {
    const token = sessionStorage.getItem('companyToken');
    if (!token) return false;
    
    const payload = parseJwt(token);
    if (!payload) return false;
    
    // Verifica se o token não expirou
    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now;
}

// Função para fazer logout
async function companyLogout() {
    const data = await companyApiCall('/logout', 'POST');
    
    // Limpa dados do sessionStorage independente da resposta
    sessionStorage.removeItem('companyToken');
    sessionStorage.removeItem('companyId');
    sessionStorage.removeItem('companyUsername');
    
    return data;
}

// Lista de estados brasileiros válidos
const BRAZILIAN_STATES = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

// Função para validar estado brasileiro
function isValidState(state) {
    return BRAZILIAN_STATES.includes(state.toUpperCase());
}

// Função para formatar resposta de erro de validação
function formatValidationErrors(details) {
    if (!details || !Array.isArray(details)) return 'Erro de validação';
    
    return details.map(error => {
        const field = error.field || 'campo';
        const errorMsg = error.error || 'erro desconhecido';
        
        // Traduz alguns campos para português
        const fieldTranslations = {
            'name': 'Nome',
            'business': 'Ramo de Atuação',
            'username': 'Username',
            'password': 'Senha',
            'street': 'Rua',
            'number': 'Número',
            'city': 'Cidade',
            'state': 'Estado',
            'phone': 'Telefone',
            'email': 'Email'
        };
        
        // Traduz alguns erros comuns
        const errorTranslations = {
            'invalid_format': 'formato inválido',
            'must_be_positive_int': 'deve ser um número positivo',
            'required': 'campo obrigatório',
            'unique': 'já existe no sistema',
            'min_length': 'muito curto',
            'max_length': 'muito longo',
            'invalid_email': 'email inválido',
            'invalid_state': 'estado inválido'
        };
        
        const translatedField = fieldTranslations[field] || field;
        const translatedError = errorTranslations[errorMsg] || errorMsg;
        
        return `• ${translatedField}: ${translatedError}`;
    }).join('\n');
}

// Função para tratar resposta de erro 422 especificamente
function handleValidationError(data) {
    let message = `❌ ${data.message || 'Erro de validação'}`;
    
    if (data.code) {
        message += ` (${data.code})`;
    }
    
    if (data.details && Array.isArray(data.details) && data.details.length > 0) {
        message += `:\n\n${formatValidationErrors(data.details)}`;
    }
    
    return message;
}