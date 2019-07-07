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
const FieldLabel = styled.div`
    font-size: 10px;
    margin-bottom: 2px;
    color: #5c5c5c;
    text-transform: uppercase;
`;
const styles = theme => ({
    hideFileInput: {
        display: "none"
    },
    uploadButton: {
        //  margin: theme.spacing.unit,
        border: "3px solid #2699FB",
        backgroundColor: "white",

        padding: "8px 25px",
        fontSize: "14px",
        color: "#2699FB",
        borderRadius: "5px"
    },
    viewButton: {
        //  backgroundColor: "rgb(245,244,245)",
        backgroundColor: "white",
        border: "1px solid rgb(182,181,182)",
        borderRadius: 5,
        height: 41,
        display: "flex",
        alignItem: "center"
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
                {/* <FormLabelDiv labelFontSize={labelFontSize}>
                    {label}
                </FormLabelDiv> */}
                <FieldLabel>{label}</FieldLabel>
                <div style={{ width: "114%", display: "flex" }}>
                    <div style={{ width: "90%", paddingRight: 10 }}>
                        <TextField
                            value={filename}
                            disabled={true}
                            fullWidth={true}
                            variant="outlined"
                            inputProps={{
                                style: {
                                    padding: "12px 10px",
                                    backgroundColor: "white"
                                }
                            }}
                        />
                    </div>
                    <div style={{ width: "10%" }}>
                        <IconButton
                            className={classes.viewButton}
                            onClick={previewInNewTab}
                            disabled={!Boolean(toShow)}
                            style={{
                                backgroundColor: "white",
                                display: "flex",
                                alignItem: "center"
                            }}
                        >
                            <ViewIcon style={{ marginTop: "-10%" }} />
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
                            width: "100%",
                            display: "flex"
                        }}
                    >
                        <label
                            htmlFor="upload-image"
                            style={{
                                width: "100%",
                                display: "flex",
                                marginTop: "15px",
                                justifyContent: "flex-end"
                            }}
                        >
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
