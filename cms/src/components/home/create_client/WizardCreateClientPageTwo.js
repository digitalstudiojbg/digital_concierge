import React from "react";
import { Formik, Form, Field } from "formik";
import Button from "@material-ui/core/Button";
import {
    TextField,
    fieldToTextField,
    Select,
    Checkbox
} from "formik-material-ui";
import MuiTextField from "@material-ui/core/TextField";
import { Query, withApollo, compose, graphql } from "react-apollo";
import { getLicenseTypes } from "../../../data/query";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import dayjs from "dayjs";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
                initialValues={{
                    commence_date: dayjs().format("YYYY-MM-DD"),
                    expire_date: dayjs()
                        .add(1, "year")
                        .format("YYYY-MM-DD"),
                    auto_renewal: true
                }}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values);

                    setSubmitting(false);
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
                                        label="LICENSE KEY"
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
                                                LICENSE TYPE
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
                                                    LICENSE TYPE
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

                                <div
                                    style={{
                                        paddingBottom: "20px"
                                    }}
                                >
                                    <Field
                                        id="commence_date"
                                        name="commence_date"
                                        label="LICENSE COMMENCE DATE"
                                        required={true}
                                        type="date"
                                        component={TextField}
                                        variant="outlined"
                                        fullWidth={true}
                                    />
                                </div>
                                <div
                                    style={{
                                        paddingBottom: "20px"
                                    }}
                                >
                                    <Field
                                        id="expire_date"
                                        name="expire_date"
                                        label="LICENSE EXPIRE DATE"
                                        required={true}
                                        type="date"
                                        component={TextField}
                                        variant="outlined"
                                        fullWidth={true}
                                    />
                                </div>
                                <div
                                    style={{
                                        paddingBottom: "20px"
                                    }}
                                >
                                    <FormControlLabel
                                        control={
                                            <Field
                                                id="auto_renewal"
                                                name="auto_renewal"
                                                label="Automatic Renewal"
                                                required={true}
                                                color="primary"
                                                component={Checkbox}
                                                variant="outlined"
                                                fullWidth={true}
                                            />
                                        }
                                        label="AUTOMATIC RENEWAL"
                                    />
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

export default compose(
    withApollo,
    graphql(getLicenseTypes)
)(WizardCreateClientPageTwo);
