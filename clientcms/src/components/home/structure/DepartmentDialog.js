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
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
    titleStyle: {
        color: "#2699FB"
    },
    buttonStyle: {
        backgroundColor: "#2699FB",
        color: "white",
        width: "100%",
        height: 40,
        fontSize: "1.2em"
    }
});

const CreateDepartmentDialog = ({ open, data, closeAction, classes }) => {
    const {
        id = "",
        name: originalName = "",
        clientId,
        delete: isDelete,
        duplicate: isDuplicate
    } = data || {};

    //Set name state via hooks
    const [name, setName] = useState(originalName);

    //Component Did Update for data
    useEffect(() => {
        const { name: changeName } = data || {};
        setName(changeName);
    }, [data]);

    //Handle change for Text Field
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
        //Create mutation here
        mutation = CREATE_DEPARTMENT;
        headerText = "CREATE DEPARTMENT";
    }

    //Logic handler to determine what data is submitted
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
                        maxWidth="sm"
                        fullWidth
                        disableBackdropClick
                        disableEscapeKeyDown
                    >
                        {loading ? (
                            <DialogTitle classes={{ root: classes.titleStyle }}>
                                {headerText}
                            </DialogTitle>
                        ) : (
                            <DialogTitleHelper
                                onClose={closeAction}
                                className={classes.titleStyle}
                            >
                                {headerText}
                            </DialogTitleHelper>
                        )}

                        <DialogContent>
                            <div style={{ marginTop: 20 }}>
                                {isDuplicate && (
                                    <div
                                        style={{
                                            textAlign: "center",
                                            fontWeight: 600
                                        }}
                                    >
                                        PLEASE RENAME DEPARTMENT TO UNIQUE NAME
                                    </div>
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
                                    <div
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center"
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontWeight: 600,
                                                marginBottom: 10
                                            }}
                                        >
                                            ARE YOU SURE YOU WANT TO DELETE THIS
                                            DEPARTMENT?
                                        </div>
                                        <div style={{ color: "#9D9D9D" }}>
                                            PLEASE REMOVE ASSOCIATED USERS AND
                                            ROLES BEFORE DELETING.
                                        </div>
                                    </div>
                                )}
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <div style={{ width: "30%" }}>
                                <Button
                                    onClick={onClickSubmitAction}
                                    variant="outlined"
                                    color="primary"
                                    disabled={loading}
                                    className={classes.buttonStyle}
                                >
                                    {isDelete || isDuplicate
                                        ? "CONFIRM"
                                        : "SAVE"}
                                </Button>
                            </div>
                        </DialogActions>
                    </Dialog>
                );
            }}
        </Mutation>
    );
};

export default withStyles(styles)(CreateDepartmentDialog);
