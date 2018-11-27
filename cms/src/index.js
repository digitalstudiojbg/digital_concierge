import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "apollo-link-context";
import { getAccessToken, isLoggedIn } from "./auth/auth";

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: isLoggedIn() ? `Bearer ${getAccessToken()}` : ""
        }
    };
});

const apiUrl =
    process.env.NODE_ENV === "production"
        ? "http://digitalconcierge-env.uir8vfstfw.ap-southeast-2.elasticbeanstalk.com/api"
        : "http://localhost:3000";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(
        createUploadLink({
            uri: `${apiUrl}/graphql`,
            cretentials: "include"
        })
    )
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);
