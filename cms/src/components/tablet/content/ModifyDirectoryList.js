import React from "react";
import {
    ContainerDiv,
    CreateContentContainerDiv,
    TABLET_CMS_CREATE_CONTENT_INDEX_URL,
    modifyDirectoryListData
} from "../../../utils/Constants";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import SingleImageUploader from "../../../utils/SingleImageUploader";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TreeviewCheckbox from "../../../utils/TreeviewCheckbox";
import { Query } from "react-apollo";
import Loading from "../../loading/Loading";
import { withApollo } from "react-apollo";
import { getDirectoryListBySystem } from "../../../data/query";
import PropTypes from "prop-types";
import UploadFile from "./UploadFile";

const styles = theme => ({
    saveButton: {
        color: "white",
        background: "#A5A4BF",
        marginLeft: 0
    },
    cancelButton: {
        marginLeft: 30,
        color: "#A2A2A2"
    },
    categoryNameTextField: {
        width: "100%"
    },
    categoryNameFormHelper: {
        fontSize: "0.7em",
        marginLeft: "0px"
    }
});

const DirectoryListSchema = Yup.object().shape({
    name: Yup.string().required("Required")
});

function SlideUpTransition(props) {
    return <Slide direction="up" {...props} />;
}

class ModifyDirectoryList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            imageName: "",
            openDialog: false,
            whichDialog: "",
            selected_directory: null
        };
        this.updateSelectedDirectory = this.updateSelectedDirectory.bind(this);
        this.changeImageName = this.changeImageName.bind(this);
        this.imageUploaderRef = React.createRef();
        this.removeImage = this.removeImage.bind(this);
        this.navigateAway = this.navigateAway.bind(this);
        this.openDialogImage = this.openDialogImage.bind(this);
        this.openDialogCancel = this.openDialogCancel.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }

    updateSelectedDirectory(selected_directory) {
        this.setState({ selected_directory });
    }

    changeImageName(imageName) {
        this.setState({ imageName });
    }

    removeImage() {
        this.imageUploaderRef.removeImage();
        this.setState({ openDialog: false, whichDialog: "" });
    }

    navigateAway() {
        const { history } = this.props;
        this.setState({ openDialog: false }, () => {
            history.push(TABLET_CMS_CREATE_CONTENT_INDEX_URL);
        });
    }

    openDialogImage() {
        this.setState({ openDialog: true, whichDialog: "image" });
    }
    openDialogCancel() {
        this.setState({ openDialog: true, whichDialog: "cancel" });
    }
    closeDialog() {
        this.setState({ openDialog: false, whichDialog: "" });
    }

    render() {
        console.log(this.props);
        const { selected_directory } = this.state;
        const { classes, location = {} } = this.props;
        const { data: editData = null } = location.state || {};
        const titleText = Boolean(editData)
            ? "EDIT TIER ENTRY"
            : "ADD TIER ENTRY";
        const subTitleText = "TIER TITLE";

        return (
            <ContainerDiv>
                <Formik
                    initialValues={{ name: "" }}
                    onSubmit={(values, { setSubmitting }) => {
                        //TODO: Add logic to send mutation to DB
                        alert(values.name);
                        setSubmitting(false);
                    }}
                    validationSchema={DirectoryListSchema}
                >
                    {({ isSubmitting, errors, values }) => (
                        <Form>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: 40
                                }}
                            >
                                <div
                                    style={{
                                        color: "rgb(35,38,92)",
                                        fontSize: "2.7em",
                                        width: "52%"
                                    }}
                                >
                                    {titleText}
                                </div>
                                <div style={{ width: "10%" }}>
                                    <Button
                                        className={classes.cancelButton}
                                        disabled={isSubmitting}
                                        size="large"
                                        variant="outlined"
                                        onClick={this.openDialogCancel}
                                    >
                                        CANCEL
                                    </Button>
                                </div>
                                <div style={{ width: "10%" }}>
                                    <Button
                                        type="submit"
                                        disabled={
                                            isSubmitting ||
                                            Boolean(errors.name) ||
                                            !Boolean(values.name) ||
                                            values.name.length === 0 ||
                                            !Boolean(selected_directory)
                                        }
                                        className={classes.saveButton}
                                        variant="outlined"
                                        size="large"
                                    >
                                        ADD & SAVE
                                    </Button>
                                </div>
                            </div>
                            <CreateContentContainerDiv>
                                <div style={{ width: "50%" }}>
                                    <div style={{ padding: 20 }}>
                                        HEADER IMAGE:
                                    </div>
                                    <SingleImageUploader
                                        onRef={ref =>
                                            (this.imageUploaderRef = ref)
                                        }
                                        updateImageName={this.changeImageName}
                                    />
                                </div>
                                <div style={{ width: "50%" }}>
                                    <div
                                        style={{
                                            padding: "20px 20px 20px 0px"
                                        }}
                                    >
                                        {subTitleText}
                                    </div>
                                    {/* <Field name="name" style={{width: "100%", height: "5vh", fontSize: "1.5em"}} /> */}
                                    <Field
                                        name="name"
                                        validateOnBlur
                                        validateOnChange
                                        render={({ field, form }) => (
                                            <TextField
                                                className={
                                                    classes.categoryNameTextField
                                                }
                                                variant="outlined"
                                                name={field.name}
                                                value={field.value}
                                                onChange={field.onChange}
                                                onBlur={field.onBlur}
                                                error={
                                                    form.errors[field.name] &&
                                                    form.touched[field.name]
                                                }
                                                helperText={
                                                    form.errors[field.name] &&
                                                    form.touched[field.name] &&
                                                    String(
                                                        form.errors[field.name]
                                                    )
                                                }
                                                FormHelperTextProps={{
                                                    classes: {
                                                        root:
                                                            classes.categoryNameFormHelper
                                                    }
                                                }}
                                            />
                                        )}
                                    />
                                    <div
                                        style={{ width: "60%", marginTop: 40 }}
                                    >
                                        <div style={{ fontSize: "0.8em" }}>
                                            IMAGE NAME
                                        </div>
                                        <TextField
                                            disabled={true}
                                            value={this.state.imageName}
                                            // className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            disabled={
                                                                this.state
                                                                    .imageName
                                                                    .length ===
                                                                0
                                                            }
                                                            onClick={
                                                                this
                                                                    .openDialogImage
                                                            }
                                                        >
                                                            <CancelIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "0.8em",
                                            marginTop: 20
                                        }}
                                    >
                                        SELECT LOCATION
                                        <span
                                            style={{
                                                fontSize: "0.7em"
                                            }}
                                        >
                                            LEAVE BLANK IF CREATING A FIRST TIER
                                            CATEGORY
                                        </span>
                                    </div>
                                    <Query query={getDirectoryListBySystem(1)}>
                                        {({ loading, error, data }) => {
                                            if (loading)
                                                return <Loading loadingData />;
                                            if (error)
                                                return `Error! ${
                                                    error.message
                                                }`;
                                            const modifiedData = modifyDirectoryListData(
                                                data.directoryLists_by_system
                                            );
                                            return (
                                                <TreeviewCheckbox
                                                    data={modifiedData}
                                                    updateSelectedDirectory={
                                                        this
                                                            .updateSelectedDirectory
                                                    }
                                                    selectAmount="single"
                                                />
                                            );
                                        }}
                                    </Query>
                                </div>
                            </CreateContentContainerDiv>
                        </Form>
                    )}
                </Formik>
                <Dialog
                    open={this.state.openDialog}
                    TransitionComponent={SlideUpTransition}
                    keepMounted
                    onClose={this.closeDialog}
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {this.state.whichDialog === "image" && (
                            <p>CONFIRM IMAGE DELETION</p>
                        )}
                        {this.state.whichDialog === "cancel" && (
                            <p>CONFIRM PAGE NAVIGATION</p>
                        )}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {this.state.whichDialog === "image" && (
                                <p>
                                    PLEASE CONFIRM IF YOU WANT TO REMOVE TIER
                                    IMAGE.
                                </p>
                            )}
                            {this.state.whichDialog === "cancel" && (
                                <p>ARE YOU SURE YOU WANT TO LEAVE THIS PAGE?</p>
                            )}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {this.state.whichDialog === "image" && (
                            <React.Fragment>
                                <Button
                                    onClick={this.removeImage}
                                    color="primary"
                                >
                                    YES
                                </Button>
                                <Button
                                    onClick={this.closeDialog}
                                    color="primary"
                                >
                                    NO
                                </Button>
                            </React.Fragment>
                        )}
                        {this.state.whichDialog === "cancel" && (
                            <React.Fragment>
                                <Button
                                    onClick={this.navigateAway}
                                    color="primary"
                                >
                                    LEAVE
                                </Button>
                                <Button
                                    onClick={this.closeDialog}
                                    color="primary"
                                >
                                    STAY
                                </Button>
                            </React.Fragment>
                        )}
                    </DialogActions>
                </Dialog>
                <UploadFile />
            </ContainerDiv>
        );
    }
}

ModifyDirectoryList.defaultProps = {};

ModifyDirectoryList.propTypes = {};

export default withApollo(withStyles(styles)(ModifyDirectoryList));
