import React from "react";
import TabbedPage from "../../../utils/TabbedPage";

export const JustBrilliantGuideDetail = ({ match }) => {
    const { params } = match || {};
    const { pub_id = null } = params || {};
    return (
        <div style={{ flex: 1, height: "100%" }}>
            <TabbedPage
                title="Just Brilliant Guides"
                data={{ pub_id }}
                tabs={[
                    {
                        name: "General",
                        withButtons: true,
                        component: () => <div>PUBLICATION DETAILS</div>
                    },
                    {
                        name: "Advertising",
                        withButtons: false,
                        component: () => <div>ADVERTISER LIST</div>
                    },
                    {
                        name: "Editorial",
                        withButtons: false,
                        component: () => <div>Editorial LIST</div>
                    }
                ]}
            />
        </div>
    );
};

export default JustBrilliantGuideDetail;
