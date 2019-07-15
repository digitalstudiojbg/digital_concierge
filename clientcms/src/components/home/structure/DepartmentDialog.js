import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from "@material-ui/core";
import { SlideUpTransition } from "../../../utils/Constants";
import DialogTitleHelper from "../../../utils/DialogTitleHelper";
import { FieldLabel } from "../user/commonStyle";
import { Mutation } from "react-apollo";
import {
    CREATE_DEPARTMENT,
    EDIT_DEPARTMENT,
    DELETE_DEPARTMENT,
    DUPLICATE_DEPARTMENT
} from "../../../data/mutation";
import { getDepartmentListByClient } from "../../../data/query/department";

const CreateDepartmentDialog = ({ open, data, closeAction }) => {
    const {
        id = "",
        name: originalName = "",
        clientId,
        delete: isDelete,
        duplicate: isDuplicate
    } = data || {};
    const [name, setName] = useState(originalName);
    useEffect(() => {
        const { name: changeName } = data || {};
        setName(changeName);
    }, [data]);
    const handleChange = event => setName(event.target.value);
    let mutation = null;
    let headerText = "";
    if (Boolean(id) && isDelete) {
        //Delete mutation here
        mutation = DELETE_DEPARTMENT;
        headerText = "DELETE DEPARTMENT";
    } else if (Boolean(id) && isDuplicate) {
        //Duplicate mutation here
        mutation = DUPLICATE_DEPARTMENT;
        headerText = "DUPLICATE DEPARTMENT";
    } else if (Boolean(id)) {
        //Edit mutation here
        mutation = EDIT_DEPARTMENT;
        headerText = "EDIT DEPARTMENT";
    } else {
        mutation = CREATE_DEPARTMENT;
        headerText = "CREATE DEPARTMENT";
    }

    const handleSubmitData = () => {
        if (Boolean(id) && isDelete) {
            //Delete action
            return { id, clientId };
        } else if (Boolean(id) && isDuplicate) {
            return { input: { id, name, clientId } };
        } else if (Boolean(id)) {
            return { input: { id, name } };
        } else {
            return { input: { name, clientId } };
        }
    };

    return (
        <Mutation
            mutation={mutation}
            refetchQueries={[
                {
                    query: getDepartmentListByClient,
                    variables: { id: clientId }
                }
            ]}
        >
            {(action, { loading, error }) => {
                const onClickSubmitAction = () => {
                    if (name.length > 0) {
                        action({
                            variables: {
                                ...handleSubmitData()
                            }
                        }).then(() => closeAction());
                    }
                };

                if (error && error.message) {
                    alert("Error " + error.message);
                }

                return (
                    <Dialog
                        open={open}
                        TransitionComponent={SlideUpTransition}
                        keepMounted
                        onClose={closeAction}
                        maxWidth="md"
                        fullWidth
                        disableBackdropClick
                        disableEscapeKeyDown
                    >
                        {loading ? (
                            <DialogTitle>{headerText}</DialogTitle>
                        ) : (
                            <DialogTitleHelper onClose={closeAction}>
                                {headerText}
                            </DialogTitleHelper>
                        )}

                        <DialogContent>
                            {isDuplicate && (
                                <React.Fragment>
                                    PLEASE RENAME DEPARTMENT TO UNIQUE NAME
                                </React.Fragment>
                            )}
                            {!isDelete ? (
                                /*IF NOT DELETE, RENDER TEXT FIELD*/
                                <React.Fragment>
                                    <FieldLabel>DEPARTMENT NAME</FieldLabel>
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
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    ARE YOU SURE YOU WANT TO DELETE THIS
                                    DEPARTMENT? <br />
                                    PLEASE REMOVE ASSOCIATED USERS AND ROLES
                                    BEFORE DELETING.
                                </React.Fragment>
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={onClickSubmitAction}
                                variant="outlined"
                                color="primary"
                                disabled={loading}
                            >
                                {isDelete || isDuplicate ? "CONFIRM" : "SAVE"}
                            </Button>
                        </DialogActions>
                    </Dialog>
                );
            }}
        </Mutation>
    );
};

export default CreateDepartmentDialog;
