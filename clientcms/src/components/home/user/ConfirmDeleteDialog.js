import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@material-ui/core";
import { Cancel as CancelIcon } from "@material-ui/icons";
import { SlideUpTransition } from "../../../utils/Constants";

const ConfirmDeleteDialog = ({ open, acceptAction, cancelAction, users }) => (
    <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        fullWidth
        open={open}
        TransitionComponent={SlideUpTransition}
    >
        <DialogTitle>
            ARE YOU SURE YOU WANT TO DELETE{" "}
            {Array.isArray(users) && users.length > 1
                ? "THESE USERS"
                : "THIS USER"}{" "}
            ?
        </DialogTitle>
        <DialogContent>
            {Array.isArray(users) && (
                <List>
                    {users.map(({ id, name, email }, index) => (
                        <ListItem key={`USER-${index}-${id}`}>
                            <ListItemIcon>
                                <CancelIcon />
                            </ListItemIcon>
                            <ListItemText primary={`${name} - ${email}`} />
                        </ListItem>
                    ))}
                </List>
            )}
        </DialogContent>
        <DialogActions>
            {Array.isArray(users) && users.length > 0 && (
                <Button
                    onClick={acceptAction}
                    variant="outlined"
                    color="primary"
                >
                    YES
                </Button>
            )}
            <Button onClick={cancelAction} variant="outlined" color="secondary">
                NO
            </Button>
        </DialogActions>
    </Dialog>
);

export default ConfirmDeleteDialog;
