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
import { getLicenseTypes, getCurrencyList } from "../../../data/query";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import dayjs from "dayjs";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Loading from "../../loading/Loading";
import validationSchema from "./two/PageTwoValidationSchema";
import {
    CREATE_LICENSE,
    CREATE_CONTRACT,
    CREATE_PAYMENT
} from "../../../data/mutation";
import styled from "styled-components";
import { gql } from "apollo-boost";

const BrowseButton = styled.label`
    border: 3px solid rgb(64, 84, 178);
    display: inline-block;
    width: 100%;
    text-align: center;
    cursor: pointer;
    padding: 5px;
    font-size: 1.3em;
    color: rgb(64, 84, 178);
    border-radius: 5px;
    &:hover {
        font-weight: bold;
    }
`;

const FiledContainer = styled.div`
    padding-bottom: 20px;
`;

const LICENSE_DATE_FIELD = [
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

const AGREEMENT_DATE_FIELD = [
    {
        name: "agreement_date",
        label: "AGREEMENT DATE",
        required: true,
        type: "date"
    },
    {
        name: "agreement_renewal_date",
        label: "AGREEMENT RENEWAL DATE",
        required: true,
        type: "date"
    }
];

const PAYMENT_TEXT_FIELD = [
    {
        name: "invoice_number",
        label: "INVOICE NUMBER",
        required: true,
        type: "text"
    },
    {
        name: "invoice_amount",
        label: "INVOICE AMOUNT",
        required: true,
        type: "text"
    }
];

const PAYMENT_DATE_FIELD = [
    {
        name: "invoice_date",
        label: "INVOICE DATE",
        required: true,
        type: "date"
    },
    {
        name: "payable_date",
        label: "PAYABLE DATE",
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
    constructor(props) {
        super(props);
        this.state = { client_image: null };
        this.fileInput = React.createRef();
    }

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

    renderLicenseForm() {
        const { getLicenseTypes: { licenseTypes = {} } = {} } = this.props;

        return (
            <div style={{ width: "33%", padding: "20px 20px 20px 0" }}>
                <h1>License</h1>
                <FiledContainer>
                    <Field
                        name="license_key"
                        label="LICENSE KEY"
                        required={true}
                        type="text"
                        component={LicenseKeyTextField}
                        variant="outlined"
                        fullWidth={true}
                    />
                </FiledContainer>
                <FiledContainer>
                    {licenseTypes.length > 0 &&
                        this.selectRenderMethod({
                            name: "license_type",
                            label: "LICENSE TYPE",
                            required: true,
                            type: "select",
                            optionList: licenseTypes
                        })}
                </FiledContainer>
                {LICENSE_DATE_FIELD.map(({ name, label, required, type }) => (
                    <FiledContainer>
                        {this.selectRenderMethod({
                            name,
                            label,
                            required,
                            type
                        })}
                    </FiledContainer>
                ))}
                <div>
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
            </div>
        );
    }

    renderAgreementForm() {
        return (
            <div style={{ width: "33%", padding: "20px" }}>
                <h1>Agreement</h1>
                <FiledContainer>
                    {this.selectRenderMethod({
                        name: "agreement_number",
                        label: "AGREEMENT NUMBER",
                        required: true,
                        type: "text"
                    })}
                </FiledContainer>
                {AGREEMENT_DATE_FIELD.map(({ name, label, required, type }) => (
                    <FiledContainer>
                        {this.selectRenderMethod({
                            name,
                            label,
                            required,
                            type
                        })}
                    </FiledContainer>
                ))}
                <FiledContainer>
                    <MuiTextField
                        value={
                            this.state.client_image
                                ? this.state.client_image.name
                                : ""
                        }
                        disabled={true}
                        fullWidth={true}
                        label="File Name"
                        variant="outlined"
                    />
                </FiledContainer>
                <FiledContainer>
                    <BrowseButton>
                        <input
                            accept="image/*, application/pdf"
                            style={{ display: "none" }}
                            ref={this.fileInput}
                            onChange={() => {
                                this.setState({
                                    client_image: this.fileInput.current
                                        .files[0]
                                });
                            }}
                            id="upload-client-image"
                            type="file"
                        />
                        BROWSE
                    </BrowseButton>
                </FiledContainer>
            </div>
        );
    }

    renderPaymentForm() {
        const { getCurrencyList: { currencies = {} } = {} } = this.props;

        return (
            <div style={{ width: "33%", padding: "20px 0px 20px 20px" }}>
                <h1>Payment</h1>
                {PAYMENT_TEXT_FIELD.map(({ name, label, required, type }) => (
                    <FiledContainer>
                        {this.selectRenderMethod({
                            name,
                            label,
                            required,
                            type
                        })}
                    </FiledContainer>
                ))}
                <FiledContainer>
                    {currencies.length > 0 &&
                        this.selectRenderMethod({
                            name: "currency",
                            label: "CURRENCY",
                            required: true,
                            type: "select",
                            optionList: currencies
                        })}
                </FiledContainer>
                {PAYMENT_DATE_FIELD.map(({ name, label, required, type }) => (
                    <FiledContainer>
                        {this.selectRenderMethod({
                            name,
                            label,
                            required,
                            type
                        })}
                    </FiledContainer>
                ))}
            </div>
        );
    }

    render() {
        let {
            getLicenseTypes: { licenseTypes = {} } = {},
            getCurrencyList: { currencies = {} } = {},
            createLicense,
            createContract,
            createPayment
        } = this.props;

        const { client_image } = this.state;
        const currentDate = dayjs().format("YYYY-MM-DD");
        const nextYearDate = dayjs()
            .add(1, "year")
            .format("YYYY-MM-DD");

        if (licenseTypes.length < 0 && currencies.length < 0)
            return <Loading />;
        return (
            <Formik
                validationSchema={validationSchema}
                initialValues={{
                    commence_date: currentDate,
                    expire_date: nextYearDate,
                    auto_renewal: true,
                    agreement_date: currentDate,
                    agreement_renewal_date: nextYearDate,
                    invoice_date: currentDate,
                    payable_date: nextYearDate
                }}
                onSubmit={(
                    {
                        license_key: key,
                        license_type,
                        auto_renewal,
                        commence_date,
                        expire_date,
                        agreement_number: number,
                        agreement_date,
                        agreement_renewal_date: renewal_date,
                        invoice_number,
                        invoice_amount,
                        invoice_date,
                        payable_date,
                        currency: currencyId
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
                        createContract({
                            variables: {
                                input: {
                                    number,
                                    file: this.state.client_image,
                                    agreement_date,
                                    renewal_date,
                                    clientId: 1
                                }
                            }
                        }).then(data => {
                            console.log("CREATE CONTRACT SUCCEED");
                            console.log(data);
                            createPayment({
                                variables: {
                                    input: {
                                        invoice_number,
                                        invoice_date,
                                        invoice_amount: parseInt(
                                            invoice_amount
                                        ),
                                        payable_date,
                                        currencyId,
                                        clientId: 1
                                    }
                                }
                            }).then(data => {
                                console.log("CREATE PAYMENT SUCCEED");
                                console.log(data);
                            });
                        });
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
                                {this.renderLicenseForm()}

                                {this.renderAgreementForm()}

                                {this.renderPaymentForm()}
                            </div>
                            <div
                                style={{
                                    paddingBottom: "20px"
                                }}
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={
                                        isSubmitting ||
                                        Object.keys(errors).length > 0 ||
                                        !values.license_type ||
                                        !client_image
                                    }
                                >
                                    SUBMIT
                                </Button>
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
    graphql(getLicenseTypes, { name: "getLicenseTypes" }),
    graphql(getCurrencyList, { name: "getCurrencyList" }),
    graphql(CREATE_LICENSE(), { name: "createLicense" }),
    graphql(CREATE_CONTRACT(), { name: "createContract" }),
    graphql(CREATE_PAYMENT(), { name: "createPayment" })
)(WizardCreateClientPageTwo);
