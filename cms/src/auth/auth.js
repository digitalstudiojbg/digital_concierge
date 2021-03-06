import { CLIENT_CMS_URL } from "../utils/Constants";

// import { API_URL } from "../utils/Constants";

const accessTokenKey = "accessToken";
const emailUsername = "email";

export function getAccessToken() {
    return localStorage.getItem(accessTokenKey);
}
export function getEmailLocalStorage() {
    return localStorage.getItem(emailUsername);
}

export async function login(email, password, rememberMe = false) {
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
        const { token, clientName } = await response.json();
        console.log(clientName);
        //PORTAL CMS can only be logged in by JBG STAFF MEMBERS ONLY!
        if (clientName.toUpperCase() === "JOHN BATMAN GROUP") {
            localStorage.setItem(accessTokenKey, token);
            rememberMe && localStorage.setItem(emailUsername, email);
            return response.ok;
        } else {
            window.location.replace(CLIENT_CMS_URL);
        }
    } else {
        return false;
    }
}

export function isLoggedIn() {
    return Boolean(localStorage.getItem(accessTokenKey));
}

export function logout() {
    localStorage.removeItem(accessTokenKey);
}
