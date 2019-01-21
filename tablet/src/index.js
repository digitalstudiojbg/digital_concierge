import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "apollo-link-context";
import { API_URL } from "./utils/Constants";
//import * as serviceWorker from "./serviceWorker";
import { withClientState } from "apollo-link-state";
import { ApolloLink } from "apollo-link";

const cache = new InMemoryCache({});

const stateLink = withClientState({
    cache,
    resolvers: {},
    defaults: {}
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
        stateLink,

        createUploadLink({
            uri: `${API_URL}/graphql`
        })
    ])
});
ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
