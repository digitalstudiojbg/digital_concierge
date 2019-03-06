import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
// import Typography from "@material-ui/core/Typography";
import ModifyDirectoryListLayout from "./ModifyDirectoryListLayout";
import ModifyDirectoryListContent from "./ModifyDirectoryListContent";
import PropTypes from "prop-types";
import { ContainerDiv } from "../../../utils/Constants";
// import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";

export const ContainerDivTab = styled.div`
    width: 100%;
    overflow-y: auto;
    height: 80vh;
`;
const TabContainer = props => {
    return (
        // <Typography component="div" style={{ height: "100%" }}>
        //     {props.children}
        // </Typography>
        // <div style={{ width: "100%", height: "100%" }}>{props.children}</div>
        <ContainerDiv>{props.children}</ContainerDiv>
    );
};

// const styles = () => ({
//     indicator: {
//         backgroundColor: "rgb(57,154,249)"
//     }
// });

const lightGreyHeader = "rgb(247,247,247)";

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
};

const ModifyDirectoryList = props => {
    const [tab, setTab] = useState(0);

    const has_data =
        props.location && props.location.state && props.location.state.data;

    const handleChange = (_event, value) => {
        setTab(value);
    };

    return (
        <div
            style={{
                width: "100%",
                // height: "100%",
                // height: "calc(100vh-80px)",
                // overflowY: "auto",
                backgroundColor: lightGreyHeader
            }}
        >
            <div
                style={{
                    height: 60,
                    fontSize: "2em",
                    fontWeight: 700,
                    paddingTop: 20,
                    paddingBottom: 20
                }}
            >
                SYSTEM CONTENT: {has_data ? "MODIFY" : "ADD"} DIRECTORY LIST
            </div>
            <Paper
                square
                style={{
                    backgroundColor: lightGreyHeader,
                    boxShadow: "none",
                    borderBottom: "2px solid rgb(217,217,217)"
                }}
            >
                <Tabs
                    value={tab}
                    // classes={{
                    //     indicator: props.classes.indicator
                    // }}
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: "rgb(57,154,249)"
                        }
                    }}
                    onChange={handleChange}
                >
                    >
                    <Tab label="PREVIEW" />
                    <Tab label="LAYOUT" />
                    <Tab label="CONTENT" />
                </Tabs>
            </Paper>
            <ContainerDivTab>
                {tab === 0 && <TabContainer>PREVIEW</TabContainer>}
                {tab === 1 && (
                    <TabContainer>
                        <ModifyDirectoryListLayout />
                    </TabContainer>
                )}
                {tab === 2 && (
                    <TabContainer>
                        <ModifyDirectoryListContent />
                    </TabContainer>
                )}
            </ContainerDivTab>
        </div>
    );
};

// export default withStyles(styles)(ModifyDirectoryList);
export default ModifyDirectoryList;
