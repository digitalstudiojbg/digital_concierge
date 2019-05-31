import React from "react";
import LayoutPicker from "../../../utils/LayoutPicker";
import styled from "styled-components";
import {
    MainSectionContainer,
    MainSubSections
} from "../../home/WelcomeStyleSet";

export const ModifyStartLayout = ({ values, setFieldValue }) => {
    return (
        <React.Fragment>
            <MainSectionContainer>
                <MainSubSections style={{ width: "60%" }}>
                    tablet
                </MainSubSections>
                <MainSubSections
                    style={{
                        width: "40%",
                        display: "flex",
                        height: "100%",
                        flexDirection: "column"
                    }}
                >
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
                </MainSubSections>
            </MainSectionContainer>
        </React.Fragment>
    );
};

export default ModifyStartLayout;
