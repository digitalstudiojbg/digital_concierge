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
    EachRolePermissionContainerDiv as RoleContainerDiv,
    EachRoleContainerDiv,
    AllPermissionContainerDiv,
    AllPermissionFooterContainerDiv,
    PermissionFooterEntryDiv,
    FieldLabel
} from "../user/commonStyle";
import DialogTitleHelper from "../../../utils/DialogTitleHelper";

const ContainerDiv = styled.div`
    width: 100%;
    height: 60vh;
`;

const EachRolePermissionContainerDiv = styled(RoleContainerDiv)`
    flex-basis: 33%;
    flex-direction: column;
    align-items: center;
`;

const styles = theme => ({
    checkboxLabel: {
        fontSize: "10px"
    }
});

const RolePermissionsDialog = ({
    handleClose,
    setFieldValue,
    permissionsCategories,
    classes,
    roleName,
    permissionIds,
    errors
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

    const renderPermissions = () => {
        let allPermissionsLength = 0;
        permissionsCategories.forEach(category => {
            allPermissionsLength += category.permissions.length;
        });
        return (
            <React.Fragment>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 20
                    }}
                >
                    <FormControlLabel
                        control={
                            <Checkbox
                                style={{
                                    color: "#2699FB",
                                    padding: "0"
                                }}
                                checked={
                                    permissionIds.size === allPermissionsLength
                                }
                                indeterminate={
                                    permissionIds.size <
                                        permissionsList.length &&
                                    permissionIds.size !== 0
                                }
                                onChange={() => {
                                    //https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays-in-javascript
                                    if (
                                        permissionIds.size ===
                                        permissionsList.length
                                    ) {
                                        setFieldValue(
                                            "permissionIds",
                                            [] // Set()
                                        );
                                    } else {
                                        setFieldValue(
                                            "permissionIds",
                                            Set(permissionIds).union(
                                                permissionsList
                                            )
                                        );
                                    }
                                }}
                            />
                        }
                        label="All Permissions"
                    />
                </div>
                <div
                    style={{
                        width: "100%",
                        marginTop: 10,
                        display: "flex",
                        flexWrap: "wrap"
                    }}
                >
                    {permissionsCategories.map(
                        (
                            { id: categoryId, name: categoryName, permissions },
                            categoryIndex
                        ) => (
                            <EachRolePermissionContainerDiv
                                key={`CATEGORY-${categoryId}-${categoryIndex}`}
                            >
                                <EachRoleContainerDiv
                                    style={{ fontSize: "10px" }}
                                >
                                    {categoryName}
                                </EachRoleContainerDiv>
                                <AllPermissionContainerDiv>
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
                                                    margin: "0",
                                                    fontSize: "5px"
                                                }}
                                                classes={{
                                                    label: classes.checkboxLabel
                                                }}
                                                key={`PERMISSION-${permissionId}-${permissionIndex}`}
                                                control={
                                                    <Checkbox
                                                        style={{
                                                            padding: "3px 0",
                                                            color: "#2699FB",
                                                            Label: {
                                                                fontSize: "10px"
                                                            }
                                                        }}
                                                        id={permissionId}
                                                        checked={permissionIds.includes(
                                                            permissionId
                                                        )}
                                                        onChange={event => {
                                                            if (
                                                                permissionIds.includes(
                                                                    event.target
                                                                        .id
                                                                )
                                                            ) {
                                                                //Remove from selected checkboxes
                                                                setFieldValue(
                                                                    "permissionIds",
                                                                    Set(
                                                                        permissionIds
                                                                    ).delete(
                                                                        event
                                                                            .target
                                                                            .id
                                                                    )
                                                                );
                                                            } else {
                                                                //Add to selected checkboxes
                                                                setFieldValue(
                                                                    "permissionIds",
                                                                    permissionIds.add(
                                                                        event
                                                                            .target
                                                                            .id
                                                                    )
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
                                                    Set(permissionIds).union(
                                                        permissions.map(
                                                            ({ id }) => id
                                                        )
                                                    )
                                                )
                                            }
                                        >
                                            SELECT ALL
                                        </PermissionFooterEntryDiv>
                                        <PermissionFooterEntryDiv
                                            onClick={() =>
                                                setFieldValue(
                                                    "permissionIds",
                                                    Set(permissionIds).subtract(
                                                        permissions.map(
                                                            ({ id }) => id
                                                        )
                                                    )
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
            </React.Fragment>
        );
    };

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
            <DialogTitleHelper variant="h3" onClose={handleClose}>
                PERMISSIONS FOR {roleName}
            </DialogTitleHelper>
            <DialogContent>
                <ContainerDiv>{renderPermissions()}</ContainerDiv>
            </DialogContent>
        </Dialog>
    );
};

export default withStyles(styles)(RolePermissionsDialog);
