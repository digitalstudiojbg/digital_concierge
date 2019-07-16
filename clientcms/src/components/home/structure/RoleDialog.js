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
import { DELETE_ROLES, DUPLICATE_ROLE } from "../../../data/mutation";
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

const RoleDialog = ({ open, data, closeAction, classes }) => {
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
    if (isDelete) {
        //Delete mutation here
        mutation = DELETE_ROLES;
        headerText = "DELETE ROLE";
    } else if (isDuplicate) {
        //Duplicate mutation here
        mutation = DUPLICATE_ROLE;
        headerText = "DUPLICATE ROLE";
    }

    //Logic handler to determine what data is submitted
    const handleSubmitData = () => {
        if (isDelete) {
            //Delete action
            return { input: { roleIds: [id], clientId } };
        } else if (isDuplicate) {
            //Duplicate action
            return { id, name };
        } else {
            return null;
        }
    };

    return (
        <React.Fragment>
            {Boolean(mutation) && Boolean(headerText) ? (
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
                                    <DialogTitle
                                        classes={{ root: classes.titleStyle }}
                                    >
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
                                                PLEASE RENAME ROLE TO UNIQUE
                                                NAME
                                            </div>
                                        )}
                                    </div>
                                    {!isDelete ? (
                                        /*IF NOT DELETE, RENDER TEXT FIELD*/
                                        <React.Fragment>
                                            <FieldLabel>ROLE NAME</FieldLabel>
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
                                                ARE YOU SURE YOU WANT TO DELETE
                                                THIS ROLE?
                                            </div>
                                            <div style={{ color: "#9D9D9D" }}>
                                                PLEASE NOTE ASSOCIATED USERS
                                                WILL LOSE ASSOCIATED PERMISSIONS
                                                TO THIS ROLE
                                            </div>
                                        </div>
                                    )}
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
                                            CONFIRM
                                        </Button>
                                    </div>
                                </DialogActions>
                            </Dialog>
                        );
                    }}
                </Mutation>
            ) : (
                <React.Fragment />
            )}
        </React.Fragment>
    );
};

export default withStyles(styles)(RoleDialog);
