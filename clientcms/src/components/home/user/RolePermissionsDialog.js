import React from "react";
import {
    Dialog,
    DialogContent,
    FormControlLabel,
    Checkbox
} from "@material-ui/core";
import { SlideUpTransition } from "../../../utils/Constants";
import DialogTitleHelper from "../../../utils/DialogTitleHelper";
import {
    EachRolePermissionContainerDiv as ContainerDiv,
    EachRoleContainerDiv,
    AllPermissionContainerDiv
} from "./commonStyle";
import { Query } from "react-apollo";
import { getPermissionCategoryList } from "../../../data/query";
import Loading from "../../loading/Loading";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";

const EachRolePermissionContainerDiv = styled(ContainerDiv)`
    flex-basis: 33%;
    flex-direction: column;
    align-items: center;
`;

const styles = () => ({
    checkboxLabel: {
        fontSize: "10px"
    }
});

const RolePermissionsDialog = ({ open, classes, roleData, cancelAction }) => {
    const permissionIds =
        Boolean(roleData) && Array.isArray(roleData.permissions)
            ? roleData.permissions.map(({ id }) => id)
            : [];

    const renderPermissions = permissionCategories => {
        let allPermissionsLength = 0;
        permissionCategories.forEach(category => {
            allPermissionsLength += category.permissions.length;
        });
        return (
            <React.Fragment>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center"
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
                                    permissionIds.length ===
                                    allPermissionsLength
                                }
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
                    {permissionCategories.map(
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
                                                    />
                                                }
                                                label={permissionName}
                                            />
                                        )
                                    )}
                                </AllPermissionContainerDiv>
                            </EachRolePermissionContainerDiv>
                        )
                    )}
                </div>
            </React.Fragment>
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
                    maxWidth="lg"
                    fullWidth
                >
                    <DialogTitleHelper onClose={cancelAction}>
                        PERMISSIONS FOR{" "}
                        {Boolean(roleData) && Boolean(roleData.name)
                            ? roleData.name.toUpperCase()
                            : ""}
                    </DialogTitleHelper>
                    {loading && <Loading loadingData />}
                    {error && error.message ? (
                        <React.Fragment>Error! {error.message}</React.Fragment>
                    ) : (
                        <React.Fragment>
                            {!loading && (
                                <DialogContent>
                                    {renderPermissions(permissionCategories)}
                                </DialogContent>
                            )}
                        </React.Fragment>
                    )}
                </Dialog>
            )}
        </Query>
    );
};

export default withStyles(styles)(RolePermissionsDialog);
