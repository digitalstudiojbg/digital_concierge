import React, { Component, Suspense, lazy } from "react";
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DayJsUtils from "@date-io/dayjs";
import Login from "./auth/Login";
import PrivateRoute from "./auth/PrivateRoute";
import { isLoggedIn, logout } from "../auth/auth";
import "./App.scss";
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
    },
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
            <SnackbarProvider
                maxSnack={3}
                autoHideDuration={3000}
            >
                <MuiPickersUtilsProvider utils={DayJsUtils}>
                    <Router ref={router => (this.router = router)} basename={"cms"}>
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
                </MuiPickersUtilsProvider>
            </SnackbarProvider>
        );
    }
}

export default App;
