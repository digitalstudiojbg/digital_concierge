import React, { lazy, Suspense } from "react";
import { Query } from "react-apollo";
import { getCurrentUserQuery, getSystemDetail } from "../../data/query";
import Loading from "../loading/Loading";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import PrivateRoute from "../auth/PrivateRoute";
import { Redirect } from "react-router-dom";
import {
    WELCOME_URL,
    SYSTEM_CMS_INDEX_URL,
    SYSTEM_CMS_HOME_URL,
    SYSTEM_CMS_LANDINGPAGE_URL,
    TOUCHSCREEN_CMS_INDEX_URL,
    SYSTEM_CMS_CONTENT_URL,
    SYSTEM_CMS_SETTINGS_URL,
    SYSTEM_CMS_CONTENT_INDEX,
    SYSTEM_CMS_CREATE_CONTENT_CATEGORY_URL,
    SYSTEM_CMS_CREATE_CONTENT_SUBCATEGORY_URL,
    SYSTEM_CMS_CREATE_CONTENT_DIRECTORY_URL,
    SYSTEM_INDEX_URL,
    SYSTEM_MODIFY_DIRECTORY_LIST_URL,
    SYSTEM_MODIFY_DIRECTORY_ENTRY_URL,
    SYSTEM_CMS_LIBRARY,
    SYSTEM_MODIFY_START_URL,
    SYSTEM_MODIFY_HOME_URL
} from "../../utils/Constants";

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

const ModifyDirectoryEntry = lazy(() =>
    import("../tablet/content/ModifyDirectoryEntry")
);

const ModifyStart = lazy(() => import("../tablet/content/ModifyStart"));

const ModifyHome = lazy(() => import("../tablet/content/ModifyHome"));

const Library = lazy(() => import("../tablet/TabletLibrary"));

const CLIENT_ROUTES = [
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
    }
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
];

const SYSTEM_ROUTES = [
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
        path: SYSTEM_CMS_CONTENT_INDEX,
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
        path: SYSTEM_MODIFY_DIRECTORY_ENTRY_URL,
        exact: true,
        sidebar: Sidebar,
        header: Header,
        main: ModifyDirectoryEntry,
        withProps: {}
    },
    {
        path: SYSTEM_MODIFY_START_URL,
        exact: true,
        sidebar: Sidebar,
        header: Header,
        main: ModifyStart,
        withProps: {}
    },
    {
        path: SYSTEM_MODIFY_HOME_URL,
        exact: true,
        sidebar: Sidebar,
        header: Header,
        main: ModifyHome,
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
        main: Library
    }
];

const renderRoutes = routes => (
    <React.Fragment>
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
                //  height: "100vh",
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
                        <Suspense key={index} fallback={<Loading />}>
                            <PrivateRoute
                                path={route.path}
                                exact={route.exact}
                                component={route.main}
                                withProps={route.withProps}
                            />
                        </Suspense>
                    )
            )}
        </div>
    </React.Fragment>
);

const Home = ({ match }) => {
    const { params } = match || {};
    const { client_id, system_id } = params || {};

    const routes = Boolean(client_id) ? CLIENT_ROUTES : SYSTEM_ROUTES;

    return (
        <React.Fragment>
            {Boolean(client_id) && !system_id && (
                <Query query={getCurrentUserQuery} /*fetchPolicy="no-cache"*/>
                    {({ loading, error, data }) => {
                        if (loading) return <Loading loadingData />;
                        if (error) return `Error! ${error.message}`;
                        console.log(data);
                        return (
                            <React.Fragment>
                                {renderRoutes(routes)}
                            </React.Fragment>
                        );
                    }}
                </Query>
            )}
            {!Boolean(client_id) && Boolean(system_id) && (
                <Query query={getCurrentUserQuery} /*fetchPolicy="no-cache"*/>
                    {({ loading, error, data }) => {
                        if (loading) return <Loading loadingData />;
                        if (error) return `Error! ${error.message}`;
                        console.log(data);
                        return (
                            <Query
                                query={getSystemDetail}
                                variables={{ id: system_id }}
                            >
                                {({
                                    loading: loadingInner,
                                    error: errorInner,
                                    data: dataInner
                                }) => {
                                    if (loadingInner)
                                        return <Loading loadingData />;
                                    if (errorInner)
                                        return `Error! ${errorInner.message}`;
                                    console.log(dataInner);
                                    const { getCurrentUser } = data;
                                    const { client: userClient } =
                                        getCurrentUser || {};
                                    const {
                                        id: userClientId = "",
                                        name: userClientName = ""
                                    } = userClient || {};
                                    const { system } = dataInner;
                                    const { client: systemClient } =
                                        system || {};
                                    const { id: systemClientId = "" } =
                                        systemClient || {};
                                    if (
                                        (userClientId !== "" &&
                                            userClientId === systemClientId) ||
                                        userClientName.toUpperCase() ===
                                            "JOHN BATMAN GROUP"
                                    ) {
                                        //User client ID has to be the same with System client ID
                                        //Except for JBG Users
                                        return (
                                            <React.Fragment>
                                                {renderRoutes(routes)}
                                            </React.Fragment>
                                        );
                                    } else {
                                        //If User client ID not equal to System client ID or User is not JBG
                                        //Redirect to the welcome page
                                        return (
                                            <Redirect
                                                to={`${WELCOME_URL}/${userClientId}`}
                                            />
                                        );
                                    }
                                }}
                            </Query>
                        );
                    }}
                </Query>
            )}
        </React.Fragment>
    );
};

export default Home;
