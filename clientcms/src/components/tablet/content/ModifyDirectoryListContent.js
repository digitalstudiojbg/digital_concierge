import React from "react";
import {
    ContainerDiv,
    CreateContentContainerDiv,
    SYSTEM_CMS_CONTENT_URL
} from "../../../utils/Constants";
import Button from "@material-ui/core/Button";
import MuiTextField from "@material-ui/core/TextField";
// import { TextField } from "formik-material-ui";
import { withStyles } from "@material-ui/core/styles";
// import { Field } from "formik";
// import * as Yup from "yup";
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
import TextEditorField from "../../../utils/TextEditorField";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import {
    SectionHeader,
    SubSectionHeader,
    SubSectionTop,
    MainSubSections,
    SubSectionDiv,
    FieldLabel,
    FieldDiv
} from "../../home/WelcomeStyleSet";

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
    descriptionTextField: {
        margin: 0
    },
    imageNameTextField: {
        backgroundColor: "white"
        // padding: "10px"
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
        backgroundColor: "white",
        color: "#313131",
        fontSize: "10px"
    },
    uploadFileButton: {
        backgroundColor: "white",
        color: "#313131",
        marginBottom: 10,
        fontSize: "10px"
    },
    input: {
        color: "white",
        padding: "10px"
    }
});

function SlideUpTransition(props) {
    return <Slide direction="up" {...props} />;
}

class ModifyDirectoryListContent extends React.PureComponent {
    constructor(props) {
        super(props);
        // const has_data =
        //     props.location && props.location.state && props.location.state.data;
        // const has_media_data =
        //     has_data &&
        //     props.location.state.data.media &&
        //     props.location.state.data.media.length > 0;
        const has_media_data =
            Array.isArray(props.values.images) &&
            props.values.images.length > 0;
        // const images = has_media_data
        //     ? props.location.state.data.media.map(image => ({
        //           ...image,
        //           uploaded: true,
        //           changed: false
        //       }))
        //     : [];
        this.state = {
            imageName: has_media_data ? props.values.images[0].name : "",
            openDialog: false,
            whichDialog: ""
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

    // componentWillUnmount() {
    //     this.props.values.images.forEach(image => {
    //         if (!Boolean(image.uploaded) && Boolean(image.preview)) {
    //             // Make sure to revoke the preview data uris to avoid memory leaks
    //             URL.revokeObjectURL(image.preview);
    //         }
    //     });
    // }

    onDrop(images) {
        this.setState({ imageName: images[0].name }, () => {
            this.props.setFieldValue(
                "images",
                images.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                        uploaded: false,
                        changed: true
                    })
                ),
                false
            );
        });

