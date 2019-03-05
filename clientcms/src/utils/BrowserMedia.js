import React, { useState } from "react";
import { withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import MediaLibrary from "./MediaLibrary";
import { log } from "util";
import { getSystemDetailSidebar as query } from "../data/query";

const Transition = props => {
    return <Slide direction="up" {...props} />;
};

const BrowserMedia = props => {
    const {
        client,
        match: { params: { system_id = null } = null } = null
    } = props;
    const { system: { client: { id } = null } = null } = client.readQuery({
        query,
        variables: { id: system_id }
    });

    const [browserMediaOpen, setBrowserMediaOpen] = useState(false);

    /**
     * state: selectedImages has list of selected images in array for other components to use
     */
    const [selectedImages, setSelectedImages] = useState([]);

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
                onClose={() => {
                    setBrowserMediaOpen(false);
                }}
                fullWidth
                maxWidth="xl"
            >
                <DialogTitle>
                    <h3>Browser Media</h3>
                </DialogTitle>
                <DialogContent>
                    {id && (
                        <MediaLibrary
                            clientId={id}
                            setSelectedImages={setSelectedImages}
                            isBrowserMedia
                            height={"100%"}
                            multipleSelect={false}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default withApollo(withRouter(BrowserMedia));
