import React from "react";
import {
    Tabs,
    Tab,
    Paper,
    Button,
    Tooltip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Grid,
    Menu,
    MenuItem
} from "@material-ui/core";
import DialogTitleHelper from "./DialogTitleHelper";
import PropTypes from "prop-types";
import { ContainerDiv, SlideUpTransition } from "./Constants";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { withApollo, compose, graphql } from "react-apollo";
import { getTabbedPageComplete } from "../data/query";
import InfoIcon from "@material-ui/icons/Info";
import ExpandIcon from "@material-ui/icons/ExpandMore";
import { isEmpty } from "lodash";

import {
    SubSectionTop,
    PageHeader,
    MainSectionContainer,
    TopButtonsContainer,
    ContainerDivTab
} from "../components/home/create_client/CreateClientStyleSet";

const StyledTooltip = styled(props => (
    <Tooltip
        classes={{ popper: props.className, tooltip: "tooltip" }}
        {...props}
    />
))`
    & .tooltip {
        // background-color: papayawhip;
        // color: #000;
        font-size: ${props => props.fontSize};
    }
`;

const TabContainer = props => {
    return <ContainerDiv>{props.children}</ContainerDiv>;
};

const styles = () => ({
    buttonSave: {
        // width: 200,
        // position: "absolute",
        // top: 140,
        // right: 20,
        // backgroundColor: "#2699FB",
        // color: "white",
        // fontFamily: "Source Sans Pro, sans-serif",
        // paddingRight: 5
        backgroundColor: "rgb(33, 143, 250)",
        borderRadius: "5px",
        color: "white",
        margin: "2%",
        padding: "3% 0"
    },
    rightIcon: {
        color: "white"
    },
    rightGrid: {
        borderLeft: "1px solid rgb(31,126,218)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonCancel: {
        // width: 200,
        // position: "absolute",
        // top: 100,
        // right: 20,
        backgroundColor: "#595959",
        color: "white",
        fontFamily: "Source Sans Pro, sans-serif",
        margin: "2%",
        padding: "3% 0"
    }
});

const lightGreyHeader = "rgb(247,247,247)";

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
};

class TabbedPage extends React.Component {
    childComponentsRefs = null;
    constructor(props) {
        super(props);
        const { tabs } = props;
        this.childComponentsRefs = tabs.map(() => React.createRef());
        this.state = { tab: 0, exit: false, openDialog: false, anchorEl: null };
        this.setIsComplete = this.setIsComplete.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.openSaveMenu = this.openSaveMenu.bind(this);
        this.closeSaveMenu = this.closeSaveMenu.bind(this);
    }

    openDialog = () => this.setState({ openDialog: true });
    closeDialog = () => this.setState({ openDialog: false });
    openSaveMenu = event => this.setState({ anchorEl: event.currentTarget });
    closeSaveMenu = () => this.setState({ anchorEl: null });

    handleChange = (_event, tab) => {
        // console.log(this.childComponentsRefs);
        this.setState({ tab });
    };

    submitAction = () => {
        const { tab } = this.state;
        // console.log(this.childComponentsRefs[tab]);
        this.setState({ anchorEl: null }, () => {
            this.childComponentsRefs[tab] &&
                this.childComponentsRefs[tab].submitForm();
        });
    };

    submitExitAction = () => {
        const { tab } = this.state;
        this.setState({ exit: true, anchorEl: null }, () => {
            this.childComponentsRefs[tab] &&
                this.childComponentsRefs[tab].submitForm();
        });
    };

    handleCancel = () => {
        const { tab } = this.state;
        console.log(this.childComponentsRefs[tab]);
        if (
            !isEmpty(this.childComponentsRefs[tab]) &&
            !isEmpty(this.childComponentsRefs[tab].state) &&
            !isEmpty(this.childComponentsRefs[tab].state.touched)
        ) {
            this.setState({ openDialog: true });
        } else {
            this.submitCancelAction();
        }
    };

    submitCancelAction = () => {
        const { history, cancelUrl } = this.props;
        Boolean(cancelUrl) && history.push(cancelUrl);
    };

    exitAction = () => {
        const { history, exitUrl } = this.props;
        Boolean(exitUrl) && history.push(exitUrl);
    };

    resetIsComplete() {
        const { client } = this.props;
        client.writeData({
            data: {
                tabbed_page_complete: false
            }
        });
    }

    setIsComplete() {
        const { client } = this.props;
        client.writeData({
            data: {
                tabbed_page_complete: true
            }
        });
    }

    componentDidUpdate(prevProps) {
        const {
            tabbed_page_complete: current_tabbed_page_complete
        } = this.props.isComplete;
        const {
            tabbed_page_complete: prev_tabbed_page_complete
        } = prevProps.isComplete;
        const { exit } = this.state;
        if (prev_tabbed_page_complete !== current_tabbed_page_complete) {
            //From false to true
            if (
                !prev_tabbed_page_complete &&
                current_tabbed_page_complete &&
                exit
            ) {
                this.exitAction();
            }
            this.resetIsComplete();
        }
    }

    componentWillUnmount() {
        this.resetIsComplete();
    }

