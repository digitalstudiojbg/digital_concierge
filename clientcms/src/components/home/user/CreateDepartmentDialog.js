import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from "@material-ui/core";
import { SlideUpTransition } from "../../../utils/Constants";
import DialogTitleHelper from "../../../utils/DialogTitleHelper";
import { FieldLabel } from "./commonStyle";

const CreateDepartmentDialog = ({
    open,
    submitAction,
    cancelAction,
    which,
    otherSubmitData
}) => {
    const [name, setName] = useState("");

    const handleChange = event => setName(event.target.value);
    const onClickSubmitAction = () => {
        if (name.length > 0) {
            submitAction({
                variables: {
                    input: {
                        name,
                        ...otherSubmitData
                    }
                }
            }).then(() => cancelAction());
        }
    };

    return (
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
            <DialogContent>
                <FieldLabel>{which.toUpperCase()} NAME</FieldLabel>
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
                >
                    CREATE
                </Button>
                <Button
                    onClick={cancelAction}
                    variant="outlined"
                    color="secondary"
                >
                    CANCEL
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateDepartmentDialog;
