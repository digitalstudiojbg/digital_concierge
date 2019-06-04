import React from "react";
import TabbedPage from "../../../utils/TabbedPage";
import ModifyPublication from "./ModifyPublication";
import DetailAdvertiserList from "./DetailAdvertiserList";
import { WELCOME_URL } from "../../../utils/Constants";

export const JustBrilliantGuideDetail = ({ match }) => {
    const { params } = match || {};
    const { pub_id = null } = params || {};
    const tabs = [
        {
            name: "General",
            withButtons: true,
            withCancel: true,
            component: ModifyPublication
        },
        {
            name: "Advertising",
            withButtons: false,
            withCancel: false,
            component: DetailAdvertiserList
        },
        {
            name: "Editorial",
            withButtons: false,
            withCancel: false,
            component: () => <div>Editorial LIST</div>
        }
    ];

    return (
        <div style={{ flex: 1, height: "100%" }}>
            <TabbedPage
                title="Just Brilliant Guides"
                data={{ pub_id: pub_id === "new" ? null : pub_id }}
                tabs={
                    pub_id === "new"
                        ? tabs.slice(0, 1) //Only take the first item in the list if creating new publication
                        : [...tabs]
                }
                exitUrl={WELCOME_URL + "/guide"}
                cancelUrl={WELCOME_URL + "/guide"}
                tooltipText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
        </div>
    );
};

export default JustBrilliantGuideDetail;
