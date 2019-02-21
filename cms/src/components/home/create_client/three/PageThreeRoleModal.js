import React, { useState } from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Set } from "immutable";
import TextField from "@material-ui/core/TextField";
import { Dropdown } from "semantic-ui-react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const ContainerDiv = styled.div`
    width: 100%;
    display: flex;
`;

const EachRolePermissionContainerDiv = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    padding: 10px;
`;

const EachRoleContainerDiv = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
`;

const AllPermissionContainerDiv = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    padding: 5px;
`;

const AllPermissionFooterContainerDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    color: blue;
`;

const PermissionFooterEntryDiv = styled.span`
    width: 45%;
    display: flex;
    margin-right: 5px;
    justify-content: center;
    border: 1px solid blue;
`;

const styles = () => ({
    dialogTitle: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }
});

export const PageThreeRoleModal = ({
    handleClose,
    departments,
    permissionsCategories,
    classes,
    role
}) => {
    console.log(role);
    const [department, setDepartment] = useState(
        Boolean(role) ? role.department.id : null
    );
    const [selected, setSelected] = useState(
        Boolean(role) ? Set(role.permissions.map(({ id }) => id)) : Set()
    );
    const [name, setName] = useState(Boolean(role) ? role.name : "");

    let allPermissionsLength = 0;
    permissionsCategories.forEach(category => {
        allPermissionsLength += category.permissions.length;
    });

    const handleCheck = event => {
        if (selected.includes(event.target.id)) {
            //Remove from selected checkboxes
            setSelected(selected.delete(event.target.id));
        } else {
            //Add to selected checkboxes
            setSelected(selected.add(event.target.id));
        }
    };

    const handleChangeDepartment = (_event, { value }) => {
        setDepartment(value);
    };

    const handleSelectUnSelectAll = () => {
        //https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays-in-javascript
        if (selected.size === allPermissionsLength) {
            setSelected(Set());
        } else {
            const permissions = [].concat.apply(
                [],
                permissionsCategories.map(({ permissions }) => {
                    let output = [];
                    permissions.forEach(({ id }) => {
                        output = [...output, id];
                    });
                    return output;
                })
            );
            setSelected(selected.union(permissions));
        }
    };

    const handleNameChange = event => {
        setName(event.target.value);
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
            <DialogTitle disableTypography className={classes.dialogTitle}>
                <h2>
                    {Boolean(role) ? `EDIT ${role.name} ROLE` : "CREATE ROLE"}
                </h2>
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <ContainerDiv>
                    <div
                        style={{
                            flexBasis: "50%",
                            paddingTop: 5,
                            paddingRight: 40
                        }}
                    >
                        <Dropdown
                            placeholder="DEPARTMENT"
                            fluid
                            selection
                            options={departments.map(
                                ({ id: value, name: text }) => ({ text, value })
                            )}
                            onChange={handleChangeDepartment}
                            value={department}
                        />

                        <div
                            style={{
                                width: "100%",
                                paddingTop: 50
                            }}
                        >
                            <TextField
                                label="Role Name"
                                required={true}
                                value={name}
                                onChange={handleNameChange}
                                fullWidth={true}
                                variant="outlined"
                            />
                        </div>

                        <div
                            style={{
                                width: "100%",
                                paddingTop: 50
                            }}
                        />
                    </div>
                    <div
                        style={{
                            flexBasis: "50%",
                            borderLeft: "2px solid black",
                            width: "100%",
                            height: "100%"
                        }}
                    >
                        <div style={{ width: "100%", display: "flex" }}>
                            <div style={{ width: "50%" }} />
                            <div style={{ width: "50%" }}>
                                <div
                                    style={{
                                        width: "50%",
                                        padding: 5
                                    }}
                                >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    selected.size ===
                                                    allPermissionsLength
                                                }
                                                indeterminate={
                                                    selected.size <
                                                        allPermissionsLength &&
                                                    selected.size !== 0
                                                }
                                                onChange={
                                                    handleSelectUnSelectAll
                                                }
                                            />
                                        }
                                        label="All Permissions"
                                    />
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
                                >
                                    <EachRoleContainerDiv>
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
                                                    key={`MODAL-PERMISSION-${permissionId}-${permissionIndex}`}
                                                    control={
                                                        <Checkbox
                                                            id={permissionId}
                                                            checked={selected.includes(
                                                                permissionId
                                                            )}
                                                            onChange={
                                                                handleCheck
                                                            }
                                                        />
                                                    }
                                                    label={permissionName}
                                                />
                                            )
                                        )}
                                        <AllPermissionFooterContainerDiv>
                                            <PermissionFooterEntryDiv
                                                onClick={() =>
                                                    setSelected(
                                                        selected.union(
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
                                                    setSelected(
                                                        selected.subtract(
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
                </ContainerDiv>
            </DialogContent>
        </Dialog>
    );
};

export default withStyles(styles)(PageThreeRoleModal);