        // this.setState(
        //     {
        //         images: images.map(file =>
        //             Object.assign(file, {
        //                 preview: URL.createObjectURL(file),
        //                 uploaded: false,
        //                 changed: true
        //             })
        //         ),
        //         imageName: images[0].name
        //     },
        //     () => {
        //         this.props.setFieldValue(
        //             "images",
        //             [...this.state.images],
        //             false
        //         );
        //     }
        // );
    }

    mediaSelectImage(images) {
        // this.setState(
        //     {
        //         images: images.map(image => ({
        //             ...image,
        //             uploaded: true,
        //             changed: true
        //         })),
        //         imageName: images[0].name
        //     },
        //     () => {
        //         this.props.setFieldValue(
        //             "images",
        //             [...this.state.images],
        //             false
        //         );
        //     }
        // );
        this.setState({ imageName: images[0].name }, () => {
            this.props.setFieldValue(
                "images",
                images.map(image => ({
                    ...image,
                    uploaded: true,
                    changed: true
                })),
                false
            );
        });
    }

    removeImage() {
        this.setState(
            {
                imageName: "",
                openDialog: false,
                whichDialog: ""
            },
            () => {
                this.props.setFieldValue("images", [], false);
            }
        );
    }

    renderImageUploader() {
        const { classes, values } = this.props;
        const { imageName } = this.state;
        const { images } = values;
        const image =
            Array.isArray(images) && images.length > 0 ? images[0] : null;
        return (
            <React.Fragment>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <FieldDiv
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "0"
                        }}
                    >
                        <FieldLabel>FILENAME</FieldLabel>
                        <MuiTextField
                            //  label="FILENAME"

                            disabled={true}
                            value={this.state.imageName}
                            className={classes.imageNameTextField}
                            fullWidth={true}
                            variant="outlined"
                            input={
                                <OutlinedInput
                                    style={{
                                        height: 38
                                    }}
                                />
                            }
                        />
                    </FieldDiv>
                    <div
                        style={{
                            width: "60%",
                            //   height: "80%",
                            display: "flex",
                            paddingLeft: 10,
                            alignItems: "center"
                        }}
                    >
                        <Button
                            variant="outlined"
                            className={classes.removeImageButton}
                            fullWidth={true}
                            disabled={
                                !Boolean(imageName) &&
                                Boolean(imageName.length === 0)
                            }
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
                        height: "45%",
                        marginTop: "35px"
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
                            width: "38%",
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
                            fullWidth={true}
                            onClick={this.openFileBrowser}
                        >
                            UPLOAD FILE
                        </Button>
                        <BrowserMedia
                            variant="outlined"
                            color="default"
                            buttonStyle={{
                                backgroundColor: "white",
                                fontSize: "10px"
                            }}
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
        const { setFieldValue, values } = this.props;
        // const is_create = !Boolean(values.id);
        // const initialColours = !is_create ? location.state.data.colours : [];
        const { colours, initial_colours } = values;
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
                <ColourSchemePicker
                    initialColours={initial_colours}
                    currentColours={colours}
                    handleOnChange={handleOnChange}
                    withWrap={true}
                />
            </div>
        );
    }

    render() {
        const { classes, setFieldValue, values } = this.props;
        const subTitleText = "TITLE";

        return (
            <ContainerDiv>
                <CreateContentContainerDiv>
                    <MainSubSections
                        style={{
                            width: "100%",
                            height: "60%",
                            display: "flex"
                        }}
                    >
                        <SubSectionDiv
                            style={{
                                flexBasis: "30%",
                                margin: "1% 3% 1% 0"
                            }}
                        >
                            <div style={{ width: "95%" }}>
                                <SubSectionHeader style={{ color: "black" }}>
                                    {subTitleText}
                                </SubSectionHeader>
                                {/* <Field
                                    name="title"
                                    validateOnBlur
                                    validateOnChange
                                    variant="outlined"
                                    component={TextField}
                                    fullWidth
                                    FormHelperTextProps={{
                                        classes: {
                                            root: classes.categoryNameFormHelper
                                        }
                                    }}
                                /> */}
                                <TextEditorField
                                    name="title"
                                    setFieldValue={setFieldValue}
                                    initialValue={values.title}
                                    withPlaintext={true}
                                    InputProps={{
                                        className: classes.input
                                    }}
                                />
                            </div>
                            <div style={{ width: "95%", marginTop: "10%" }}>
                                <SubSectionHeader style={{ color: "black" }}>
                                    TEXT FIELD
                                </SubSectionHeader>
                                {/* <Field
                                    name="description"
                                    multiline
                                    fullWidth
                                    rows="3"
                                    margin="normal"
                                    validateOnBlur
                                    validateOnChange
                                    variant="outlined"
                                    component={TextField}
                                    className={classes.descriptionTextField}
                                    FormHelperTextProps={{
                                        classes: {
                                            root: classes.categoryNameFormHelper
                                        }
                                    }}
                                /> */}
                                <TextEditorField
                                    name="description"
                                    setFieldValue={setFieldValue}
                                    initialValue={values.description}
                                    withPlaintext={false}
                                />
                            </div>
                        </SubSectionDiv>
                        <SubSectionDiv
                            style={{
                                flexBasis: "30%",
                                margin: "1% 3% 1% 0",
                                borderRight: "1px solid #DDDDDD"
                            }}
                        >
                            <div style={{ width: "95%", height: "100%" }}>
                                <SubSectionHeader style={{ color: "black" }}>
                                    HEADER IMAGE
                                </SubSectionHeader>

                                {this.renderImageUploader()}
                            </div>
                        </SubSectionDiv>

                        <SubSectionDiv style={{ flexBasis: "30%" }}>
                            {this.renderColourSchemePicker()}
                        </SubSectionDiv>
                    </MainSubSections>
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

ModifyDirectoryListContent.defaultProps = {};

ModifyDirectoryListContent.propTypes = {};

export default withApollo(
    withRouter(withStyles(styles)(ModifyDirectoryListContent))
);
