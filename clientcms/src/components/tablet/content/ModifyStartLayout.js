import React from "react";
import LayoutPicker from "../../../utils/LayoutPicker";
import styled from "styled-components";

//import TabletImage from "../images/TabletImage.png";

// import TabletMockUp from "../../../../src/images/TabletMockUp.png";
import TabletMockUp from "../../../images/TabletImageTest.jpg";

import {
    MainSectionContainer,
    MainSubSections
} from "../../home/WelcomeStyleSet";

export const ModifyStartLayout = ({ values, setFieldValue }) => {
    return (
        <React.Fragment>
            <MainSectionContainer style={{ display: "flex" }}>
                <MainSubSections
                    style={{
                        width: "65%",
                        flex: "left"
                        // height: "600px",
                        //  marginRight: "5%"
                        // backgroundImage:
                        //     "url('https://source.unsplash.com/-YHSwy6uqvk/1080x720')",
                        // backgroundImage: `url('${TabletMockUp}')`,

                        // backgroundPosition: "center",
                        // backgroundSize: "cover",
                        // backgroundColor: "white"
                    }}
                >
                    <div
                        style={{
                            width: "90%",
                            height: "100%",
                            margin: "0 5%",
                            backgroundImage: `url('${TabletMockUp}')`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundColor: "white"
                        }}
                    />
                </MainSubSections>
                <MainSubSections
                    style={{
                        width: "30%",
                        display: "flex",
                        height: "700px",
                        padding: "1%",
                        flexDirection: "column"
                    }}
                >
                    <div
                        style={{
                            flex: 1,
                            width: "90%",
                            height: "90%",
                            margin: "5%"
                        }}
                    >
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
