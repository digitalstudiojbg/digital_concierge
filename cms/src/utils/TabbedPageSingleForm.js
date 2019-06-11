import React from "react";
import { Tabs, Tab, Paper, Button, Tooltip } from "@material-ui/core";
import PropTypes from "prop-types";
import { ContainerDiv } from "./Constants";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import { isEmpty } from "lodash";
import { Formik, Form } from "formik";

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

class TabbedPageSingleForm extends React.Component {
    constructor(props) {
        super(props);
        this.formikRef = React.createRef();
        this.state = { tab: 0, exit: false };
    }

    handleChange = (_event, tab) => {
        this.setState({ tab });
    };

    submitAction = () => {
        this.formikRef && this.formikRef.current.submitForm();
    };

    submitExitAction = () => {
        this.setState({ exit: true }, () => {
            this.formikRef && this.formikRef.current.submitForm();
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

    render() {
        const {
            classes,
            title,
            data,
            tabs,
            tooltipText,
            tooltipColor,
            tooltipFontSize,
            otherProps,
            onSubmit
        } = this.props;
        const { tab, exit } = this.state;
        const CurrentComponent = tabs[tab].component;
        const shouldRenderButtons = tabs[tab].withButtons;
        const shouldRenderCancelButton = tabs[tab].withCancel;

        return (
            <Formik
                enableReinitialize={true}
                initialValues={{ ...data }}
                ref={this.formikRef}
                onSubmit={onSubmit}
            >
                {formikProps => (
                    <Form>
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
                                        <Tab
                                            label={name}
                                            key={`TAB-${title}-${index}`}
                                        />
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
                                    <CurrentComponent
                                        data={data}
                                        {...!isEmpty(otherProps) && {
                                            otherProps
                                        }}
                                        formikProps={{ ...formikProps }}
                                        exit={exit}
                                        exitAction={this.exitAction}
                                    />
                                </TabContainer>
                            </ContainerDivTab>
                        </div>
                    </Form>
                )}
            </Formik>
        );
    }
}

TabbedPageSingleForm.defaultProps = {
    tooltipColor: "rgb(38, 153, 251)",
    tooltipFontSize: "0.8em"
};

TabbedPageSingleForm.propTypes = {
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
    otherProps: PropTypes.object,
    onSubmit: PropTypes.func.isRequired
};

export default withRouter(withStyles(styles)(TabbedPageSingleForm));
