import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache, defaultDataIdFromObject } from "apollo-boost";
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

/**
 * https://kamranicus.com/posts/2018-03-06-graphql-apollo-object-caching
 * Fix Apollo Client Cache Issue
 */
const client = new ApolloClient({
    cache: new InMemoryCache({
        dataIdFromObject: object => {
            switch (object.__typename) {
                case "TB_Directory":
                    return Math.random();
                default:
                    return defaultDataIdFromObject(object);
            }
        }
    }),
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
