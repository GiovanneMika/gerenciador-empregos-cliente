// api.js

/**
 * Obtém a URL base da API configurada pelo usuário
 * Padrão: http://localhost:8000
 */
function getApiBase() {
    const saved = localStorage.getItem('apiServerUrl');
    return saved || 'http://localhost:8000';
}

/**
 * Define a URL base da API
 * @param {string} url - URL completa (ex: http://192.168.1.10:8000)
 */
function setApiBase(url) {
    // Remove barra final se houver
    const cleanUrl = url.replace(/\/$/, '');
    localStorage.setItem('apiServerUrl', cleanUrl);
}

/**
 * Verifica se o servidor está acessível
 * @param {string} url - URL do servidor para testar
 * @returns {Promise<boolean>}
 */
async function testServerConnection(url) {
    try {
        const cleanUrl = url.replace(/\/$/, '');
        // Tenta fazer uma requisição simples para verificar conectividade
        const response = await fetch(`${cleanUrl}/users`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        // Qualquer resposta (mesmo 401) indica que o servidor está acessível
        return true;
    } catch (err) {
        return false;
    }
}

/**
 * Faz chamada para a API
 * @param {string} endpoint - Caminho do endpoint (ex: /login, /users/1)
 * @param {string} method - Método HTTP (GET, POST, PATCH, DELETE)
 * @param {object} body - Corpo da requisição (opcional)
 * @returns {Promise<object>}
 */
async function apiCall(endpoint, method = 'GET', body = null) {
    const API_BASE = getApiBase();
    const token = sessionStorage.getItem('jwtToken');
    const headers = { 'Content-Type': 'application/json' };

    if (token) headers['Authorization'] = `Bearer ${token}`;

    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

    try {
        const response = await fetch(API_BASE + endpoint, options);
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            // Retorna a mensagem exata do backend se existir
            if (data.message) return data;

            // fallback
            return { message: `Erro ${response.status}: ${response.statusText}` };
        }

        return data;
    } catch (err) {
        return { message: 'Falha na conexão com o servidor. Verifique sua internet ou a configuração do servidor.' };
    }
}
