import { API_URL } from "../utils/Constants";

const accessTokenKey = "accessToken";
const clientIdKey = "clientId";

export function getAccessToken() {
    return localStorage.getItem(accessTokenKey);
}

export function getClientIdLocalStorage() {
    return localStorage.getItem(clientIdKey);
}

export async function login(email, password) {
    const response = await fetch(
        process.env.NODE_ENV === "production"
            ? `http://platypus-env.bxpjxuug9t.ap-southeast-2.elasticbeanstalk.com/api/login`
            : "http://localhost:3000/login",
        {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email, password })
        }
    );
    if (response.ok) {
        const { token, clientId } = await response.json();
        localStorage.setItem(accessTokenKey, token);
        localStorage.setItem(clientIdKey, clientId);
    }
    return response.ok;
}

export function isLoggedIn() {
    return Boolean(localStorage.getItem(accessTokenKey));
}

export function logout() {
    localStorage.removeItem(accessTokenKey);
}
