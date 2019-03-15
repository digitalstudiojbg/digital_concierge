import React from "react";
import {
    ContainerDiv,
    CreateContentContainerDiv,
    SYSTEM_CMS_CONTENT_URL
} from "../../../utils/Constants";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { Field } from "formik";
import * as Yup from "yup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { withApollo } from "react-apollo";
import Dropzone from "react-dropzone";
import { withRouter } from "react-router-dom";
import BrowserMedia from "../../../utils/BrowserMedia";
import ColourSchemePicker from "../../../utils/ColourSchemePicker";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = _theme => ({
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
    imageNameTextField: {
        // marginTop: 15,
        paddingBottom: 20,
        width: "60%"
    },
    categoryNameFormHelper: {
        fontSize: "0.7em",
        marginLeft: "0px"
    },
    expansionButton: {
        color: "#F0F2F8",
        background: "#DDDFE7",
        borderRadius: 25
    },
    icon: {
        fontSize: "large"
    },
    dialogTitle: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    removeImageButton: {
        backgroundColor: "white"
    },
    uploadFileButton: {
        backgroundColor: "white",
        marginBottom: 10
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
        const has_data =
            props.location && props.location.state && props.location.state.data;
        const has_media_data =
            has_data &&
            props.location.state.data.media &&
            props.location.state.data.media.length > 0;
        const images = has_media_data
            ? props.location.state.data.media.map(image => ({
                  ...image,
                  uploaded: true
              }))
            : [];

        this.state = {
            imageName: has_media_data
                ? props.location.state.data.media[0].name
                : "",
            openDialog: false,
            whichDialog: "",
            selected_directory:
                has_data &&
                !props.location.state.data.is_root &&
                props.location.state.data.is_dir_list
                    ? props.location.state.data.parent_id
                    : null,
            images,
            is_create: has_data ? false : true
        };

        //Create Referencess
        this.dropZoneRef = React.createRef();

        // this.updateSelectedDirectory = this.updateSelectedDirectory.bind(this);
        this.changeImageName = this.changeImageName.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.navigateAway = this.navigateAway.bind(this);
        this.openDialogImage = this.openDialogImage.bind(this);
        this.openDialogCancel = this.openDialogCancel.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.openFileBrowser = this.openFileBrowser.bind(this);
        this.mediaSelectImage = this.mediaSelectImage.bind(this);
    }

    changeImageName(imageName) {
        this.setState({ imageName });
    }

    navigateAway() {
        const {
            history,
            match: {
                params: { system_id }
            }
        } = this.props;
        this.setState({ openDialog: false }, () => {
            history.push(
                SYSTEM_CMS_CONTENT_URL.replace(":system_id", system_id)
            );
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

    openFileBrowser() {
        this.dropZoneRef.current.open();
    }

    componentWillUnmount() {
        this.state.images.forEach(image => {
            if (!Boolean(image.uploaded) && Boolean(image.preview)) {
                // Make sure to revoke the preview data uris to avoid memory leaks
                URL.revokeObjectURL(image.preview);
            }
        });
    }

    onDrop(images) {
        this.setState(
            {
                images: images.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                        uploaded: false
                    })
                ),
                imageName: images[0].name
            },
            () => {
                this.props.setFieldValue(
                    "images",
                    [...this.state.images],
                    false
                );
            }
        );
    }

    mediaSelectImage(images) {
        this.setState(
            {
                images: images.map(image => ({
                    ...image,
                    uploaded: true
                })),
                imageName: images[0].name
            },
            () => {
                this.props.setFieldValue(
                    "images",
                    [...this.state.images],
                    false
                );
            }
        );
    }

    removeImage() {
        this.setState({
            images: [],
            imageName: "",
            openDialog: false,
            whichDialog: ""
        });
    }

    renderImageUploader() {
        const { classes } = this.props;
        const { images } = this.state;
        const image = images.length > 0 ? images[0] : null;
        return (
            <React.Fragment>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <TextField
                        label="FILENAME"
                        disabled={true}
                        value={this.state.imageName}
                        className={classes.imageNameTextField}
                        fullWidth={true}
                        variant="outlined"
                    />
                    <div
                        style={{
                            width: "35%",
                            height: "80%",
                            display: "flex",
                            paddingLeft: 10,
                            alignItems: "center"
                        }}
                    >
                        <Button
                            variant="outlined"
                            className={classes.removeImageButton}
                            variant="outlined"
                            fullWidth={true}
                            disabled={this.state.imageName.length === 0}
                            onClick={this.openDialogImage}
                        >
                            REMOVE EXISTING
                        </Button>
                    </div>
                </div>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        height: "45%"
                    }}
                >
                    <div style={{ width: "60%", height: "100%" }}>
                        <Dropzone
                            ref={this.dropZoneRef}
                            disableClick={true}
                            style={{
                                color: "rgb(123,123,123)",
                                fontSize: "0.8em",
                                position: "relative",
                                width: "100%",
                                backgroundColor: "rgb(221, 221, 221)",
                                height: "90%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundImage:
                                    Boolean(image) && Boolean(image.uploaded)
                                        ? `url(${image.path})`
                                        : Boolean(image) &&
                                          !Boolean(image.uploaded)
                                        ? `url(${image.preview})`
                                        : "none",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain"
                            }}
                            onDrop={this.onDrop.bind(this)}
                        >
                            {!Boolean(image) && <div>DRAG & DROP HERE</div>}
                        </Dropzone>
                    </div>
                    <div
                        style={{
                            width: "35%",
                            height: "90%",
                            paddingLeft: 10,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end"
                        }}
                    >
                        <Button
                            variant="outlined"
                            className={classes.uploadFileButton}
                            variant="outlined"
                            fullWidth={true}
                            onClick={this.openFileBrowser}
                        >
                            UPLOAD FILE
                        </Button>
                        <BrowserMedia
                            variant="outlined"
                            color="default"
                            buttonStyle={{ backgroundColor: "white" }}
                            fullWidth={true}
                            multipleSelect={false}
                            updateImageSelection={this.mediaSelectImage}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }

    renderColourSchemePicker() {
        const { setFieldValue } = this.props;
        const handleOnChange = colours =>
            setFieldValue("colours", colours, false);
        return (
            <div
                style={{
                    width: "100%",
                    fontSize: "0.5em",
                    height: "40%",
                    color: "black"
                }}
            >
                <ColourSchemePicker handleOnChange={handleOnChange} />
            </div>
        );
    }

    render() {
        const { classes } = this.props;
        const subTitleText = "DIRECTORY LIST TITLE";

        return (
            <ContainerDiv>
                <CreateContentContainerDiv>
                    <div
                        style={{
                            width: "100%",
                            height: "60%",
                            display: "flex"
                        }}
                    >
                        <div style={{ width: "50%" }}>
                            <div style={{ padding: 20 }}>HEADER IMAGE</div>

                            {this.renderImageUploader()}
                        </div>
                        <div style={{ width: "50%" }}>
                            <div
                                style={{
                                    padding: "20px 20px 20px 0px"
                                }}
                            >
                                {subTitleText}
                            </div>
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
                                            String(form.errors[field.name])
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
                        </div>
                    </div>
                    {this.renderColourSchemePicker()}
                </CreateContentContainerDiv>
                <Dialog
                    open={this.state.openDialog}
                    TransitionComponent={SlideUpTransition}
                    keepMounted
                    onClose={this.closeDialog}
                >
                    <DialogTitle
                        id="alert-dialog-slide-title"
                        disableTypography
                        className={classes.dialogTitle}
                    >
                        {this.state.whichDialog === "image" && (
                            <h2>CONFIRM IMAGE DELETION</h2>
                        )}
                        {this.state.whichDialog === "cancel" && (
                            <h2>CONFIRM PAGE NAVIGATION</h2>
                        )}
                        <IconButton onClick={this.closeDialog}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {this.state.whichDialog === "image" && (
                                <p>
                                    PLEASE CONFIRM IF YOU WANT TO REMOVE
                                    DIRECTORY LIST IMAGE.
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
            </ContainerDiv>
        );
    }
}

ModifyDirectoryList.defaultProps = {};

ModifyDirectoryList.propTypes = {};

export default withApollo(withRouter(withStyles(styles)(ModifyDirectoryList)));