    render() {
        const {
            classes,
            title,
            data,
            tabs,
            tooltipText,
            tooltipColor,
            tooltipFontSize,
            otherProps
        } = this.props;
        const { tab, openDialog, anchorEl } = this.state;
        const CurrentComponent = tabs[tab].component;
        const shouldRenderButtons = tabs[tab].withButtons;
        const shouldRenderCancelButton = tabs[tab].withCancel;
        const isSubmitting =
            !isEmpty(this.childComponentsRefs[tab]) &&
            !isEmpty(this.childComponentsRefs[tab].state) &&
            this.childComponentsRefs[tab].state.isSubmitting;
        return (
            <React.Fragment>
                <MainSectionContainer
                    style={
                        {
                            // padding: "0"
                        }
                    }
                >
                    <SubSectionTop>
                        {/* style={{ padding: "3% 3% 0 3%" }} */}
                        <PageHeader
                            style={{ width: "80%", display: "flex" }}
                            // style={{
                            //     height: 60,
                            //     fontSize: "2em",
                            //     fontWeight: 700,
                            //     paddingTop: 20,
                            //     paddingBottom: 20,
                            //     display: "flex"
                            // }}
                        >
                            {title}
                            {Boolean(tooltipText) && (
                                <div style={{ paddingLeft: 10 }}>
                                    <StyledTooltip
                                        // classes={{ tooltip: classes.tooltip }}
                                        title={tooltipText}
                                        placement="bottom"
                                        fontSize={tooltipFontSize}
                                    >
                                        <InfoIcon
                                            style={{ color: tooltipColor }}
                                            fontSize="small"
                                        />
                                    </StyledTooltip>
                                </div>
                            )}
                        </PageHeader>

                        <TopButtonsContainer>
                            {shouldRenderButtons && (
                                <React.Fragment>
                                    {shouldRenderCancelButton && (
                                        <Button
                                            variant="outlined"
                                            className={classes.buttonCancel}
                                            onClick={this.handleCancel}
                                            disabled={isSubmitting}
                                        >
                                            CANCEL
                                        </Button>
                                    )}
                                    <Button
                                        variant="outlined"
                                        className={classes.buttonSave}
                                        onClick={this.openSaveMenu}
                                        disabled={isSubmitting}
                                    >
                                        <Grid container direction="row">
                                            <Grid
                                                item
                                                xs={10}
                                                justify="center"
                                                alignItems="center"
                                            >
                                                SAVE
                                            </Grid>
                                            <Grid
                                                item
                                                xs={2}
                                                className={classes.rightGrid}
                                                justify="center"
                                            >
                                                <ExpandIcon
                                                    className={
                                                        classes.rightIcon
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                    </Button>
                                </React.Fragment>
                            )}
                        </TopButtonsContainer>
                    </SubSectionTop>
                    <ContainerDivTab style={{ height: "100%" }}>
                        <Paper
                            square
                            style={{
                                backgroundColor: "#F4F4F4",
                                boxShadow: "none",
                                borderBottom: "2px solid rgb(217,217,217)",
                                marginBottom: "20px"
                            }}
                        >
                            <Tabs
                                value={tab}
                                TabIndicatorProps={{
                                    style: {
                                        backgroundColor: "rgb(57,154,249)"
                                    }
                                }}
                                onChange={this.handleChange}
                            >
                                {tabs.map(({ name }, index) => (
                                    <Tab
                                        label={name}
                                        key={`TAB-${title}-${index}`}
                                    />
                                ))}
                            </Tabs>
                        </Paper>
                        <TabContainer>
                            {Array.isArray(this.childComponentsRefs) &&
                                this.childComponentsRefs.length > 0 && (
                                    <CurrentComponent
                                        data={data}
                                        onRef={ref =>
                                            (this.childComponentsRefs[
                                                tab
                                            ] = ref)
                                        } //This props is to be linked to the Formik ref prop
                                        setIsComplete={this.setIsComplete} //This prop is to tell that the form has finished submission
                                        {...!isEmpty(otherProps) && {
                                            otherProps
                                        }}
                                    />
                                )}
                        </TabContainer>
                    </ContainerDivTab>
                </MainSectionContainer>
                <Dialog
                    open={openDialog}
                    TransitionComponent={SlideUpTransition}
                    keepMounted
                    onClose={this.closeDialog}
                >
                    <DialogTitleHelper onClose={this.closeDialog}>
                        CONFIRM PAGE NAVIGATION
                    </DialogTitleHelper>
                    <DialogContent>
                        <DialogContentText component="div">
                            <div
                                style={{
                                    paddingTop: 10
                                }}
                            >
                                ARE YOU SURE YOU WANT TO LEAVE THIS PAGE?
                            </div>
                            <div>YOU HAVE UNSAVED CHANGES.</div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="primary"
                            onClick={this.submitCancelAction}
                        >
                            LEAVE
                        </Button>
                        <Button color="primary" onClick={this.closeDialog}>
                            STAY
                        </Button>
                    </DialogActions>
                </Dialog>
                <Menu
                    id="save-popup"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.closeSaveMenu}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left"
                    }}
                >
                    <MenuItem
                        style={{ padding: "" }}
                        onClick={this.submitExitAction}
                    >
                        SAVE & EXIT
                    </MenuItem>
                    <MenuItem onClick={this.submitAction}>
                        SAVE & KEEP EDITING
                    </MenuItem>
                </Menu>
            </React.Fragment>
        );
    }
}

TabbedPage.defaultProps = {
    tooltipColor: "rgb(38, 153, 251)",
    tooltipFontSize: "0.8em"
};

TabbedPage.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    data: PropTypes.any,
    exitUrl: PropTypes.string,
    cancelUrl: PropTypes.string,
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            component: PropTypes.any.isRequired,
            withButtons: PropTypes.bool.isRequired,
            withCancel: PropTypes.bool.isRequired
        })
    ),
    tooltipColor: PropTypes.string,
    tooltipFontSize: PropTypes.string,
    tooltipText: PropTypes.string,
    otherProps: PropTypes.object
};

export default compose(
    withApollo,
    withRouter,
    withStyles(styles),
    graphql(getTabbedPageComplete, { name: "isComplete" })
)(TabbedPage);
