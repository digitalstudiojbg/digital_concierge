import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "apollo-link-context";
import { getAccessToken, isLoggedIn } from "./auth/auth";
import { API_URL } from "./utils/Constants";

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: isLoggedIn() ? `Bearer ${getAccessToken()}` : ""
        }
    };
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(
        createUploadLink({
            uri: `${API_URL}/graphql`
        })
    )
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);
