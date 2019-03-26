import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./auth/Login";
import PrivateRoute from "./auth/PrivateRoute";
import { isLoggedIn, logout, getClientIdLocalStorage } from "../auth/auth";
import "./App.css";
import Loading from "./loading/Loading";
import "rc-color-picker/assets/index.css";
import {
    WELCOME_URL,
    SYSTEM_CMS_INDEX_URL,
    TOUCHSCREEN_CMS_INDEX_URL,
    LOGIN_URL,
    API_URL,
    SYSTEM_INDEX_URL
} from "../utils/Constants";
import "react-table/react-table.css";

const Home = lazy(() => import("./home/Home"));

const routes = [
    // {
    //     path: WELCOME_URL,
    //     component: Home
    // },
    // {
    //     path: WELCOME_URL + "/:client_id/",
    //     component: Home
    // },
    {
        path: WELCOME_URL + "/:client_id",
        component: props => {
            // const clientId = getClientIdLocalStorage();
            // console.log("PROPS IS: ", props);
            const clientId =
                Boolean(props) &&
                Boolean(props.match) &&
                Boolean(props.match.params) &&
                Boolean(props.match.params.client_id)
                    ? props.match.params.client_id
                    : getClientIdLocalStorage();
            return <Redirect to={WELCOME_URL + "/" + clientId + "/systems"} />;
        }
    },
    {
        path: WELCOME_URL + "/:client_id/:which",
        component: Home
    },
    {
        path: SYSTEM_INDEX_URL + "/:which",
        component: Home
    },
    {
        path: SYSTEM_INDEX_URL,
        component: ({ match }) => (
            <Redirect
                to={SYSTEM_CMS_INDEX_URL.replace(
                    ":system_id",
                    match.params.system_id
                )}
            />
        )
    },
    // {
    //     path: SYSTEM_CMS_INDEX_URL,
    //     component: Home
    // },
    {
        path: TOUCHSCREEN_CMS_INDEX_URL,
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
        this.router.history.push(
            WELCOME_URL + "/" + getClientIdLocalStorage() + "/systems"
        );
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
            <Router ref={router => (this.router = router)} /*basename={"cms"}*/>
                <div>
                    <section>
                        <div>
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <React.Fragment>
                                        {isLoggedIn() &&
                                        Boolean(getClientIdLocalStorage()) ? (
                                            <Redirect
                                                to={`${WELCOME_URL}/${getClientIdLocalStorage()}`}
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
                                        onLogin={this.handleLogin.bind(this)}
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
    }
}

export default App;
