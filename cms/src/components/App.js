import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./auth/Login";
import PrivateRoute from "./auth/PrivateRoute";
import { isLoggedIn, logout } from "../auth/auth";
import "./App.css";
import Loading from "./loading/Loading";
import { WELCOME_URL, TABLET_CMS_INDEX_URL, TOUCHSCREEN_CMS_INDEX_URL, LOGIN_URL } from "../utils/Constants";

const Home = lazy(() => import("./home/Home"));

const routes = [
    {
        path: WELCOME_URL,
        component: Home
    },
    {
        path: TABLET_CMS_INDEX_URL,
        component: Home
    },
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
        this.router.history.push(WELCOME_URL);
    }

    handleLogout() {
        logout();
        this.setState({ loggedIn: false });
        this.router.history.push(LOGIN_URL);
    }

    componentDidMount() {

        console.log('From Jono');
        

        const apiUrl =
            process.env.NODE_ENV === "production"
                ? "http://digitalconcierge-env.uir8vfstfw.ap-southeast-2.elasticbeanstalk.com/api"
                : "http://localhost:3000";

        fetch(`${apiUrl}/test/`)
            .then(response => response.json())
            .then(data => console.log(data));
        fetch(`${apiUrl}/`)
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
