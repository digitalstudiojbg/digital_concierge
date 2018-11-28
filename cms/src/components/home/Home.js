import React, { Component, lazy, Suspense } from "react";
import { Query } from "react-apollo";
import { getCurrentUserQuery } from "../../data/query";
import Loading from "../loading/Loading";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import PrivateRoute from "../auth/PrivateRoute";
import { WELCOME_URL, TABLET_CMS_INDEX_URL, TABLET_CMS_HOME_URL, TABLET_CMS_LIST_URL, TOUCHSCREEN_CMS_INDEX_URL } from "../../utils/Constants";

const Tablet = lazy(() => import("../tablet/Tablet"));
const TabletList = lazy(() => import("../tablet/TabletList"));
const Touchscreen = lazy(() => import("../touchscreen/Touchscreen"));
const Welcome = lazy(() => import("./Welcome.js"));

const routes = [
    {
        path: WELCOME_URL,
        exact: true,
        header: Header,
        main: Welcome
    },
    {
        path: TABLET_CMS_INDEX_URL,
        exact: true,
        sidebar: Sidebar,
        header: Header,
        main: Tablet
    },
    {
        path: TABLET_CMS_HOME_URL,
        exact: false,
        sidebar: Sidebar,
        header: Header,
        main: Tablet
    },
    {
        path: TABLET_CMS_LIST_URL,
        exact: false,
        sidebar: Sidebar,
        header: Header,
        main: TabletList
    },
    {
        path: TOUCHSCREEN_CMS_INDEX_URL,
        exact: true,
        sidebar: Sidebar,
        header: Header,
        main: Touchscreen
    }
];

class Home extends Component {
    render() {
        return (
            <Query query={getCurrentUserQuery} /*fetchPolicy="no-cache"*/>
                {({ loading, error, data }) => {
                    if (loading) return <Loading loadingData />;
                    if (error) return `Error! ${error.message}`;
                    console.log(data);

                    return (
                        <div>
                            {routes.map(
                                (route, index) =>
                                    route.header && (
                                        <PrivateRoute
                                            key={index}
                                            path={route.path}
                                            exact={route.exact}
                                            component={route.header}
                                        />
                                    )
                            )}
                            <div
                                style={{
                                    paddingTop: "80px",
                                    height: "100vh",
                                    width: "100vw",
                                    display: "flex"
                                }}
                            >
                                {routes.map(
                                    (route, index) =>
                                        route.sidebar && (
                                            <PrivateRoute
                                                key={index}
                                                path={route.path}
                                                exact={route.exact}
                                                component={route.sidebar}
                                            />
                                        )
                                )}

                                {routes.map(
                                    (route, index) =>
                                        route.main && (
                                            <Suspense
                                                key={index}
                                                fallback={<Loading />}
                                            >
                                                <PrivateRoute
                                                    path={route.path}
                                                    exact={route.exact}
                                                    component={route.main}
                                                />
                                            </Suspense>
                                        )
                                )}
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default Home;
