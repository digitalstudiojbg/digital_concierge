const accessTokenKey = "accessToken";

export function getAccessToken() {
    return localStorage.getItem(accessTokenKey);
}

export async function login(email, password) {
    const apiUrl =
        process.env.NODE_ENV === "production"
            ? "http://digitalconcierge-env.uir8vfstfw.ap-southeast-2.elasticbeanstalk.com/api"
            : "http://localhost:3000";

    const response = await fetch(`${apiUrl}/login`, {
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
