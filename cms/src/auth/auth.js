import { API_URL } from "../utils/Constants";

const accessTokenKey = "accessToken";

export function getAccessToken() {
    return localStorage.getItem(accessTokenKey);
}

export async function login(email, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem(accessTokenKey, token);
    }
    return response.ok;
}

export function isLoggedIn() {
    return !!localStorage.getItem(accessTokenKey);
}

export function logout() {
    localStorage.removeItem(accessTokenKey);
}
