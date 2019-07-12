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
import { CREATE_DEPARTMENT, EDIT_DEPARTMENT } from "../../../data/mutation";
import { getDepartmentListByClient } from "../../../data/query/department";

const CreateDepartmentDialog = ({ open, data, closeAction }) => {
    const { id = "", name: originalName = "", clientId } = data || {};
    const [name, setName] = useState(originalName);
    useEffect(() => {
        const { name: changeName } = data || {};
        setName(changeName);
    }, [data]);
    const handleChange = event => setName(event.target.value);

    return (
        <Mutation
            mutation={Boolean(id) ? EDIT_DEPARTMENT : CREATE_DEPARTMENT}
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
                                input: {
                                    ...(Boolean(id) && { id }),
                                    name,
                                    ...(!Boolean(id) && { clientId })
                                }
                            }
                        }).then(() => closeAction());
                    }
                };

                if (error && error.message) {
                    alert("Error " + error.message);
                }

                const headerText = `${
                    Boolean(id) ? "EDIT" : "CREATE"
                } DEPARTMENT`;

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
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={onClickSubmitAction}
                                variant="outlined"
                                color="primary"
                                disabled={loading}
                            >
                                SAVE
                            </Button>
                        </DialogActions>
                    </Dialog>
                );
            }}
        </Mutation>
    );
};

export default CreateDepartmentDialog;
