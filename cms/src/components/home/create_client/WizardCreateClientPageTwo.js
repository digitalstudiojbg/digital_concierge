import React from "react";
import { Formik, Form, Field } from "formik";
import Button from "@material-ui/core/Button";
import { TextField, fieldToTextField, Select } from "formik-material-ui";
import MuiTextField from "@material-ui/core/TextField";
import { Query, withApollo, compose, graphql } from "react-apollo";
import { getLicenseTypes } from "../../../data/query";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const LicenseKeyTextField = props => (
    <MuiTextField
        {...fieldToTextField(props)}
        onChange={event => {
            const { value } = event.target;
            const filterString = value.split("-").join("");
            filterString.length <= 16 &&
                props.field.name === "license_key" &&
                props.form.setFieldValue(
                    props.field.name,
                    filterString.length % 4 === 0 && filterString.length !== 16
                        ? `${value}-`
                        : value
                );
        }}
    />
);

class WizardCreateClientPageTwo extends React.Component {
    render() {
        const { data: { licenseTypes = {} } = {} } = this.props;
        console.log(licenseTypes);

        return (
            <Formik
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values);

                    //setSubmitting(false);
                }}
                render={({ errors, values, isSubmitting, setFieldValue }) => (
                    <Form>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >
                            <div style={{ width: "33%", padding: "20px" }}>
                                <h1>License</h1>

                                <div
                                    style={{
                                        paddingBottom: "20px"
                                    }}
                                >
                                    <Field
                                        name="license_key"
                                        label="license key"
                                        required={true}
                                        type="text"
                                        component={LicenseKeyTextField}
                                        variant="outlined"
                                        fullWidth={true}
                                    />
                                </div>

                                <div
                                    style={{
                                        paddingBottom: "20px"
                                    }}
                                >
                                    {licenseTypes.length > 0 && (
                                        <React.Fragment>
                                            <InputLabel>
                                                License Type
                                            </InputLabel>
                                            <Field
                                                name="license_type"
                                                component={Select}
                                                disabled={
                                                    licenseTypes.length < 1
                                                }
                                                fullWidth={true}
                                            >
                                                <MenuItem value="null" disabled>
                                                    License Type
                                                </MenuItem>
                                                {licenseTypes.map(
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
                                        </React.Fragment>
                                    )}
                                </div>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    BUTTON
                                </Button>
                            </div>
                            <div style={{ width: "33%", padding: "20px" }}>
                                <h1>Agreement</h1>
                            </div>
                            <div style={{ width: "33%", padding: "20px" }}>
                                <h1>Payment</h1>
                            </div>
                        </div>
                    </Form>
                )}
            />
        );
    }
}

//export default WizardCreateClientPageTwo;

export default compose(
    withApollo,
    graphql(getLicenseTypes)
)(WizardCreateClientPageTwo);
