import { API_URL } from "../utils/Constants";

const accessTokenKey = "accessToken";

export function getAccessToken() {
    return localStorage.getItem(accessTokenKey);
}

export async function login(email, password) {
    const response = await fetch(
        process.env.NODE_ENV === "production"
            ? `http://digitalconcierge-env.uir8vfstfw.ap-southeast-2.elasticbeanstalk.com/login`
            : "http://localhost:3000/login",
        {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email, password })
        }
    );
    if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem(accessTokenKey, token);
    }
    return response.ok;
}

export function isLoggedIn() {
    return Boolean(localStorage.getItem(accessTokenKey));
}

export function logout() {
    localStorage.removeItem(accessTokenKey);
}
