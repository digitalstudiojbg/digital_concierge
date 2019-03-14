import React, { useState } from "react";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import MediaLibrary from "./MediaLibrary";
import PropTypes from "prop-types";
import { getSystemDetailSidebar as query } from "../data/query";

const Transition = props => {
    return <Slide direction="up" {...props} />;
};

const styles = () => ({
    dialogTitle: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }
});

const BrowserMedia = ({
    buttonLabel,
    color,
    variant,
    buttonStyle,
    fullWidth,
    multipleSelect,
    classes,
    updateImageSelection,
    match
}) => {
    const { params: { system_id = null } = null } = match;
    // const { system: { client: { id } = null } = null } = props.client.readQuery(
    //     {
    //         query,
    //         variables: { id: system_id }
    //     }
    // );

    const [browserMediaOpen, setBrowserMediaOpen] = useState(false);

    /**
     * [state] selectedImages has list of selected images in array for other components to use
     */
    // const [selectedImages, setSelectedImages] = useState([]);

    const handleClose = () => {
        setBrowserMediaOpen(false);
    };

    const updateImages = images => {
        updateImageSelection(images);
        handleClose();
    };

    return (
        <div>
            <Button
                variant={variant}
                color={color}
                style={buttonStyle}
                onClick={() => {
                    setBrowserMediaOpen(true);
                }}
                fullWidth={fullWidth}
            >
                {buttonLabel}
            </Button>

            <Dialog
                open={browserMediaOpen}
                TransitionComponent={Transition}
                onClose={handleClose}
                fullWidth
                maxWidth="xl"
            >
                <DialogTitle disableTypography className={classes.dialogTitle}>
                    <h3>BROWSER MEDIA</h3>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Query query={query} variables={{ id: system_id }}>
                        {({
                            data: {
                                system: {
                                    client: { id }
                                }
                            }
                        }) => (
                            <React.Fragment>
                                {id && (
                                    <MediaLibrary
                                        clientId={id}
                                        setSelectedImages={updateImages}
                                        isBrowserMedia
                                        height={"100%"}
                                        multipleSelect={multipleSelect}
                                    />
                                )}
                            </React.Fragment>
                        )}
                    </Query>
                </DialogContent>
            </Dialog>
        </div>
    );
};

BrowserMedia.defaultProps = {
    buttonLabel: "BROWSE MEDIA",
    color: "primary",
    variant: "contained",
    buttonStyle: {},
    fullWidth: false,
    multipleSelect: false
};

BrowserMedia.propTypes = {
    buttonLabel: PropTypes.string,
    color: PropTypes.string,
    variant: PropTypes.string,
    buttonStyle: PropTypes.object,
    fullWidth: PropTypes.bool,
    multipleSelect: PropTypes.bool,
    updateImageSelection: PropTypes.func.isRequired
};

export default withRouter(withStyles(styles)(BrowserMedia));
