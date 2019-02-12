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
import Loading from "../../loading/Loading";
import validationSchema from "./two/PageTwoValidationSchema";
import { CREATE_LICENSE } from "../../../data/mutation";

const CREATE_LICENSE_DATE_FIELD = [
    {
        name: "commence_date",
        label: "LICENSE COMMENCE DATE",
        required: true,
        type: "date"
    },
    {
        name: "expire_date",
        label: "LICENSE EXPIRE DATE",
        required: true,
        type: "date"
    }
];

const LicenseKeyTextField = props => (
    <MuiTextField
        {...fieldToTextField(props)}
        onChange={event => {
            const { value } = event.target;
            const trimString = value.split("-").join("");
            trimString.length <= 16 &&
                props.field.name === "license_key" &&
                props.form.setFieldValue(
                    props.field.name,
                    value &&
                        trimString.length % 4 === 0 &&
                        trimString.length !== 16 &&
                        value.slice(-1) !== "-"
                        ? `${value}-`
                        : value.slice(-1) === "-"
                        ? value.slice(0, -1)
                        : value
                );
        }}
    />
);

const renderSelectField = ({ name: nameValue, label, optionList }) => {
    console.log(optionList);

    return (
        <React.Fragment>
            <InputLabel>{label}</InputLabel>
            <Field
                name={nameValue}
                component={Select}
                disabled={optionList.length < 1}
                fullWidth={true}
            >
                <MenuItem value="null" disabled>
                    {label}
                </MenuItem>
                {optionList.map(({ id, name }, index) => (
                    <MenuItem key={`ITEM-${name}-${id}-${index}`} value={id}>
                        {name}
                    </MenuItem>
                ))}
            </Field>
        </React.Fragment>
    );
};

const renderDateField = ({ name, label, required, type }) => (
    <Field
        id={name}
        name={name}
        label={label}
        required={required}
        type={type}
        component={TextField}
        variant="outlined"
        fullWidth={true}
    />
);

class WizardCreateClientPageTwo extends React.Component {
    selectRenderMethod({ name, label, required, type, optionList = {} }) {
        switch (type) {
            case "date":
            case "text":
                return renderDateField({ name, label, required, type });
            case "select":
                return renderSelectField({
                    name,
                    label,

                    optionList
                });
            default:
                return <React.Fragment />;
        }
    }

    renderLicenseForm(errors, values, isSubmitting) {
        const { data: { licenseTypes = {} } = {} } = this.props;

        return (
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
                    {licenseTypes.length > 0 &&
                        this.selectRenderMethod({
                            name: "license_type",
                            label: "LICENSE TYPE",
                            required: true,
                            type: "select",
                            optionList: licenseTypes
                        })}
                </div>
                {CREATE_LICENSE_DATE_FIELD.map(
                    ({ name, label, required, type }) => (
                        <div
                            style={{
                                paddingBottom: "20px"
                            }}
                        >
                            {this.selectRenderMethod({
                                name,
                                label,
                                required,
                                type
                            })}
                        </div>
                    )
                )}
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
                    disabled={
                        isSubmitting ||
                        Object.keys(errors).length > 0 ||
                        !values.license_type
                    }
                >
                    BUTTON
                </Button>
            </div>
        );
    }

    render() {
        const { data: { licenseTypes = {} } = {}, createLicense } = this.props;

        if (licenseTypes.length < 0) return <Loading />;
        return (
            <Formik
                validationSchema={validationSchema}
                initialValues={{
                    commence_date: dayjs().format("YYYY-MM-DD"),
                    expire_date: dayjs()
                        .add(1, "year")
                        .format("YYYY-MM-DD"),
                    auto_renewal: true
                }}
                onSubmit={(
                    {
                        license_key: key,
                        license_type,
                        auto_renewal,
                        commence_date,
                        expire_date
                    },
                    { setSubmitting }
                ) => {
                    createLicense({
                        variables: {
                            input: {
                                key,
                                license_type_id: parseInt(license_type),
                                auto_renewal,
                                commence_date: commence_date,
                                expire_date: expire_date,
                                clientId: 1
                            }
                        }
                    }).then(data => {
                        console.log("CREATE LICENSE SUCCEED");
                        console.log(data);
                    });
                    setSubmitting(false);
                }}
                render={({ errors, values, isSubmitting }) => {
                    console.log(errors);
                    return (
                        <Form>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}
                            >
                                {this.renderLicenseForm(
                                    errors,
                                    values,
                                    isSubmitting
                                )}
                                <div style={{ width: "33%", padding: "20px" }}>
                                    <h1>Agreement</h1>
                                </div>
                                <div style={{ width: "33%", padding: "20px" }}>
                                    <h1>Payment</h1>
                                </div>
                            </div>
                        </Form>
                    );
                }}
            />
        );
    }
}

export default compose(
    withApollo,
    graphql(getLicenseTypes),
    graphql(CREATE_LICENSE(), { name: "createLicense" })
)(WizardCreateClientPageTwo);
