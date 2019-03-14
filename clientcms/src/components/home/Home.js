import React, { Component, lazy, Suspense } from "react";
import { Query } from "react-apollo";
import { getCurrentUserQuery } from "../../data/query";
import Loading from "../loading/Loading";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import PrivateRoute from "../auth/PrivateRoute";
import {
    WELCOME_URL,
    SYSTEM_CMS_INDEX_URL,
    SYSTEM_CMS_HOME_URL,
    SYSTEM_CMS_LANDINGPAGE_URL,
    TOUCHSCREEN_CMS_INDEX_URL,
    SYSTEM_CMS_CONTENT_URL,
    SYSTEM_CMS_SETTINGS_URL,
    SYSTEM_CMS_CREATE_CONTENT_INDEX_URL,
    SYSTEM_CMS_CREATE_CONTENT_CATEGORY_URL,
    SYSTEM_CMS_CREATE_CONTENT_SUBCATEGORY_URL,
    SYSTEM_CMS_CREATE_CONTENT_DIRECTORY_URL,
    SYSTEM_INDEX_URL,
    SYSTEM_MODIFY_DIRECTORY_LIST_URL,
    SYSTEM_CMS_LIBRARY
} from "../../utils/Constants";
import { getSystemDetailSidebar } from "../../data/query";
import { withRouter } from "react-router-dom";

const TabletDashboard = lazy(() => import("../tablet/TabletDashboard"));
const TabletLandingPage = lazy(() => import("../tablet/TabletLandingPage"));
const TabletSetting = lazy(() => import("../tablet/TabletSetting"));
const TabletContent = lazy(() => import("../tablet/TabletContent"));
const TabletCreateContent = lazy(() =>
    import("../tablet/content/CreateContent")
);
const TabletCreateCategory = lazy(() =>
    import("../tablet/content/CreateCategory")
);
const TabletCreateDirectory = lazy(() =>
    import("../tablet/content/CreateDirectory")
);

const Touchscreen = lazy(() => import("../touchscreen/Touchscreen"));

const Welcome = lazy(() => import("./Welcome.js"));

const ModifyDirectoryList = lazy(() =>
    import("../tablet/content/ModifyDirectoryList")
);

const Library = lazy(() => import("../../utils/MediaLibrary"));

