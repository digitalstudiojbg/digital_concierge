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
    SYSTEM_MODIFY_DIRECTORY_LIST_URL,
    SYSTEM_INDEX_URL,
    CREATE_NEW_CLIENT,
    SYSTEM_CMS_LIBRARY
} from "../../utils/Constants";
import Library from "./Library";
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
const CreateClient = lazy(() => import("./create_client"));

/*import TabletDashboard from "../tablet/TabletDashboard";
import TabletLandingPage from "../tablet/TabletLandingPage";
import TabletSetting from "../tablet/TabletSetting";
import TabletContent from "../tablet/TabletContent";
import TabletCreateContent from "../tablet/content/CreateContent";
import TabletCreateCategory from "../tablet/content/CreateCategory";
import TabletCreateDirectory from "../tablet/content/CreateDirectory";
import ModifyDirectoryList from "../tablet/content/ModifyDirectoryList";

import Touchscreen from "../touchscreen/Touchscreen";

import Welcome from "./Welcome.js";*/

const routes = [
    {
        path: WELCOME_URL,
        exact: true,
        header: Header,
        main: Welcome,
        withProps: {}
    },
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
        path: TOUCHSCREEN_CMS_INDEX_URL,
        exact: true,
        sidebar: Sidebar,
        header: Header,
        main: Touchscreen,
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
        path: CREATE_NEW_CLIENT,
        exact: true,
        header: Header,
        main: CreateClient,
        withProps: {}
    },
    {
        path: SYSTEM_CMS_LIBRARY,
        exact: true,
        header: Header,
        sidebar: Sidebar,
        main: Library,
        withProps: {}
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
                                            key={`Header-${index}`}
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
                                                key={`Sidebar-${index}`}
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
                                                    withProps={route.withProps}
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
