// api.js
const API_URL = 'http://127.0.0.1:8000/api';

async function apiCall(endpoint, method = 'GET', body = null) {
    const jwtToken = sessionStorage.getItem('jwtToken');
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
    if (jwtToken) {
        headers['Authorization'] = `Bearer ${jwtToken}`;
    }

    const options = {
        method,
        headers,
        body: body ? JSON.stringify(body) : null
    };

    try {
        const response = await fetch(API_URL + endpoint, options);
        return await response.json();
    } catch (error) {
        return { error: 'Erro de rede ou JSON inválido', details: error.message };
    }
}