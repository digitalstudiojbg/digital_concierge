import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
    SYSTEM_INDEX_URL
} from "../utils/Constants";
import "rc-color-picker/assets/index.css";

const Home = lazy(() => import("./home/Home"));

const routes = [
    {
        path: WELCOME_URL,
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
    }
];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { loggedIn: isLoggedIn() };
    }

    handleLogin() {
        this.setState({ loggedIn: true });
        this.router.history.push(WELCOME_URL);
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
            <Router ref={router => (this.router = router)} basename={"cms"}>
                <div
                    style={{
                        backgroundColor: "#F4F4F4",
                        paddingBottom: "80px"
                    }}
                >
                    <section>
                        <div>
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Login
                                        onLogin={this.handleLogin.bind(this)}
                                    />
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
