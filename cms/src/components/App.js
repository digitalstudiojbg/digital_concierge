import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./auth/Login";
import PrivateRoute from "./auth/PrivateRoute";
import { isLoggedIn, logout } from "../auth/auth";
import "./App.css";
import "react-table/react-table.css";
import Loading from "./loading/Loading";
import {
    WELCOME_URL,
    SYSTEM_CMS_INDEX_URL,
    TOUCHSCREEN_CMS_INDEX_URL,
    LOGIN_URL,
    API_URL,
    SYSTEM_INDEX_URL,
    WELCOME_URL_ROUTER,
    CREATE_NEW_CLIENT,
    GUIDE_CREATE_NEW_URL,
    GUIDE_MAIN_URL,
    ADVERTISER_MAIN_URL,
    ADVERTISER_CREATE_NEW_URL,
    ARTICLE_CREATE_NEW_URL,
    ARTICLE_MAIN_URL,
    CLIENT_CMS_URL
} from "../utils/Constants";
import { Query } from "react-apollo";
import "rc-color-picker/assets/index.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { CLIENT_JBG } from "../data/query";
import { isEmpty } from "lodash";

const Home = lazy(() => import("./home/Home"));

const routes = [
    {
        path: WELCOME_URL_ROUTER,
        component: Home
    },
    {
        path: SYSTEM_CMS_INDEX_URL,
        component: Home
    },
    {
        path: TOUCHSCREEN_CMS_INDEX_URL,
        component: Home
    },
    {
        path: SYSTEM_INDEX_URL,
        component: Home
    },
    {
        path: CREATE_NEW_CLIENT,
        component: Home
    },
    {
        path: GUIDE_MAIN_URL,
        component: Home
    },
    {
        path: ADVERTISER_MAIN_URL,
        component: Home
    },
    {
        path: ADVERTISER_CREATE_NEW_URL,
        component: Home
    },
    {
        path: ARTICLE_CREATE_NEW_URL,
        component: Home
    },
    {
        path: ARTICLE_MAIN_URL,
        component: Home
    }
];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { loggedIn: isLoggedIn() };
    }

    handleLogin() {
        this.setState({ loggedIn: true });
        this.router.history.push(WELCOME_URL + "/dashboard");
    }

    handleLogout() {
        logout();
        this.setState({ loggedIn: false });
        this.router.history.push(LOGIN_URL);
    }

    componentDidMount() {
        fetch(`${API_URL}/test/`)
            .then(response => response.json())
            .then(data => console.log(data));
        fetch(`${API_URL}/`)
            .then(response => response.json())
            .then(data => console.log(data));
    }

    render() {
        return (
            <Query query={CLIENT_JBG} fetchPolicy="network-only">
                {({ loading, error, data }) => {
                    if (loading) return <Loading />;
                    if (
                        !isEmpty(error) ||
                        isEmpty(data) ||
                        isEmpty(data.clientJBG)
                    )
                        return window.location.replace(CLIENT_CMS_URL);
                    return (
                        <Router
                            ref={router => (this.router = router)}
                            basename={"cms"}
                        >
                            <div
                                style={{
                                    backgroundColor: "#F4F4F4",
                                    paddingBottom: "130px"
                                }}
                            >
                                <section>
                                    <div>
                                        <Route
                                            exact
                                            path="/"
                                            render={() => (
                                                <React.Fragment>
                                                    {isLoggedIn() ? (
                                                        <Redirect
                                                            to={`${WELCOME_URL}/dashboard`}
                                                        />
                                                    ) : (
                                                        <Login
                                                            onLogin={this.handleLogin.bind(
                                                                this
                                                            )}
                                                        />
                                                    )}
                                                </React.Fragment>
                                            )}
                                        />
                                        <Route
                                            path={LOGIN_URL}
                                            render={() => (
                                                <Login
                                                    onLogin={this.handleLogin.bind(
                                                        this
                                                    )}
                                                />
                                            )}
                                        />

                                        <Suspense fallback={<Loading />}>
                                            {routes.map((route, index) => (
                                                <PrivateRoute
                                                    key={index}
                                                    path={route.path}
                                                    component={route.component}
                                                />
                                            ))}
                                        </Suspense>
                                    </div>
                                </section>
                            </div>
                        </Router>
                    );
                }}
            </Query>
        );
    }
}

export default App;
