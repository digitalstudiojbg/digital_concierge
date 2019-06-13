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
// import { withClientState } from "apollo-link-state";
import { ApolloLink } from "apollo-link";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DayjsUtils from "@date-io/dayjs";
import { SnackbarProvider } from "notistack";

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: isLoggedIn() ? `Bearer ${getAccessToken()}` : ""
        }
    };
});

const cache = new InMemoryCache({
    dataIdFromObject: object => {
        switch (object.__typename) {
            case "User":
                return Math.random();
            default:
                return defaultDataIdFromObject(object);
        }
    }
});
// cache.writeData({
//     data: { currentSystem: true }
// });
// const stateLink = withClientState({
//     cache,
//     resolvers: {},
//     defaults: {}
// });

/**
 * https://kamranicus.com/posts/2018-03-06-graphql-apollo-object-caching
 * Fix Apollo Client Cache Issue
 */
const client = new ApolloClient({
    cache,
    link: ApolloLink.from([
        // stateLink,
        authLink,
        createUploadLink({
            uri: `${API_URL}/graphql`
        })
    ]),
    // clientState: {
    //     defaults: { currentSystem: true },
    //     resolvers: {}
    // },
    resolvers: {}
});

//MUI Theme
//Set Material UI Components to use Source Sans Pro as main font
const theme = createMuiTheme({
    typography: {
        useNextVariants: true, //https://material-ui.com/style/typography/#migration-to-typography-v2
        fontFamily: "Source Sans Pro, sans-serif"
    }
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <SnackbarProvider
            maxSnack={3}
            autoHideDuration={3000}
        >
            <MuiPickersUtilsProvider utils={DayjsUtils}>
                <MuiThemeProvider theme={theme}>
                    <App />
                </MuiThemeProvider>
            </MuiPickersUtilsProvider>
        </SnackbarProvider>
    </ApolloProvider>,
    document.getElementById("root")
);
