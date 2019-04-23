import React from "react";
import { withRouter } from "react-router-dom";
import LayoutPicker from "../../../utils/LayoutPicker";
import styled from "styled-components";

const SubtitleDiv = styled.div`
    font-size: 1.5em;
    font-weight: 700;
    padding-bottom: 20px;
`;

export const ModifyStartLayout = ({ values, setFieldValue }) => {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                paddingTop: 20
            }}
        >
            <div
                style={{
                    width: "35%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <SubtitleDiv>LAYOUT</SubtitleDiv>
                <div style={{ flex: 1, width: "100%", height: "100%" }}>
                    <LayoutPicker
                        values={values}
                        setFieldValue={setFieldValue}
                        layoutType="start"
                        withTemplate={false}
                        layoutListDirection="vertical"
                        dropDownWidth={100}
                    />
                </div>
                >
            </div>
        </div>
    );
};

export default withRouter(ModifyStartLayout);
