import React from "react";
import { Formik, Form, Field } from "formik";
import Button from "@material-ui/core/Button";
import { TextField, fieldToTextField } from "formik-material-ui";
import MuiTextField from "@material-ui/core/TextField";

const LICENSE_KEY_FIELDS = [
    {
        name: "license_key_1",
        label: "Key Part 1",
        required: true,
        type: "text"
    },
    {
        name: "license_key_2",
        label: "Key Part 2",
        required: true,
        type: "text"
    },
    {
        name: "license_key_3",
        label: "Key Part 3",
        required: true,
        type: "text"
    },
    {
        name: "license_key_4",
        label: "Key Part 4",
        required: true,
        type: "text"
    }
];

const UppercasingTextField = props => (
    <MuiTextField
        {...fieldToTextField(props)}
        onChange={event => {
            const { value } = event.target;

            console.log(event.target.value);
            props.form.setFieldValue(
                props.field.name,
                value ? value.toUpperCase() : ""
            );
        }}
    />
);

class WizardCreateClientPageTwo extends React.Component {
    render() {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingBottom: "20px"
                }}
            >
                <div style={{ width: "33%" }}>
                    <h1>License</h1>

                    <Formik
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values);

                            //setSubmitting(false);
                        }}
                        render={({
                            errors,
                            values,
                            isSubmitting,
                            setFieldValue
                        }) => (
                            <Form>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    {LICENSE_KEY_FIELDS.map(
                                        (
                                            { name, label, required, type },
                                            index
                                        ) => (
                                            <div
                                                style={{
                                                    padding: "20px"
                                                }}
                                                key={`LICENSE_FIELDS-${index}`}
                                            >
                                                <Field
                                                    name={name}
                                                    label={label}
                                                    required={required}
                                                    type={type}
                                                    component={TextField}
                                                    variant="outlined"
                                                    fullWidth={true}
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                                <div
                                    style={{
                                        padding: "20px"
                                    }}
                                >
                                    <Field
                                        name="license key"
                                        label="license key"
                                        required={true}
                                        type="text"
                                        component={UppercasingTextField}
                                        variant="outlined"
                                        fullWidth={true}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    BUTTON
                                </Button>
                            </Form>
                        )}
                    />
                </div>
                <div style={{ width: "33%" }}>
                    <h1>Agreement</h1>
                </div>
                <div style={{ width: "33%" }}>
                    <h1>Payment</h1>
                </div>
            </div>
        );
    }
}

export default WizardCreateClientPageTwo;
