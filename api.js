// api.js
const API_BASE = 'http://127.0.0.1:8000'; // ajuste conforme seu servidor

async function apiCall(endpoint, method = 'GET', body = null) {
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
        return { message: 'Falha na conexão com o servidor. Verifique sua internet.' };
    }
}
