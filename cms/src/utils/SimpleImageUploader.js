import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
    TextField,
    Button,
    IconButton,
    Dialog,
    DialogContent
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ViewIcon from "@material-ui/icons/Visibility";
import DialogTitleHelper from "./DialogTitleHelper";
import { SlideUpTransition } from "./Constants";

const FieldContainerDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FieldDiv = styled.div`
    width: 100%;
`;

const styles = theme => ({
    hideFileInput: {
        display: "none"
    },
    uploadButton: {
        margin: theme.spacing.unit,
        color: "rgb(38, 153, 251)",
        border: "1px solid rgb(38, 153, 251)",
        width: "100%"
    },
    viewButton: {
        backgroundColor: "rgb(245,244,245)",
        border: "1px solid rgb(182,181,182)",
        borderRadius: 5
    }
});

class SimpleImageUploader extends React.Component {
    state = {
        file: null,
        openDialog: false,
        previewFile: null
    };
    fileInput = React.createRef();

    componentDidMount() {
        this.props.onRef && this.props.onRef(this);
    }

    componentWillUnmount() {
        //Prevent memory leak
        this.state.previewFile && URL.revokeObjectURL(this.state.previewFile);
        this.props.onRef && this.props.onRef(undefined);
    }

    updateImage = () => {
        const file = this.fileInput.current.files[0];
        const { previewFile } = this.state;
        if (previewFile) {
            //Prevent memory leak
            URL.revokeObjectURL(previewFile);
        }
        this.setState({ file, previewFile: URL.createObjectURL(file) });
    };

    openDialog = () => {
        this.setState({ openDialog: true });
    };

    closeDialog = () => {
        this.setState({ openDialog: false });
    };

    render() {
        const { classes, previewUrl, previewName } = this.props;
        const { openDialog } = this.state;

        //Always prioritise internal state over props
        const toShow = this.state.previewFile
            ? this.state.previewFile
            : Boolean(previewUrl)
            ? previewUrl
            : null;
        const { name = "" } = this.state.file || {};

        //Always prioritise internal state over props
        const filename = Boolean(name) ? name : previewName;

        return (
            <FieldContainerDiv>
                <div style={{ width: "100%", display: "flex" }}>
                    <div style={{ width: "90%", paddingRight: 10 }}>
                        <TextField
                            value={filename}
                            disabled={true}
                            fullWidth={true}
                            label="File Name"
                            variant="outlined"
                        />
                    </div>
                    <div style={{ width: "10%" }}>
                        <IconButton
                            className={classes.viewButton}
                            onClick={this.openDialog}
                            disabled={!Boolean(toShow)}
                        >
                            <ViewIcon />
                        </IconButton>
                    </div>
                </div>
                <FieldDiv>
                    <input
                        accept="image/*"
                        className={classes.hideFileInput}
                        ref={this.fileInput}
                        onChange={this.updateImage}
                        id="upload-image"
                        type="file"
                    />
                    <div
                        style={{
                            width: "90%",
                            display: "flex",
                            paddingRight: 20,
                            flexDirection: "row-reverse"
                        }}
                    >
                        <label htmlFor="upload-image">
                            <Button
                                variant="outlined"
                                component="span"
                                className={classes.uploadButton}
                            >
                                Browse
                            </Button>
                        </label>
                    </div>
                </FieldDiv>
                <Dialog
                    open={openDialog}
                    TransitionComponent={SlideUpTransition}
                    keepMounted
                    onClose={this.closeDialog}
                    maxWidth="lg"
                >
                    <DialogTitleHelper onClose={this.closeDialog}>
                        IMAGE PREVIEW
                    </DialogTitleHelper>
                    <DialogContent>
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                paddingTop: 17
                            }}
                        >
                            <img
                                style={{ width: "50%", height: "50%" }}
                                src={toShow}
                                alt="preview"
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            </FieldContainerDiv>
        );
    }
}

SimpleImageUploader.propTypes = {
    onRef: PropTypes.func.isRequired,
    previewUrl: PropTypes.string,
    previewName: PropTypes.string
};

export default withStyles(styles)(SimpleImageUploader);
