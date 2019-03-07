import React from "react";
import LayoutPicker from "../../../utils/LayoutPicker";
import { ContainerDiv } from "../../../utils/Constants";

export const ModifyDirectoryListLayout = () => {
    return (
        <div style={{ width: "100%", height: "100%", display: "flex" }}>
            <div style={{ flexBasis: "40%" }} />
            <div style={{ flexBasis: "40%" }}>
                <LayoutPicker />
            </div>
        </div>
    );
};

export default ModifyDirectoryListLayout;
