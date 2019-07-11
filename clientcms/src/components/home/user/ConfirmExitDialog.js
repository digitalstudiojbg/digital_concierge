import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from "@material-ui/core";
import { SlideUpTransition } from "../../../utils/Constants";

const ConfirmExitDialog = ({ open, acceptAction, cancelAction }) => (
    <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        fullWidth
        open={open}
        TransitionComponent={SlideUpTransition}
    >
        <DialogTitle>ARE YOU SURE YOU WANT TO NAVIGATE AWAY?</DialogTitle>
        <DialogContent>UNSAVED CHANGE(S) WILL BE LOST.</DialogContent>
        <DialogActions>
            <Button onClick={acceptAction} variant="outlined" color="primary">
                YES
            </Button>
            <Button onClick={cancelAction} variant="outlined" color="secondary">
                NO
            </Button>
        </DialogActions>
    </Dialog>
);

export default ConfirmExitDialog;
