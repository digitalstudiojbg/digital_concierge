import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// import Typography from "@material-ui/core/Typography";
import WelcomeAccountClient from "./WelcomeAccountClient";
import WelcomeAccountPaymentAgreement from "./WelcomeAccountPaymentAgreement";

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
        backgroundColor: "#1890ff"
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
            color: "#1890ff",
            fontWeight: theme.typography.fontWeightMedium
        },
        "&:focus": {
            color: "#40a9ff"
        }
    },
    tabSelected: {},
    typography: {
        padding: theme.spacing.unit * 3
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
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#F4F4F4",
                    padding: "3%"
                }}
            >
                <div
                    style={{
                        fontSize: "2em",
                        paddingBottom: "20px"
                    }}
                >
                    Account
                </div>
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
            </div>
        );
    }
}

export default withStyles(styles)(WelcomeAccount);
