import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
    TextField,
    Button,
    OutlinedInput,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    IconButton
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import Dropzone from "react-dropzone";
import BrowserMedia from "./BrowserMedia";
import { SlideUpTransition } from "./Constants";

const FieldLabel = styled.div`
    color: #5c5c5c;
    font-size: 10px;
    margin-bottom: 5px;
`;

const FieldDiv = styled.div`
    width: 100%;
    padding: 10px;
`;

const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const styles = () => ({
    imageNameTextField: {
        paddingBottom: 20,
        width: "60%"
    },
    dialogTitle: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    removeImageButton: {
        backgroundColor: "white",
        color: "#313131",
        width: "160px",
        fontSize: "10px"
    },
    uploadFileButton: {
        backgroundColor: "white",
        color: "#313131",
        marginBottom: 10,
        fontSize: "10px"
    }
});

class ImageUploaderWithMediaLibrary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            imageName: "",
            openDialog: false
        };
        this.dropZoneRef = React.createRef();
        this.mediaSelectImage = this.mediaSelectImage.bind(this);
        this.openDialogImage = this.openDialogImage.bind(this);
        this.closeDialogImage = this.closeDialogImage.bind(this);
        this.openFileBrowser = this.openFileBrowser.bind(this);
        this.removeImage = this.removeImage.bind(this);
    }

    componentDidMount() {
        this.props.onRef && this.props.onRef(this);
    }

    componentWillUnmount() {
        //Prevent memory leak
        this.state.file &&
            this.state.file.preview &&
            URL.revokeObjectURL(this.state.file.preview);
        this.props.onRef && this.props.onRef(undefined);
    }

    mediaSelectImage(images) {
        const { usingRef, setFieldValue, fieldName } = this.props;
        const [image] = images;
        if (Array.isArray(images) && images.length > 0) {
            const newImage = Object.assign(image, {
                uploaded: true,
                changed: true
            });
            if (usingRef) {
                this.setState({
                    imageName: images[0].name,
                    file: newImage
                });
            } else {
                //Using setFieldValue to update media image selection
                setFieldValue(fieldName, newImage);
            }
        }
    }

    onDrop(images) {
        const { usingRef, setFieldValue, fieldName } = this.props;
        const [image] = images || [];
        if (Array.isArray(images) && images.length > 0) {
            const newImage = Boolean(image)
                ? Object.assign(image, {
                      preview: URL.createObjectURL(image),
                      uploaded: false,
                      changed: true
                  })
                : null;
            if (usingRef) {
                const { file } = this.state;
                if (file && file.preview) {
                    //Prevent memory leak
                    URL.revokeObjectURL(file.preview);
                }
                this.setState({
                    imageName:
                        Boolean(image) && Boolean(image.name) ? image.name : "",
                    file: newImage
                });
            } else {
                //Using setFieldValue to update file drop
                setFieldValue(fieldName, newImage);
            }
        }
    }

    openDialogImage() {
        this.setState({ openDialog: true });
    }

    closeDialogImage() {
        this.setState({ openDialog: false });
    }

    removeImage() {
        const { usingRef, setFieldValue, fieldName } = this.props;
        if (usingRef) {
            this.setState({
                imageName: "",
                openDialog: false,
                file: null
            });
        } else {
            this.setState({ openDialog: false }, () => {
                setFieldValue(fieldName, null);
            });
        }
    }

    openFileBrowser() {
        this.dropZoneRef.current.open();
    }

    imageNameWithRef = () => {
        //Always prioritise internal state over props
        const { previewName } = this.props;
        return Boolean(this.state.file) && Boolean(this.state.imageName)
            ? this.state.imageName //Using uploaded filename
            : Boolean(previewName) //Using preview file name
            ? previewName
            : "";
    };

    imageUrlWithRef = () => {
        const { previewUrl } = this.props;
        return Boolean(this.state.file) && Boolean(this.state.file.uploaded)
            ? `url(${this.state.file.path})`
            : Boolean(this.state.file) && !Boolean(this.state.file.uploaded)
            ? `url(${this.state.file.preview})`
            : Boolean(previewUrl)
            ? previewUrl
            : "none";
    };

    imageNameWithoutRef = () => {
        const { value } = this.props;
        return Boolean(value) && Boolean(value.name) ? value.name : "";
    };

    imageUrlWithoutRef = () => {
        const { value } = this.props;
        return Boolean(value) && Boolean(value.preview)
            ? `url(${value.preview})`
            : Boolean(value) && Boolean(value.path)
            ? `url(${value.path})`
            : "none";
    };

    render() {
        const { classes, usingRef } = this.props;

        const toShow = usingRef
            ? this.imageUrlWithRef()
            : this.imageUrlWithoutRef();

        const imageName = usingRef
            ? this.imageNameWithRef()
            : this.imageNameWithoutRef();

        // console.log("Image URL ", toShow);
        // console.log("Image name ", imageName);
        return (
            <React.Fragment>
                <ContainerDiv>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                padding: "0"
                            }}
                        >
                            <FieldLabel>FILENAME</FieldLabel>
                            <TextField
                                disabled={true}
                                value={imageName}
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
                        </div>
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
                            flex: 1,
                            width: "100%",
                            display: "flex",
                            height: "100%"
                        }}
                    >
                        <div style={{ width: "60%", height: "100%" }}>
                            <Dropzone
                                accept="image/*"
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
                                    backgroundImage: `${toShow}`,
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "contain"
                                }}
                                onDrop={this.onDrop.bind(this)}
                            >
                                {Boolean(toShow === "none") && (
                                    <div>DRAG & DROP HERE</div>
                                )}
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
                                clientId={this.props.clientId}
                            />
                        </div>
                    </div>
                </ContainerDiv>
                <Dialog
                    open={this.state.openDialog}
                    TransitionComponent={SlideUpTransition}
                    keepMounted
                    onClose={this.closeDialogImage}
                >
                    <DialogTitle
                        id="alert-dialog-slide-title"
                        disableTypography
                        className={classes.dialogTitle}
                    >
                        <h2>CONFIRM IMAGE DELETION</h2>
                        <IconButton onClick={this.closeDialogImage}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            PLEASE CONFIRM IF YOU WANT TO REMOVE IMAGE:{" "}
                            {imageName}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.removeImage} color="primary">
                            YES
                        </Button>
                        <Button onClick={this.closeDialog} color="primary">
                            NO
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

ImageUploaderWithMediaLibrary.propTypes = {
    clientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    usingRef: PropTypes.bool.isRequired,
    onRef: PropTypes.func,
    previewUrl: PropTypes.string,
    previewName: PropTypes.string,
    fieldName: PropTypes.string,
    setFieldValue: PropTypes.func,
    value: PropTypes.object
};
export default withStyles(styles)(ImageUploaderWithMediaLibrary);
