import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// import Typography from "@material-ui/core/Typography";
import WelcomeAccountClient from "./WelcomeAccountClient";
import WelcomeAccountPaymentAgreement from "./WelcomeAccountPaymentAgreement";
import Button from "@material-ui/core/Button";

import {
    MainSectionContainer,
    PageHeader,
    SubSectionTop,
    TopButtonsContiner
} from "./WelcomeStyleSet";

const styles = theme => ({
    root: {
        flexGrow: 1,
        // backgroundColor: theme.palette.background.paper
        backgroundColor: "#F4F4F4"
    },
    tabsRoot: {
        borderBottom: "1px solid #e8e8e8"
    },
    tabsIndicator: {
        backgroundColor: "#2699FB"
    },
    tabRoot: {
        fontSize: "1.1em",
        textTransform: "initial",
        minWidth: 250,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing.unit * 4,
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(","),
        "&:hover": {
            color: "#40a9ff",
            opacity: 1
        },
        "&$tabSelected": {
            // color: "#1890ff",
            color: "#2699FB",
            fontWeight: theme.typography.fontWeightMedium
        },
        "&:focus": {
            color: "#40a9ff"
        }
    },
    tabSelected: {},
    typography: {
        padding: theme.spacing.unit * 3
    },
    blueButtons: {
        backgroundColor: "rgb(33, 143, 250)",
        borderRadius: "5px",
        color: "white",
        margin: "2%",
        padding: "5% 0"
    }
});

class WelcomeAccount extends Component {
    state = {
        value: 0
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };
    render() {
        const { classes, data } = this.props;
        const { value } = this.state;

        return (
            <MainSectionContainer>
                <SubSectionTop>
                    <PageHeader style={{ width: "75%" }}>Account</PageHeader>
                    <TopButtonsContiner>
                        <Button
                            type="submit"
                            variant="outlined"
                            className={classes.blueButtons}
                        >
                            SAVE & EXIT
                        </Button>
                        <Button
                            variant="outlined"
                            //  onClick={saveAndKeepEditing}
                            className={classes.blueButtons}
                        >
                            SAVE & KEEP EDITING
                        </Button>
                    </TopButtonsContiner>
                </SubSectionTop>

                <div className={classes.root}>
                    <Tabs
                        classes={{
                            root: classes.tabsRoot,
                            indicator: classes.tabsIndicator
                        }}
                        value={value}
                        onChange={this.handleChange}
                    >
                        <Tab
                            disableRipple
                            classes={{
                                root: classes.tabRoot,
                                selected: classes.tabSelected
                            }}
                            label="Account Details"
                        />
                        <Tab
                            disableRipple
                            classes={{
                                root: classes.tabRoot,
                                selected: classes.tabSelected
                            }}
                            label="Payment & Agreement"
                        />
                    </Tabs>
                    {value === 0 && (
                        <div className={classes.typography}>
                            <WelcomeAccountClient data={data} />
                        </div>
                    )}
                    {value === 1 && (
                        <div className={classes.typography}>
                            <WelcomeAccountPaymentAgreement />
                        </div>
                    )}
                </div>
            </MainSectionContainer>
        );
    }
}

export default withStyles(styles)(WelcomeAccount);
