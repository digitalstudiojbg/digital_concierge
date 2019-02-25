import React from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    DialogContentText,
    IconButton,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CopyIcon from "@material-ui/icons/FileCopy";
import Loading from "../../../loading/Loading";
import { Mutation, withApollo } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import { DECIMAL_RADIX } from "../../../../utils/Constants";
import { DUPLICATE_ROLES } from "../../../../data/mutation";
import { getRoleList } from "../../../../data/query";

const styles = theme => ({
    dialogTitle: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    submitButton: {
        margin: theme.spacing.unit,
        color: "blue",
        border: "1px solid blue",
        width: "100%"
    },
    cancelButton: {
        margin: theme.spacing.unit,
        color: "blue",
        border: "1px solid blue",
        width: "100%"
    },
    dialogActionRoot: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between"
    },
    childDialogAction: {
        flexBasis: "50%"
    }
});

export const PageThreeDuplicateModal = ({
    handleClose,
    classes,
    role,
    roles,
    clientId
}) => {
    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={true}
            onClose={handleClose}
            aria-labelledby="dialog-title"
            fullWidth={true}
        >
            <DialogTitle disableTypography className={classes.dialogTitle}>
                <h2>
                    {Boolean(role)
                        ? `DUPLICATE ${role.name} ROLE`
                        : "DUPLICATE ROLES"}
                </h2>
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Mutation
                mutation={DUPLICATE_ROLES}
                refetchQueries={[
                    {
                        query: getRoleList,
                        variables: { clientId }
                    }
                ]}
            >
                {(duplicateRoles, { error, loading }) => {
                    if (loading) return <Loading loadingData />;
                    if (error) return `Error message: ${error.message}`;

                    const handleDuplicate = () => {
                        let toSend = null;

                        if (Boolean(role)) {
                            //Only duplicate one role
                            toSend = {
                                roleIds: [parseInt(role.id, DECIMAL_RADIX)]
                            };
                        } else if (Boolean(roles)) {
                            //Duplicate multiple roles
                            toSend = {
                                roleIds: roles.map(({ id }) =>
                                    parseInt(id, DECIMAL_RADIX)
                                )
                            };
                        }

                        console.log("Before sending: ", toSend);

                        duplicateRoles({
                            variables: {
                                input: toSend
                            }
                        }).then(data => {
                            console.log("Data received: ", data);
                            handleClose();
                        });
                    };

                    return (
                        <React.Fragment>
                            <DialogContent>
                                {Boolean(role) && (
                                    <DialogContentText>
                                        Are you sure you want to duplicate role{" "}
                                        {role.name}?
                                    </DialogContentText>
                                )}
                                {Boolean(roles) && (
                                    <React.Fragment>
                                        <DialogContentText>
                                            Are you sure you want to duplicate
                                            these roles?
                                        </DialogContentText>
                                        <List>
                                            {roles.map(
                                                ({ id, name }, index) => (
                                                    <ListItem
                                                        key={`${id}-${index}`}
                                                    >
                                                        <ListItemIcon>
                                                            <CopyIcon />
                                                        </ListItemIcon>
                                                        <ListItemText>
                                                            {name}
                                                        </ListItemText>
                                                    </ListItem>
                                                )
                                            )}
                                        </List>
                                    </React.Fragment>
                                )}
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    variant="outlined"
                                    className={classes.submitButton}
                                    onClick={handleDuplicate}
                                >
                                    YES
                                </Button>
                                <Button
                                    variant="outlined"
                                    className={classes.cancelButton}
                                    onClick={handleClose}
                                >
                                    NO
                                </Button>
                            </DialogActions>
                        </React.Fragment>
                    );
                }}
            </Mutation>
        </Dialog>
    );
};

export default withApollo(withStyles(styles)(PageThreeDuplicateModal));
