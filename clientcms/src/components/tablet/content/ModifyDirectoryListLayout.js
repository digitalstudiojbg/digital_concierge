import React from "react";
import LayoutPicker from "../../../utils/LayoutPicker";
import { ContainerDiv } from "../../../utils/Constants";

export const ModifyDirectoryListLayout = () => {
    return (
        <div style={{ height: "calc(100vh-140px)" }}>
            <LayoutPicker />
        </div>
    );
};

export default ModifyDirectoryListLayout;
