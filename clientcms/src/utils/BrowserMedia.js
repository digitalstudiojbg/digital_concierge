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
// import { log } from "util";
import { getSystemDetailSidebar as query } from "../data/query";

const Transition = props => {
    return <Slide direction="up" {...props} />;
};

const styles = theme => ({
    dialogTitle: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }
});

const BrowserMedia = props => {
    const { match: { params: { system_id = null } = null } = null } = props;
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
    const [selectedImages, setSelectedImages] = useState([]);

    const handleClose = () => {
        setBrowserMediaOpen(false);
    };

    return (
        <div>
            <h1>Button</h1>

            <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => {
                    setBrowserMediaOpen(true);
                }}
            >
                Browser Media
            </Button>

            <Dialog
                open={browserMediaOpen}
                TransitionComponent={Transition}
                onClose={handleClose}
                fullWidth
                maxWidth="xl"
            >
                <DialogTitle
                    disableTypography
                    className={props.classes.dialogTitle}
                >
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
                                        setSelectedImages={setSelectedImages}
                                        isBrowserMedia
                                        height={"100%"}
                                        multipleSelect={false}
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

export default withRouter(withStyles(styles)(BrowserMedia));
