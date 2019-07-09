import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControlLabel,
    Checkbox
} from "@material-ui/core";
import { SlideUpTransition } from "../../../utils/Constants";
import DialogTitleHelper from "../../../utils/DialogTitleHelper";
import {
    FieldLabel,
    EachRolePermissionContainerDiv,
    EachRoleContainerDiv,
    AllPermissionContainerDiv,
    AllPermissionFooterContainerDiv,
    PermissionFooterEntryDiv
} from "./commonStyle";
import { Query } from "react-apollo";
import { getPermissionCategoryList } from "../../../data/query";
import Loading from "../../loading/Loading";
import { Set } from "immutable";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
    checkboxLabel: {
        fontSize: "10px"
    }
});

const CreateRoleDialog = ({
    open,
    submitAction,
    cancelAction,
    which,
    otherSubmitData,
    classes
}) => {
    const [name, setName] = useState("");
    const [selected_permissions, setSelectedPermissions] = useState(Set());

    const handleChange = event => setName(event.target.value);
    const onClickSubmitAction = () => {
        if (name.length > 0 && selected_permissions.size > 0) {
            submitAction({
                variables: {
                    input: {
                        name,
                        permissionIds: selected_permissions.toJS(),
                        ...otherSubmitData
                    }
                }
            }).then(() => cancelAction());
        }
    };

    const handleChangePermissionCheckbox = event => {
        if (selected_permissions.includes(event.target.id)) {
            //Remove from selected checkboxes
            setSelectedPermissions(
                selected_permissions.delete(event.target.id)
            );
        } else {
            //Add to selected checkboxes
            setSelectedPermissions(selected_permissions.add(event.target.id));
        }
    };

    const renderPermissions = permissionCategories => {
        let allPermissionsLength = 0;
        permissionCategories.forEach(category => {
            allPermissionsLength += category.permissions.length;
        });
        return (
            <div style={{ width: "100%", marginTop: 10 }}>
                <EachRolePermissionContainerDiv>
                    <EachRoleContainerDiv />
                    <div
                        style={{
                            width: "60%",
                            paddingLeft: 13,
                            paddingTop: "2%"
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
                                        selected_permissions.size ===
                                        allPermissionsLength
                                    }
                                    onChange={() => {
                                        //https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays-in-javascript
                                        if (
                                            selected_permissions.size ===
                                            allPermissionsLength
                                        ) {
                                            setSelectedPermissions(Set());
                                        } else {
                                            const permissions = [].concat.apply(
                                                [],
                                                permissionCategories.map(
                                                    ({ permissions }) => {
                                                        let output = [];
                                                        permissions.forEach(
                                                            ({ id }) => {
                                                                output = [
                                                                    ...output,
                                                                    id
                                                                ];
                                                            }
                                                        );
                                                        return output;
                                                    }
                                                )
                                            );
                                            setSelectedPermissions(
                                                selected_permissions.union(
                                                    permissions
                                                )
                                            );
                                        }
                                    }}
                                />
                            }
                            label="All Permissions"
                        />
                    </div>
                </EachRolePermissionContainerDiv>
                {permissionCategories.map(
                    (
                        { id: categoryId, name: categoryName, permissions },
                        categoryIndex
                    ) => (
                        <EachRolePermissionContainerDiv
                            key={`CATEGORY-${categoryId}-${categoryIndex}`}
                        >
                            <EachRoleContainerDiv style={{ fontSize: "10px" }}>
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
                                                    checked={selected_permissions.includes(
                                                        permissionId
                                                    )}
                                                    onChange={
                                                        handleChangePermissionCheckbox
                                                    }
                                                />
                                            }
                                            label={permissionName}
                                        />
                                    )
                                )}
                                <AllPermissionFooterContainerDiv>
                                    <PermissionFooterEntryDiv
                                        style={{ border: "0" }}
                                        onClick={() => {
                                            setSelectedPermissions(
                                                selected_permissions.union(
                                                    permissions.map(
                                                        ({ id }) => id
                                                    )
                                                )
                                            );
                                        }}
                                    >
                                        <label
                                            style={{
                                                color: "#2699FB",
                                                fontSize: "10px"
                                            }}
                                        >
                                            {" "}
                                            SELECT ALL{" "}
                                        </label>
                                    </PermissionFooterEntryDiv>
                                    <PermissionFooterEntryDiv
                                        style={{ border: "0" }}
                                        onClick={() => {
                                            setSelectedPermissions(
                                                selected_permissions.subtract(
                                                    permissions.map(
                                                        ({ id }) => id
                                                    )
                                                )
                                            );
                                        }}
                                    >
                                        <label
                                            style={{
                                                color: "#2699FB",
                                                fontSize: "10px"
                                            }}
                                        >
                                            {" "}
                                            UNSELECT ALL
                                        </label>
                                    </PermissionFooterEntryDiv>
                                </AllPermissionFooterContainerDiv>
                            </AllPermissionContainerDiv>
                        </EachRolePermissionContainerDiv>
                    )
                )}
            </div>
        );
    };

    return (
        <Query query={getPermissionCategoryList}>
            {({ loading, error, data: { permissionCategories } }) => (
                <Dialog
                    open={open}
                    TransitionComponent={SlideUpTransition}
                    keepMounted
                    onClose={cancelAction}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitleHelper onClose={cancelAction}>
                        CREATE {which.toUpperCase()}
                    </DialogTitleHelper>
                    {loading && <Loading loadingData />}
                    {error && error.message ? (
                        <React.Fragment>Error! {error.message}</React.Fragment>
                    ) : (
                        <React.Fragment>
                            {!loading && (
                                <React.Fragment>
                                    <DialogContent>
                                        <FieldLabel>
                                            {which.toUpperCase()} NAME
                                        </FieldLabel>
                                        <TextField
                                            value={name}
                                            required={true}
                                            type="text"
                                            variant="outlined"
                                            fullWidth={true}
                                            inputProps={{
                                                style: {
                                                    padding: "12px 10px",
                                                    backgroundColor: "white"
                                                }
                                            }}
                                            onChange={handleChange}
                                        />
                                        {renderPermissions(
                                            permissionCategories
                                        )}
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            variant="outlined"
                                            onClick={onClickSubmitAction}
                                            color="primary"
                                        >
                                            CREATE
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            onClick={cancelAction}
                                            color="secondary"
                                        >
                                            CANCEL
                                        </Button>
                                    </DialogActions>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    )}
                </Dialog>
            )}
        </Query>
    );
};

export default withStyles(styles)(CreateRoleDialog);
