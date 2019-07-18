import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import CloseIcon from "@material-ui/icons/Close";
import { Set } from "immutable";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import {
    EachRolePermissionContainerDiv,
    EachRoleContainerDiv,
    AllPermissionContainerDiv,
    AllPermissionFooterContainerDiv,
    PermissionFooterEntryDiv,
    FieldLabel
} from "../user/commonStyle";

const ContainerDiv = styled.div`
    width: 100%;
    height: 60vh;
    display: flex;
`;

const styles = theme => ({
    dialogTitle: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    submitButton: {
        margin: theme.spacing.unit,
        border: "3px solid #2699FB",
        color: "#2699FB",
        width: "30%",
        marginLeft: "20%"
    },
    cancelButton: {
        width: "30%",
        marginRight: "20%",
        margin: theme.spacing.unit,
        border: "3px solid #2699FB",
        color: "#2699FB"
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

const RolePermissionsDialog = ({
    handleClose,
    setFieldValue,
    permissionsCategories,
    classes,
    role
}) => {
    const permissionsList = [].concat.apply(
        [],
        permissionsCategories.map(({ permissions }) => {
            let output = [];
            permissions.forEach(({ id }) => {
                output = [...output, id];
            });
            return output;
        })
    );

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={true}
            onClose={handleClose}
            aria-labelledby="dialog-title"
            fullWidth={true}
            maxWidth="lg"
        >
            <DialogTitle disableTypography className={classes.dialogTitle}>
                <h2>
                    {Boolean(role)
                        ? `EDIT ${role.name} PERMISSIONS`
                        : "CREATE ROLE PERMISSIONS"}
                </h2>
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogActions classes={{ root: classes.leftDialogAction }}>
                <Button variant="outlined" className={classes.submitButton}>
                    {Boolean(role) ? "EDIT" : "ADD"}
                </Button>
                <Button
                    variant="outlined"
                    className={classes.cancelButton}
                    onClick={handleClose}
                    disabled={isSubmitting}
                >
                    CANCEL
                </Button>
            </DialogActions>
            <DialogContent style={{ paddingTop: "3%" }}>
                <ContainerDiv>
                    <div
                        style={{
                            flexBasis: "50%",
                            borderLeft: "2px solid #DDDDDD",
                            width: "100%",
                            height: "100%"
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                display: "flex"
                            }}
                        >
                            <div style={{ width: "43%" }} />
                            <div style={{ width: "57%" }}>
                                <div
                                    style={{
                                        width: "100%",
                                        padding: 5
                                    }}
                                >
                                    <FormControl
                                        required
                                        error={Boolean(errors.permissionIds)}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    style={{
                                                        color: "#2699FB",
                                                        padding: "0",
                                                        Label: {
                                                            fontSize: "10px"
                                                        }
                                                    }}
                                                    checked={
                                                        permissionIds.length ===
                                                        permissionsList.length
                                                    }
                                                    indeterminate={
                                                        permissionIds.length <
                                                            permissionsList.length &&
                                                        permissionIds.length !==
                                                            0
                                                    }
                                                    onChange={() => {
                                                        //https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays-in-javascript
                                                        if (
                                                            permissionIds.length ===
                                                            permissionsList.length
                                                        ) {
                                                            setFieldValue(
                                                                "permissionIds",
                                                                [] // Set()
                                                            );
                                                        } else {
                                                            setFieldValue(
                                                                "permissionIds",
                                                                Set(
                                                                    permissionIds
                                                                )
                                                                    .union(
                                                                        permissionsList
                                                                    )
                                                                    .toJS()
                                                            );
                                                        }
                                                    }}
                                                />
                                            }
                                            label="All Permissions"
                                        />
                                        {Boolean(errors.permissionIds) && (
                                            <FormHelperText>
                                                {errors.permissionIds}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                        {permissionsCategories.map(
                            (
                                {
                                    id: categoryId,
                                    name: categoryName,
                                    permissions
                                },
                                categoryIndex
                            ) => (
                                <EachRolePermissionContainerDiv
                                    key={`MODAL-CATEGORY-${categoryId}-${categoryIndex}`}
                                    style={{ widht: "50%" }}
                                >
                                    <EachRoleContainerDiv
                                        style={{ widht: "50%" }}
                                    >
                                        {categoryName}
                                    </EachRoleContainerDiv>
                                    <AllPermissionContainerDiv
                                        style={{
                                            widht: "50%",
                                            fontSize: "12px"
                                        }}
                                    >
                                        {permissions.map(
                                            (
                                                {
                                                    id: permissionId,
                                                    name: permissionName
                                                },
                                                permissionIndex
                                            ) => (
                                                <FormControlLabel
                                                    style={{
                                                        padding: "0",
                                                        margin: "0"
                                                    }}
                                                    key={`MODAL-PERMISSION-${permissionId}-${permissionIndex}`}
                                                    control={
                                                        <Checkbox
                                                            style={{
                                                                color:
                                                                    "#2699FB",
                                                                padding: "0"
                                                                // Label: {
                                                                //     fontSize:
                                                                //         "10px"
                                                                // }
                                                            }}
                                                            id={permissionId}
                                                            checked={permissionIds.includes(
                                                                permissionId
                                                            )}
                                                            onChange={event => {
                                                                if (
                                                                    permissionIds.includes(
                                                                        event
                                                                            .target
                                                                            .id
                                                                    )
                                                                ) {
                                                                    //Remove from selected checkboxes
                                                                    setFieldValue(
                                                                        "permissionIds",
                                                                        Set(
                                                                            permissionIds
                                                                        )
                                                                            .delete(
                                                                                event
                                                                                    .target
                                                                                    .id
                                                                            )
                                                                            .toJS()
                                                                    );
                                                                } else {
                                                                    //Add to selected checkboxes
                                                                    setFieldValue(
                                                                        "permissionIds",
                                                                        // permissionIds.add(
                                                                        //     event
                                                                        //         .target
                                                                        //         .id
                                                                        // )
                                                                        [
                                                                            ...permissionIds,
                                                                            event
                                                                                .target
                                                                                .id
                                                                        ]
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                    }
                                                    label={permissionName}
                                                />
                                            )
                                        )}
                                        <AllPermissionFooterContainerDiv>
                                            <PermissionFooterEntryDiv
                                                onClick={() =>
                                                    setFieldValue(
                                                        "permissionIds",
                                                        Set(permissionIds)
                                                            .union(
                                                                permissions.map(
                                                                    ({ id }) =>
                                                                        id
                                                                )
                                                            )
                                                            .toJS()
                                                    )
                                                }
                                            >
                                                SELECT ALL
                                            </PermissionFooterEntryDiv>
                                            <PermissionFooterEntryDiv
                                                onClick={() =>
                                                    setFieldValue(
                                                        "permissionIds",
                                                        Set(permissionIds)
                                                            .subtract(
                                                                permissions.map(
                                                                    ({ id }) =>
                                                                        id
                                                                )
                                                            )
                                                            .toJS()
                                                    )
                                                }
                                            >
                                                UNSELECT ALL
                                            </PermissionFooterEntryDiv>
                                        </AllPermissionFooterContainerDiv>
                                    </AllPermissionContainerDiv>
                                </EachRolePermissionContainerDiv>
                            )
                        )}
                    </div>
                </ContainerDiv>
            </DialogContent>
        </Dialog>
    );
};

export default withStyles(styles)(RolePermissionsDialog);
