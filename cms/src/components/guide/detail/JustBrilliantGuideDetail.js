import React from "react";
import TabbedPage from "../../../utils/TabbedPage";
import ModifyPublication from "./ModifyPublication";

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
                        withCancel: false,
                        component: ModifyPublication
                    },
                    {
                        name: "Advertising",
                        withButtons: false,
                        withCancel: false,
                        component: () => <div>ADVERTISER LIST</div>
                    },
                    {
                        name: "Editorial",
                        withButtons: false,
                        withCancel: false,
                        component: () => <div>Editorial LIST</div>
                    }
                ]}
            />
        </div>
    );
};

export default JustBrilliantGuideDetail;
