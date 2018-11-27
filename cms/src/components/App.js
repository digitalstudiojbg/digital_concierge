import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./auth/Login";
import PrivateRoute from "./auth/PrivateRoute";
import { isLoggedIn, logout } from "../auth/auth";
import "./App.css";
import Loading from "./loading/Loading";
import { API_URL } from "../utils/Constants";

const Home = lazy(() => import("./home/Home"));

const routes = [
    {
        path: "/welcome",
        component: Home
    },
    {
        path: "/tablet_cms",
        component: Home
    },
    {
        path: "/touchscreen_cms",
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
        this.router.history.push("/welcome");
    }

    handleLogout() {
        logout();
        this.setState({ loggedIn: false });
        this.router.history.push("/login");
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
                                    <Login
                                        onLogin={this.handleLogin.bind(this)}
                                    />
                                )}
                            />
                            <Route
                                path="/login"
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
