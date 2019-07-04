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
import PropTypes from "prop-types";
import { ContainerDiv, SlideUpTransition } from "./Constants";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import ExpandIcon from "@material-ui/icons/ExpandMore";
import { isEmpty } from "lodash";
import { Formik, Form } from "formik";
import DialogTitleHelper from "./DialogTitleHelper";

const ContainerDivTab = styled.div`
    width: 100%;
    overflow-y: auto;
    height: 80vh;
`;
const PageHeader = styled.h2`
    fontsize: 30px;
    padding-bottom: 2%;
`;
const TopButtonsContainer = styled.div`
    width: 12%;
    display: flex;
    flex-direction: column;
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
    buttonSave: {
        backgroundColor: "rgb(33, 143, 250)",
        borderRadius: "5px",
        color: "white",
        margin: "2%",
        padding: "3% 0"
    },
    buttonCancel: {
        backgroundColor: "#595959",
        color: "white",
        fontFamily: "Source Sans Pro, sans-serif",
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

    myInput: {
        padding: "12px 10px",
        backgroundColor: "white"
    }
});

const lightGreyHeader = "rgb(247,247,247)";

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
};

class TabbedPageSingleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tab: 0, openDialog: false, anchorEl: null };
        this.closeDialog = this.closeDialog.bind(this);
        this.cancelAction = this.cancelAction.bind(this);
        this.openSaveMenu = this.openSaveMenu.bind(this);
        this.closeSaveMenu = this.closeSaveMenu.bind(this);
        this.submitAction = this.submitAction.bind(this);
        this.submitExitAction = this.submitExitAction.bind(this);
    }

    openSaveMenu = event => this.setState({ anchorEl: event.currentTarget });
    closeSaveMenu = () => this.setState({ anchorEl: null });

    handleChange = (_event, tab) => {
        this.setState({ tab });
    };

    submitAction = () => {
        const { submitForm, errors } = this.props.formikProps;
        this.setState({ anchorEl: null }, () => {
            isEmpty(errors) && Boolean(submitForm) && submitForm();
        });
    };

    submitExitAction = () => {
        const { setToExitAfterSubmission, formikProps } = this.props;
        const { submitForm, errors } = formikProps;
        this.setState({ anchorEl: null }, () => {
            setToExitAfterSubmission(() => {
                isEmpty(errors) && Boolean(submitForm) && submitForm();
            });
        });
    };

    submitCancelAction = () => {
        const { formikProps } = this.props;
        const { dirty } = formikProps || {};
        if (!dirty) {
            this.cancelAction();
        } else {
            this.setState({ openDialog: true });
        }
    };

    cancelAction = () => {
        const { history, cancelUrl } = this.props;
        Boolean(cancelUrl) && history.push(cancelUrl);
    };

    closeDialog = () => {
        this.setState({ openDialog: false });
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
            formikProps
        } = this.props;
        const { isSubmitting } = formikProps;
        const { tab, openDialog, anchorEl } = this.state;
        const CurrentComponent = tabs[tab].component;
        const shouldRenderButtons = tabs[tab].withButtons;
        const shouldRenderCancelButton = tabs[tab].withCancel;

        return (
            <React.Fragment>
                <ContainerDiv
                    style={{
                        padding: "3%"
                    }}
                >
                    <div
                        style={{
                            display: "flex"
                        }}
                    >
                        <PageHeader
                            style={{
                                flexBasis: "80%",
                                display: "flex",
                                color: "black"
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
                        </PageHeader>
                        <TopButtonsContainer>
                            {shouldRenderButtons && (
                                <React.Fragment>
                                    {shouldRenderCancelButton && (
                                        <Button
                                            variant="outlined"
                                            className={classes.buttonCancel}
                                            onClick={this.submitCancelAction}
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

                    <ContainerDivTab>
                        <TabContainer>
                            <CurrentComponent
                                data={data}
                                {...!isEmpty(otherProps) && {
                                    otherProps
                                }}
                                formikProps={{ ...formikProps }}
                            />
                        </TabContainer>
                    </ContainerDivTab>
                </ContainerDiv>
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
                        <Button color="primary" onClick={this.cancelAction}>
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
                        style={{ padding: "0 8px" }}
                        onClick={this.submitExitAction}
                    >
                        SAVE & EXIT
                    </MenuItem>
                    <MenuItem
                        style={{ padding: "0 8px" }}
                        onClick={this.submitAction}
                    >
                        SAVE & KEEP EDITING
                    </MenuItem>
                </Menu>
            </React.Fragment>
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
    onSubmit: PropTypes.func.isRequired,
    setToExitAfterSubmission: PropTypes.func.isRequired
};

const TabbedPageSingleFormComponent = withRouter(
    withStyles(styles)(TabbedPageSingleForm)
);

const TabbedPageSingleFormHOC = props => (
    <Formik
        {...!isEmpty(props.validationSchema) && {
            validationSchema: props.validationSchema
        }}
        enableReinitialize={true}
        initialValues={{ ...props.data }}
        onSubmit={props.onSubmit}
    >
        {formikProps => (
            <Form>
                <TabbedPageSingleFormComponent
                    {...props}
                    formikProps={{ ...formikProps }}
                />
            </Form>
        )}
    </Formik>
);

export default TabbedPageSingleFormHOC;