class Home extends Component {
    routes = client => {
        return [
            // {
            //     path: WELCOME_URL + "/:client_id/",
            //     exact: true,
            //     header: Header,
            //     main: Welcome,
            //     withProps: {}
            // },
            {
                path: WELCOME_URL + "/:client_id/:which",
                exact: true,
                header: Header,
                main: Welcome,
                withProps: {}
            },
            // {
            //     path: WELCOME_URL + "/:client_id/systems",
            //     exact: true,
            //     header: Header,
            //     main: Welcome,
            //     withProps: { tab: "systems" }
            // },
            // {
            //     path: WELCOME_URL + "/:client_id/account",
            //     exact: true,
            //     header: Header,
            //     main: Welcome,
            //     withProps: { tab: "account" }
            // },
            // {
            //     path: WELCOME_URL + "/:client_id/theme",
            //     exact: true,
            //     header: Header,
            //     main: Welcome,
            //     withProps: { tab: "theme" }
            // },
            // {
            //     path: WELCOME_URL + "/:client_id/users",
            //     exact: true,
            //     header: Header,
            //     main: Welcome,
            //     withProps: { tab: "users" }
            // },
            // {
            //     path: WELCOME_URL + "/:client_id/support",
            //     exact: true,
            //     header: Header,
            //     main: Welcome,
            //     withProps: { tab: "support" }
            // },
            {
                path: SYSTEM_INDEX_URL,
                exact: true,
                sidebar: Sidebar,
                header: Header,
                main: TabletDashboard,
                withProps: {}
            },
            {
                path: SYSTEM_CMS_INDEX_URL,
                exact: true,
                sidebar: Sidebar,
                header: Header,
                main: TabletDashboard,
                withProps: {}
            },
            {
                path: SYSTEM_CMS_HOME_URL,
                exact: true,
                sidebar: Sidebar,
                header: Header,
                main: TabletDashboard,
                withProps: {}
            },
            {
                path: SYSTEM_CMS_SETTINGS_URL,
                exact: true,
                sidebar: Sidebar,
                header: Header,
                main: TabletSetting,
                withProps: {}
            },
            {
                path: SYSTEM_CMS_CONTENT_URL,
                exact: true,
                sidebar: Sidebar,
                header: Header,
                main: TabletContent,
                withProps: {}
            },
            {
                path: SYSTEM_CMS_CREATE_CONTENT_INDEX_URL,
                exact: true,
                sidebar: Sidebar,
                header: Header,
                main: TabletCreateContent,
                withProps: {}
            },
            {
                path: SYSTEM_CMS_CREATE_CONTENT_CATEGORY_URL,
                exact: true,
                sidebar: Sidebar,
                header: Header,
                main: TabletCreateCategory,
                withProps: {}
            },
            {
                path: SYSTEM_CMS_CREATE_CONTENT_SUBCATEGORY_URL,
                exact: true,
                sidebar: Sidebar,
                header: Header,
                main: TabletCreateCategory,
                withProps: { is_sub_category: true }
            },
            {
                path: SYSTEM_CMS_CREATE_CONTENT_DIRECTORY_URL,
                exact: true,
                sidebar: Sidebar,
                header: Header,
                main: TabletCreateDirectory,
                withProps: {}
            },
            {
                path: SYSTEM_CMS_LANDINGPAGE_URL,
                exact: true,
                sidebar: Sidebar,
                header: Header,
                main: TabletLandingPage,
                withProps: {}
            },
            {
                path: SYSTEM_MODIFY_DIRECTORY_LIST_URL,
                exact: true,
                sidebar: Sidebar,
                header: Header,
                main: ModifyDirectoryList,
                withProps: {}
            },
            {
                path: TOUCHSCREEN_CMS_INDEX_URL,
                exact: true,
                sidebar: Sidebar,
                header: Header,
                main: Touchscreen,
                withProps: {}
            },
            {
                path: SYSTEM_CMS_LIBRARY,
                exact: true,
                header: Header,
                sidebar: Sidebar,
                main: Library,
                withProps: { clientId: client.id, height: "80vh" }
            }
        ];
    };

    render() {
        const { system_id } = this.props.match.params;
        return (
            <Query query={getCurrentUserQuery} /*fetchPolicy="no-cache"*/>
                {({ loading: loadingUser, error: errorUser }) => (
                    <React.Fragment>
                        {loadingUser && <Loading loadingData />}
                        {errorUser && <p>{`Error! ${errorUser.message}`}</p>}
                        {!loadingUser && !errorUser && (
                            <Query
                                query={getSystemDetailSidebar}
                                variables={{ id: system_id }}
                            >
                                {({ loading, error, data: { system } }) => {
                                    if (loading) return <Loading loadingData />;
                                    if (error) return `Error! ${error.message}`;
                                    const { client = {} } = system;
                                    const routes = this.routes(client);
                                    return (
                                        <div>
                                            {this.routes(client).map(
                                                (route, index) =>
                                                    route.header && (
                                                        <PrivateRoute
                                                            key={index}
                                                            path={route.path}
                                                            exact={route.exact}
                                                            component={
                                                                route.header
                                                            }
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
                                                                path={
                                                                    route.path
                                                                }
                                                                exact={
                                                                    route.exact
                                                                }
                                                                component={
                                                                    route.sidebar
                                                                }
                                                            />
                                                        )
                                                )}

                                                {routes.map(
                                                    (route, index) =>
                                                        route.main && (
                                                            <Suspense
                                                                key={index}
                                                                fallback={
                                                                    <Loading />
                                                                }
                                                            >
                                                                <PrivateRoute
                                                                    path={
                                                                        route.path
                                                                    }
                                                                    exact={
                                                                        route.exact
                                                                    }
                                                                    component={
                                                                        route.main
                                                                    }
                                                                    withProps={
                                                                        route.withProps
                                                                    }
                                                                />
                                                            </Suspense>
                                                        )
                                                )}
                                            </div>
                                        </div>
                                    );
                                }}
                            </Query>
                        )}
                    </React.Fragment>
                )}
            </Query>
        );
    }
}

export default withRouter(Home);
