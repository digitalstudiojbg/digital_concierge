import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TextField, Button, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ViewIcon from "@material-ui/icons/Visibility";

const FieldContainerDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
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

class SimpleFileUploader extends React.Component {
    state = {
        file: null,
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

    render() {
        const {
            classes,
            previewUrl,
            previewName,
            labelFontSize,
            label
        } = this.props;

        //Always prioritise internal state over props
        const toShow = this.state.previewFile
            ? this.state.previewFile
            : Boolean(previewUrl)
            ? previewUrl
            : null;
        const { name = "" } = this.state.file || {};

        //Always prioritise internal state over props
        const filename = Boolean(name) ? name : previewName;

        const FormLabelDiv = styled.div`
            color: rgb(92, 92, 92);
            font-size: ${props => props.labelFontSize};
        `;

        const previewInNewTab = () => {
            if (Boolean(toShow)) {
                return window.open(toShow, "_blank");
            }
        };

        return (
            <FieldContainerDiv>
                <FormLabelDiv labelFontSize={labelFontSize}>
                    {label}
                </FormLabelDiv>
                <div style={{ width: "100%", display: "flex" }}>
                    <div style={{ width: "90%", paddingRight: 10 }}>
                        <TextField
                            value={filename}
                            disabled={true}
                            fullWidth={true}
                            variant="outlined"
                        />
                    </div>
                    <div style={{ width: "10%" }}>
                        <IconButton
                            className={classes.viewButton}
                            onClick={previewInNewTab}
                            disabled={!Boolean(toShow)}
                        >
                            <ViewIcon />
                        </IconButton>
                    </div>
                </div>
                <FieldDiv>
                    <input
                        accept="image/*,.pdf"
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
            </FieldContainerDiv>
        );
    }
}

SimpleFileUploader.defaultProps = {
    labelFontSize: "0.8em",
    label: "FILE NAME"
};

SimpleFileUploader.propTypes = {
    onRef: PropTypes.func.isRequired,
    previewUrl: PropTypes.string,
    previewName: PropTypes.string,
    labelFontSize: PropTypes.string,
    label: PropTypes.string
};

export default withStyles(styles)(SimpleFileUploader);
