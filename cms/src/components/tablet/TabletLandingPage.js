import React, { Component } from "react";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
};

const lightGreyHeader = "rgb(247,247,247)";
const lightGreyText = "rgb(124,128,161)";

class TabletLandingPage extends Component {
    state = {
        value: 0
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { value } = this.state;

        return (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    justifyContent: "flex-start",
                    alignItems: "stretch",
                    alignContent: "stretch"
                }}
            >
                <div
                    style={{
                        width: "100%",
                        backgroundColor: lightGreyHeader,
                        height: "162px",
                        padding: "1.5vh 2vw 0.5vh 2vw"
                    }}
                >
                    <p style={{ color: lightGreyText, fontSize: "2em" }}>
                        Landing Page
                    </p>
                    <p
                        style={{
                            color: lightGreyText,
                            fontSize: "1.3em",
                            paddingTop: "10px"
                        }}
                    >
                        This is the first page a customer will see to encourage
                        them to use the device.
                    </p>
                </div>
                <div
                    style={{
                        width: "100%",
                        backgroundColor: lightGreyHeader,
                        padding: "0 2vw 0 2vw"
                    }}
                >
                    <Paper
                        square
                        style={{
                            backgroundColor: lightGreyHeader,
                            boxShadow: "none"
                        }}
                    >
                        <Tabs value={value} onChange={this.handleChange}>
                            <Tab label="PREVIEW" />
                            <Tab label="LAYOUT" />
                            <Tab label="CONTENT" />
                        </Tabs>
                    </Paper>
                </div>
                <div
                    style={{
                        width: "100%",
                        backgroundColor: "white",
                        overflowY: "scroll",
                        flexGrow: "1"
                    }}
                >
                    {value === 0 && <TabContainer>PREVIEW</TabContainer>}
                    {value === 1 && <TabContainer>LAYOUT</TabContainer>}
                    {value === 2 && <TabContainer>CONTENT</TabContainer>}
                </div>
            </div>
        );
    }
}

export default TabletLandingPage;
