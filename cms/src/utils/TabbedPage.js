import React from "react";
import { Tabs, Tab, Paper, Button, Tooltip } from "@material-ui/core";
import PropTypes from "prop-types";
import { ContainerDiv } from "./Constants";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { withApollo, compose, graphql } from "react-apollo";
import { getTabbedPageComplete } from "../data/query";
import InfoIcon from "@material-ui/icons/Info";
import { isEmpty } from "lodash";

const ContainerDivTab = styled.div`
    width: 100%;
    overflow-y: auto;
    height: 77vh;
`;

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
    buttonSaveExit: {
        width: 160,
        position: "absolute",
        top: 100,
        right: 20,
        backgroundColor: "rgb(33,143,250)",
        color: "white",
        fontFamily: "Source Sans Pro, sans-serif"
    },
    buttonSaveKeep: {
        width: 160,
        position: "absolute",
        top: 140,
        right: 20,
        backgroundColor: "rgb(33,143,250)",
        color: "white",
        fontFamily: "Source Sans Pro, sans-serif"
    },
    buttonCancel: {
        position: "absolute",
        top: 140,
        right: 190,
        backgroundColor: "white",
        color: "rgb(33,143,250)",
        border: "2px solid rgb(33,143,250)",
        fontWeight: 600,
        fontFamily: "Source Sans Pro, sans-serif"
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
        this.state = { tab: 0, exit: false };
        this.setIsComplete = this.setIsComplete.bind(this);
    }

    handleChange = (_event, tab) => {
        // console.log(this.childComponentsRefs);
        this.setState({ tab });
    };

    submitAction = () => {
        const { tab } = this.state;
        // console.log(this.childComponentsRefs[tab]);
        this.childComponentsRefs[tab] &&
            this.childComponentsRefs[tab].submitForm();
    };

    submitExitAction = () => {
        const { tab } = this.state;
        this.setState({ exit: true }, () => {
            this.childComponentsRefs[tab] &&
                this.childComponentsRefs[tab].submitForm();
        });
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
        const { tab } = this.state;
        const CurrentComponent = tabs[tab].component;
        const shouldRenderButtons = tabs[tab].withButtons;
        const shouldRenderCancelButton = tabs[tab].withCancel;

        return (
            <div
                style={{
                    width: "100%",
                    backgroundColor: lightGreyHeader
                }}
            >
                <div
                    style={{
                        height: 60,
                        fontSize: "2em",
                        fontWeight: 700,
                        paddingTop: 20,
                        paddingBottom: 20,
                        display: "flex"
                    }}
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
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: "rgb(57,154,249)"
                            }
                        }}
                        onChange={this.handleChange}
                    >
                        {tabs.map(({ name }, index) => (
                            <Tab label={name} key={`TAB-${title}-${index}`} />
                        ))}
                    </Tabs>
                </Paper>
                {shouldRenderButtons && (
                    <React.Fragment>
                        <Button
                            variant="outlined"
                            className={classes.buttonSaveExit}
                            onClick={this.submitExitAction}
                        >
                            SAVE & EXIT
                        </Button>
                        <Button
                            variant="outlined"
                            className={classes.buttonSaveKeep}
                            onClick={this.submitAction}
                        >
                            SAVE & KEEP EDITING
                        </Button>
                        {shouldRenderCancelButton && (
                            <Button
                                variant="outlined"
                                className={classes.buttonCancel}
                                onClick={this.submitCancelAction}
                            >
                                CANCEL
                            </Button>
                        )}
                    </React.Fragment>
                )}
                <ContainerDivTab>
                    <TabContainer>
                        {Array.isArray(this.childComponentsRefs) &&
                            this.childComponentsRefs.length > 0 && (
                                <CurrentComponent
                                    data={data}
                                    onRef={ref =>
                                        (this.childComponentsRefs[tab] = ref)
                                    } //This props is to be linked to the Formik ref prop
                                    setIsComplete={this.setIsComplete} //This prop is to tell that the form has finished submission
                                    {...!isEmpty(otherProps) && { otherProps }}
                                />
                            )}
                    </TabContainer>
                </ContainerDivTab>
            </div>
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
