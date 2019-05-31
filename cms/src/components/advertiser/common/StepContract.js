import React from "react";
import {
    ContainerDiv,
    SectionDiv,
    SectionTitleDiv,
    FormLabelDiv
} from "./commonStyle";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { OutlinedInput, MenuItem, Button, Select } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { isEmpty } from "lodash";
import { Query } from "react-apollo";
import { getAdvertiserCurrencyList } from "../../../data/query";
import Loading from "../../loading/Loading";
import { getAdvertiserDetail } from "../../../data/query/advertiser";
import { generatePeriodMonthList } from "../../../utils/Constants";
import dayjs from "dayjs";

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
        disablePast: false,
        disableFuture: false,
        views: ["year", "month", "date"],
        openTo: "year",
        customOnChange: null
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
        views: ["year", "month", "date"],
        openTo: "year",
        customOnChange: null
    },
    {
        name: "currency_id",
        label: "Currency",
        required: true,
        type: "select"
    },
    {
        name: "invoice_amount",
        label: "Invoice Amount",
        required: true,
        type: "text"
    },
    {
        name: "payable_date",
        label: "Payable Date",
        required: true,
        type: "date",
        disablePast: false,
        disableFuture: false,
        views: ["year", "month", "date"],
        openTo: "year",
        customOnChange: null
    }
];

const DISPLAY_FIELDS = [
    {
        name: "period_month",
        label: "Period",
        required: true,
        type: "select",
        customOnChange: (value, setFieldValue, values) => {
            setFieldValue("period_month", value);
            Boolean(values.commence_date) &&
                setFieldValue(
                    "expiry_date",
                    dayjs(values.commence_date)
                        .add(value, "month")
                        .toDate()
                );
        }
    },
    {
        name: "commence_date",
        label: "Commence Date",
        required: true,
        type: "date",
        disablePast: false,
        disableFuture: false,
        views: ["year", "month", "date"],
        openTo: "year",
        customOnChange: (date, setFieldValue, values) => {
            setFieldValue("commence_date", date);
            Boolean(values.period_month) &&
                setFieldValue(
                    "expiry_date",
                    dayjs(date)
                        .add(values.period_month, "month")
                        .toDate()
                );
        }
    },
    {
        name: "expiry_date",
        label: "Expiry Date",
        required: true,
        type: "date",
        disablePast: false,
        disableFuture: false,
        views: ["year", "month", "date"],
        openTo: "year",
        customOnChange: null
    }
];

const StepContractHOC = props => {
    return (
        <Query
            query={getAdvertiserDetail}
            variables={{ id: props.advertiserId }}
        >
            {({
                loading: loadingAdvertiser,
                error: errorAdvertiser,
                data: { advertiser }
            }) => {
                if (loadingAdvertiser) return <Loading loadingData />;
                if (errorAdvertiser)
                    return (
                        <React.Fragment>
                            Error! ${errorAdvertiser.message}
                        </React.Fragment>
                    );
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
                                    <React.Fragment>
                                        Error! ${error.message}
                                    </React.Fragment>
                                );
                            return (
                                <StepContract
                                    currencyList={currencyList}
                                    {...props}
                                    advertiser={advertiser}
                                    has_data={
                                        Boolean(advertiser) &&
                                        Boolean(advertiser.active_advertising)
                                    }
                                />
                            );
                        }}
                    </Query>
                );
            }}
        </Query>
    );
};

const StepContract = ({ onRef, currencyList, advertiser, has_data }) => {
    const renderField = (
        {
            name,
            label,
            required,
            type,
            disablePast,
            disableFuture,
            views,
            openTo,
            customOnChange
        },
        values,
        errors,
        setFieldValue,
        optionValues = []
    ) => {
        const handleDateChange = ({ $d: date }) => {
            if (Boolean(customOnChange)) {
                return customOnChange(date, setFieldValue, values);
            } else {
                return setFieldValue(name, date);
            }
        };

        const handleSelectChange = event => {
            if (Boolean(customOnChange)) {
                return customOnChange(
                    event.target.value,
                    setFieldValue,
                    values
                );
            } else {
                return setFieldValue(name, event.target.value);
            }
        };

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
                    <Select
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
                        onChange={handleSelectChange}
                        value={values[name]}
                    >
                        {optionValues.map(({ id, name }, index) => (
                            <MenuItem
                                key={`ITEM-${name}-${id}-${index}`}
                                value={id}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
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
                        format="DD MMMM YYYY"
                        required={required}
                        openTo={openTo}
                        views={views}
                        {...Boolean(values[name]) && { value: values[name] }}
                        onChange={handleDateChange}
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

    const { active_agreement } = advertiser;
    const initialValues = has_data
        ? {
              agreement_number: active_agreement.agreement_number,
              agreement_date: active_agreement.agreement_date,
              agreement_file: active_agreement.agreement_file,
              invoice_number: active_agreement.payment.invoice_number,
              currency_id: active_agreement.payment.currency,
              invoice_amount: active_agreement.payment.invoice_amount,
              payable: active_agreement.payment.payable_date,
              period_month: active_agreement.period_month,
              commence_date: active_agreement.commence_date,
              expiry_date: active_agreement.expiry_date
          }
        : {
              agreement_number: "",
              agreement_date: "",
              agreement_file: null,
              invoice_number: "",
              invoice_date: "",
              currency_id: null,
              invoice_amount: "",
              payable_date: "",
              period_month: null,
              commence_date: "",
              expiry_date: ""
          };

    return (
        <Formik ref={onRef} initialValues={initialValues}>
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
                                {DISPLAY_FIELDS.map((item, displayIndex) => (
                                    <FieldContainerDiv
                                        key={`DISPLAY-FIELD-${displayIndex}`}
                                    >
                                        {renderField(
                                            item,
                                            values,
                                            errors,
                                            setFieldValue,
                                            item.type === "select"
                                                ? generatePeriodMonthList(24)
                                                : []
                                        )}
                                    </FieldContainerDiv>
                                ))}
                            </SectionDivModified>
                        </ContainerDivModified>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default StepContractHOC;
