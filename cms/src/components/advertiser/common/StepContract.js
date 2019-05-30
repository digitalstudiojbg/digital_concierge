import React from "react";
import {
    ContainerDiv,
    SectionDiv,
    SectionTitleDiv,
    FormLabelDiv
} from "./commonStyle";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-material-ui";
import { OutlinedInput, MenuItem, Button } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { isEmpty } from "lodash";
import { Query } from "react-apollo";
import { getAdvertiserCurrencyList } from "../../../data/query";
import Loading from "../../loading/Loading";

const ContainerDivModified = styled(ContainerDiv)`
    padding-left: 20px;
    padding-right: 20px;
`;

const SectionDivModified = styled(SectionDiv)`
    border-left: ${props =>
        props.withBorderLeft ? "1px solid #DDDDDD" : "none"};
    border-right: ${props =>
        props.withBorderRight ? "1px solid #DDDDDD" : "none"};
    padding-left: ${props => props.paddingLeft};
`;

const FieldContainerDiv = styled.div`
    width: 100%;
    margin-bottom: 20px;
`;

const AGREEMENT_FIELDS = [
    {
        name: "agreement_number",
        label: "Agreement Number",
        required: true,
        type: "text"
    },
    {
        name: "agreement_date",
        label: "Agreement Date",
        required: true,
        type: "date",
        disablePast: true,
        disableFuture: false,
        views: ["year", "month", "date"]
    }
];

const PAYMENT_FIELDS = [
    {
        name: "invoice_number",
        label: "Invoice Number",
        required: true,
        type: "text"
    },
    {
        name: "invoice_date",
        label: "Invoice Date",
        required: true,
        type: "date",
        disablePast: false,
        disableFuture: false,
        views: ["year", "month", "date"]
    },
    {
        name: "invoice_amount",
        label: "Invoice Amount",
        required: true,
        type: "text"
    },
    {
        name: "currency_id",
        label: "Currency",
        required: true,
        type: "select"
    },
    {
        name: "payable_date",
        label: "Payable Date",
        required: true,
        type: "date",
        disablePast: true,
        disableFuture: false,
        views: ["year", "month", "date"]
    }
];

const StepContractHOC = props => {
    return (
        <Query
            query={getAdvertiserCurrencyList}
            variables={{ id: props.advertiserId }}
        >
            {({
                loading,
                error,
                data: { advertiserCurrencyList: currencyList }
            }) => {
                if (loading) return <Loading loadingData />;
                if (error)
                    return (
                        <React.Fragment>Error! ${error.message}</React.Fragment>
                    );
                return <StepContract currencyList={currencyList} {...props} />;
            }}
        </Query>
    );
};

const StepContract = ({ onRef, currencyList }) => {
    const renderField = (
        { name, label, required, type, disablePast, disableFuture, views },
        values,
        errors,
        setFieldValue,
        optionValues = []
    ) => {
        if (type === "text") {
            return (
                <div style={{ width: "100%" }}>
                    <FormLabelDiv>{label}</FormLabelDiv>
                    <Field
                        name={name}
                        required={required}
                        type="text"
                        component={TextField}
                        variant="outlined"
                        fullWidth={true}
                    />
                </div>
            );
        } else if (type === "select") {
            return (
                <div style={{ width: "100%" }}>
                    <FormLabelDiv>{label}</FormLabelDiv>
                    <Field
                        name={name}
                        component={Select}
                        disabled={optionValues.length < 1}
                        fullWidth={true}
                        input={
                            <OutlinedInput
                                labelWidth={0}
                                name={name}
                                error={!isEmpty(errors) && errors[name]}
                            />
                        }
                    >
                        {optionValues.map(({ id, name }, index) => (
                            <MenuItem
                                key={`ITEM-${name}-${id}-${index}`}
                                value={id}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Field>
                </div>
            );
        } else if (type === "date") {
            return (
                <div style={{ width: "100%" }}>
                    <FormLabelDiv>{label}</FormLabelDiv>
                    <DatePicker
                        name={name}
                        disableFuture={disableFuture}
                        disablePast={disablePast}
                        format="dd/MM/yyyy"
                        required={required}
                        views={views}
                        value={values[name]}
                        onChange={date => setFieldValue(name, date)}
                        clearable
                        inputVariant="outlined"
                        fullWidth
                    />
                </div>
            );
        } else {
            return <React.Fragment />;
        }
    };

    return (
        <Formik ref={onRef}>
            {({ values, errors, isSubmitting, setFieldValue }) => {
                return (
                    <Form>
                        <ContainerDivModified>
                            <SectionDivModified
                                flexBasis="33%"
                                paddingRight="20px"
                                paddingLeft="20px"
                                flexDirection="column"
                            >
                                <SectionTitleDiv>Agreement</SectionTitleDiv>
                                {AGREEMENT_FIELDS.map(
                                    (item, agreementIndex) => (
                                        <FieldContainerDiv
                                            key={`AGREEMENT-FIELD-${agreementIndex}`}
                                        >
                                            {renderField(
                                                item,
                                                values,
                                                errors,
                                                setFieldValue
                                            )}
                                        </FieldContainerDiv>
                                    )
                                )}
                            </SectionDivModified>
                            <SectionDivModified
                                flexBasis="33%"
                                withBorderLeft={true}
                                withBorderRight={true}
                                paddingRight="20px"
                                paddingLeft="20px"
                                flexDirection="column"
                            >
                                <SectionTitleDiv>Payment</SectionTitleDiv>
                                {PAYMENT_FIELDS.map((item, paymentIndex) => (
                                    <FieldContainerDiv
                                        key={`PAYMENT-FIELD-${paymentIndex}`}
                                    >
                                        {renderField(
                                            item,
                                            values,
                                            errors,
                                            setFieldValue,
                                            item.type === "select"
                                                ? currencyList
                                                : []
                                        )}
                                    </FieldContainerDiv>
                                ))}
                            </SectionDivModified>
                            <SectionDivModified
                                flexBasis="33%"
                                paddingRight="20px"
                                paddingLeft="20px"
                                flexDirection="column"
                            >
                                <SectionTitleDiv>
                                    Display Period
                                </SectionTitleDiv>
                            </SectionDivModified>
                        </ContainerDivModified>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default StepContractHOC;
