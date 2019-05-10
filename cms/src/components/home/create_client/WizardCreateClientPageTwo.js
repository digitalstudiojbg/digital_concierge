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
import {
    getLicenseTypes,
    getCurrencyList,
    getNewCreatedClientId
} from "../../../data/query";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from '@material-ui/core/OutlinedInput';
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

import {
    SectionDiv,
    BrowseButton,
    SectionHeader,
    FiledContainer,
    FieldLabel,
    SubFieldContainerDiv,
    ContinueButton
    } from "./CreateClientStyleSet";

import pagesStyle from "./pagesStyle.css";


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
                input={
                    <OutlinedInput/>
                }
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
        this.state = {
            client_image: null
        };
        this.fileInput = React.createRef();
    }

    selectRenderMethod({ name, label, required, type, optionList = {}
}) {
        switch (type) {
            case "date":
            case "text":
                return renderDateField({ name, label, required, type
                    });
            case "select":
                return renderSelectField({
                    name,
                    label,
                    optionList,
            
                });
            default:
                return <React.Fragment />;
        }
    }

    renderLicenseForm() {
        const { getLicenseTypes: { licenseTypes = {} } = {} } = this.props;

        return (
            <SectionDiv style={{width:"33%", height:"500px"}}>
                
                <SectionHeader> License</SectionHeader>
                <FiledContainer>
                    <SubFieldContainerDiv>
                        <FieldLabel>LICENSE KEY</FieldLabel>
                        <Field
                            name="license_key"
                        //    label="LICENSE KEY"
                            required={true}
                            type="text"
                            component={LicenseKeyTextField}
                            variant="outlined"
                        fullWidth={true}
                        />
                    </SubFieldContainerDiv>
                </FiledContainer>
                <FiledContainer>
                    <SubFieldContainerDiv>
                    <FieldLabel>LICENSE TYPE</FieldLabel>
                    {licenseTypes.length > 0 &&
                        this.selectRenderMethod({
                            name: "license_type",
                         //   label: "LICENSE TYPE",
                            required: true,
                            type: "select",
                            optionList: licenseTypes,
                  
                        })}
                        </SubFieldContainerDiv>
                </FiledContainer>
                {LICENSE_DATE_FIELD.map(({ name, label, required, type }) => (
                    <FiledContainer>
                        <SubFieldContainerDiv>
                            <FieldLabel>{label}</FieldLabel>
                            {this.selectRenderMethod({
                                name,
                            // label,
                                required,
                                type
                            })}
                        </SubFieldContainerDiv>
                    </FiledContainer>
                ))}
                <div>
                    <FormControlLabel
            
                        control={
                            <Field
                                style={{color: "#2699FB"}}
                                id="auto_renewal"
                                name="auto_renewal"
                                label="Automatic Renewal"
                                required={true}
                              //  color=primary
                                component={Checkbox}
                                variant="outlined"
                                fullWidth={true}
                            />
                        }
                        label="AUTOMATIC RENEWAL"
                    />
                </div>
            </SectionDiv >
        );
    }

    renderAgreementForm() {
        return (
            <SectionDiv style={{width:"33%", height:"500px"}}>
                
                <SectionHeader>Agreement</SectionHeader>
                <FiledContainer>
                    <SubFieldContainerDiv>
                        <FieldLabel>AGREEMENT NUMBER</FieldLabel>
                            {this.selectRenderMethod({
                                name: "agreement_number",
                            // label: "AGREEMENT NUMBER",
                                required: true,
                                type: "text",
                                
                            })}
                    </SubFieldContainerDiv>
                </FiledContainer>
              
                {AGREEMENT_DATE_FIELD.map(({ name, label, required, type }) => (


                    <FiledContainer>
                        <SubFieldContainerDiv>
                            <FieldLabel>{label}</FieldLabel>
                            {this.selectRenderMethod({
                                name,
                            //   label,
                                required,
                                type
                            })}
                        </SubFieldContainerDiv>
                    </FiledContainer>
                ))}
                <FiledContainer>
                 <SubFieldContainerDiv>
                    <FieldLabel>Upload Agreement</FieldLabel>
                    <MuiTextField
                        value={
                            this.state.client_image
                                ? this.state.client_image.name
                                : ""
                        }
                        disabled={true}
                        fullWidth={true}
                     //   label="File Name"
                        variant="outlined"
                    />
                </SubFieldContainerDiv>
                </FiledContainer>
                <FiledContainer>
                    <BrowseButton style={{marginTop: "10px"}}>
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
            </SectionDiv >
        );
    }

    renderPaymentForm(isSubmitting, errors, values) {
        const { client_image } = this.state;
        const { getCurrencyList: { currencies = {} } = {} } = this.props;

        return (
            
            <SectionDiv style={{width:"33%", height:"500px", borderRight:"0"}}>
                <SectionHeader>Payment</SectionHeader>
                {PAYMENT_TEXT_FIELD.map(({ name, label, required, type }) => (
                    <SubFieldContainerDiv>
                        <FiledContainer>
                            
                                <FieldLabel>{label}</FieldLabel>
                                {this.selectRenderMethod({
                                    name,
                                //  label,
                                    required,
                                    type
                                })}
                        
                        </FiledContainer>
                     </SubFieldContainerDiv>
                ))}
                <FiledContainer>
                    <SubFieldContainerDiv>
                        <FieldLabel>CURRENCY</FieldLabel>
                        {currencies.length > 0 &&
                            this.selectRenderMethod({
                                name: "currency",
                            //  label: "CURRENCY",
                                required: true,
                                type: "select",
                                optionList: currencies
                            })}
                    </SubFieldContainerDiv>
                </FiledContainer>
                {PAYMENT_DATE_FIELD.map(({ name, label, required, type }) => (
                    <FiledContainer>
                        <SubFieldContainerDiv>
                            <FieldLabel>{label}</FieldLabel>
                            {this.selectRenderMethod({
                                name,
                               // label,
                                required,
                                type
                            })}
                        </SubFieldContainerDiv>
                    </FiledContainer>
                ))}
                <div
                    // style={{
                    //     paddingBottom: "20px",
                    //     display: "flex",
                    //     justifyContent: "flex-end"
                    // }}
                >
                    <ContinueButton
                    style={{width:"90%" , margin:"100px 0 0 40px"}}
                      //  type="submit"
                        variant="contained"
                        color="primary"
                        disabled={
                            isSubmitting ||
                            Object.keys(errors).length > 0 ||
                            !values.license_type ||
                            !client_image
                        }
                    >
                        CONFIRM & CONTINUE
                    </ContinueButton>
                </div>
             </SectionDiv>
            
        );
    }

    render() {
        let {
            getLicenseTypes: { licenseTypes = {} } = {},
            getCurrencyList: { currencies = {} } = {},
            createLicense,
            createContract,
            createPayment,
            client
        } = this.props;

        const { client_image } = this.state;
        const currentDate = dayjs().format("YYYY-MM-DD");
        const nextYearDate = dayjs()
            .add(1, "year")
            .format("YYYY-MM-DD");

        if (licenseTypes.length < 0 && currencies.length < 0)
            return <Loading />;
        // let new_create_client_id= 1;  
        let new_create_client_id;
         try {
            new_create_client_id = client.readQuery({
                 query: getNewCreatedClientId
             }).new_create_client_id;
            } catch {
             return (
                 <React.Fragment>
                     <h1>Can't Find ClientId From Step 1</h1>
                     <Loading />
                 </React.Fragment>
             );
         }

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
                onSubmit={async (
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
                    try {
                        const { next } = this.props;

                        await createLicense({
                            variables: {
                                input: {
                                    key,
                                    license_type_id: parseInt(license_type),
                                    auto_renewal,
                                    commence_date: commence_date,
                                    expire_date: expire_date,
                                    clientId: new_create_client_id
                                }
                            }
                        });
                        console.log("License Created");

                        await createContract({
                            variables: {
                                input: {
                                    number,
                                    file: this.state.client_image,
                                    agreement_date,
                                    renewal_date,
                                
                                   clientId: new_create_client_id
                                }
                            }
                        });
                        console.log("Contract Created");

                        await createPayment({
                            variables: {
                                input: {
                                    invoice_number,
                                    invoice_date,
                                    invoice_amount: parseInt(invoice_amount),
                                    payable_date,
                                    currencyId,
                                    clientId: new_create_client_id
                                }
                            }
                        });
                        console.log("Payment Created");

                        next && next();
                    } catch (error) {
                        console.log(error);
                    }
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

                                {this.renderPaymentForm(
                                    isSubmitting,
                                    errors,
                                    values
                                )}
                            </div>
                            {/* <div
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
                                    CONFIRM & CONTINUE
                                </Button>
                            </div> */}
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
