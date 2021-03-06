import React from "react";
import styled from "styled-components";
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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import CloseIcon from "@material-ui/icons/Close";
import { Set } from "immutable";
import { withStyles } from "@material-ui/core/styles";
import { Formik, Field, Form } from "formik";
import { TextField, Select } from "formik-material-ui";
import * as Yup from "yup";
import { DECIMAL_RADIX } from "../../../../utils/Constants";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import {
    ContainerDiv,
    EachRolePermissionContainerDiv,
    EachRoleContainerDiv,
    AllPermissionContainerDiv,
    AllPermissionFooterContainerDiv,
    PermissionFooterEntryDiv,
    FieldLabel
} from "../CreateClientStyleSet";

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

export const PageThreeRoleModal = ({
    handleClose,
    departments,
    permissionsCategories,
    classes,
    role,
    submitAction,
    clientId
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

    const validationSchema = Yup.object().shape({
        //Client validation
        name: Yup.string()
            .min(1, "Required")
            .required("Required"),
        departmentId: Yup.string()
            .oneOf(
                departments.map(({ id }) => id),
                "Department ID Selection Not Valid"
            )
            .required("Required"),
        permissionIds: Yup.array()
            .min(1, "Please select at least one permission")
            .of(
                Yup.string("Permission ID Selection Not Valid").oneOf(
                    permissionsList,
                    "Permission ID Selection Not Valid"
                )
            )
            .required("Required")
    });

    return (
        <Formik
            initialValues={{
                name: Boolean(role) ? role.name : "",
                departmentId:
                    Boolean(role) && Boolean(role.department)
                        ? role.department.id
                        : "",
                permissionIds:
                    Boolean(role) &&
                    Boolean(role.permissions) &&
                    Array.isArray(role.permissions)
                        ? role.permissions.map(({ id }) => id) //Set()
                        : [] //Set([]),
            }}
            validationSchema={validationSchema}
        >
            {({
                values: { permissionIds, name, departmentId },
                isSubmitting,
                errors,
                setFieldValue,
                setSubmitting
            }) => (
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={true}
                    onClose={handleClose}
                    aria-labelledby="dialog-title"
                    fullWidth={true}
                    maxWidth="lg"
                >
                    <DialogTitle
                        disableTypography
                        className={classes.dialogTitle}
                    >
                        <h2>
                            {Boolean(role)
                                ? `EDIT ${role.name} ROLE`
                                : "CREATE ROLE"}
                        </h2>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>

                    <DialogActions classes={{ root: classes.leftDialogAction }}>
                        <Button
                            variant="outlined"
                            className={classes.submitButton}
                            disabled={
                                isSubmitting ||
                                Object.keys(errors).length > 0 ||
                                name.length === 0
                            }
                            onClick={() => {
                                setSubmitting(true);
                                // console.log("VALUES ARE: ", {
                                //     permissionIds,
                                //     name,
                                //     departmentId
                                // });
                                submitAction({
                                    variables: {
                                        input: {
                                            ...(Boolean(role) && {
                                                id: parseInt(
                                                    role.id,
                                                    DECIMAL_RADIX
                                                )
                                            }),
                                            ...(!Boolean(role) && {
                                                isStandardRole: false
                                            }),
                                            ...(!Boolean(role) && {
                                                clientId: parseInt(
                                                    clientId,
                                                    DECIMAL_RADIX
                                                )
                                            }),
                                            name,
                                            departmentId: parseInt(
                                                departmentId,
                                                DECIMAL_RADIX
                                            ),
                                            permissionIds: permissionIds.map(
                                                id =>
                                                    parseInt(id, DECIMAL_RADIX)
                                            )
                                        }
                                    }
                                }).then(handleClose());
                            }}
                        >
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
                                    paddingTop: 5,
                                    paddingRight: 40
                                }}
                            >
                                <FormControl
                                    fullWidth={true}
                                    error={Boolean(errors.departmentId)}
                                >
                                    <FieldLabel>DEPARTMENT</FieldLabel>
                                    <Field
                                        name="departmentId"
                                        component={Select}
                                        disabled={departments.length < 1}
                                        fullWidth={true}
                                        input={<OutlinedInput />}
                                    >
                                        {departments.map(
                                            ({ id, name }, index) => (
                                                <MenuItem
                                                    key={`ITEM-${name}-${id}-${index}`}
                                                    value={id}
                                                >
                                                    {name}
                                                </MenuItem>
                                            )
                                        )}
                                    </Field>
                                    {Boolean(errors.departmentId) && (
                                        <FormHelperText>
                                            {errors.departmentId}
                                        </FormHelperText>
                                    )}
                                </FormControl>

                                <div
                                    style={{
                                        width: "100%",
                                        paddingTop: 50
                                    }}
                                >
                                    <FieldLabel>ROLE NAME</FieldLabel>
                                    <Field
                                        name="name"
                                        component={TextField}
                                        //   label="Role Name"
                                        required={true}
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
                                                error={Boolean(
                                                    errors.permissionIds
                                                )}
                                            >
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            style={{
                                                                color:
                                                                    "#2699FB",
                                                                padding: "0",
                                                                Label: {
                                                                    fontSize:
                                                                        "10px"
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
                                                {Boolean(
                                                    errors.permissionIds
                                                ) && (
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
                                                                        padding:
                                                                            "0"
                                                                        // Label: {
                                                                        //     fontSize:
                                                                        //         "10px"
                                                                        // }
                                                                    }}
                                                                    id={
                                                                        permissionId
                                                                    }
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
                                                            label={
                                                                permissionName
                                                            }
                                                        />
                                                    )
                                                )}
                                                <AllPermissionFooterContainerDiv>
                                                    <PermissionFooterEntryDiv
                                                        onClick={() =>
                                                            setFieldValue(
                                                                "permissionIds",
                                                                Set(
                                                                    permissionIds
                                                                )
                                                                    .union(
                                                                        permissions.map(
                                                                            ({
                                                                                id
                                                                            }) =>
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
                                                                Set(
                                                                    permissionIds
                                                                )
                                                                    .subtract(
                                                                        permissions.map(
                                                                            ({
                                                                                id
                                                                            }) =>
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
            )}
        </Formik>
    );
};

export default withStyles(styles)(PageThreeRoleModal);
