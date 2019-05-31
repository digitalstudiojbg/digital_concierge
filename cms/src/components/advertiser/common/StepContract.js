import React from "react";
import {
    ContainerDiv,
    SectionDiv,
    SectionTitleDiv,
    FormLabelDiv,
    ContinueButton
} from "./commonStyle";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import {
    OutlinedInput,
    MenuItem,
    Button,
    Select,
    InputAdornment
} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { isEmpty } from "lodash";
import { Query, Mutation } from "react-apollo";
import { getAdvertiserCurrencyList } from "../../../data/query";
import Loading from "../../loading/Loading";
import {
    getAdvertiserDetail,
    getAdvertiserFromPublication
} from "../../../data/query/advertiser";
import { generatePeriodMonthList } from "../../../utils/Constants";
import dayjs from "dayjs";
import SimpleDocumentUploader from "../../../utils/SimpleDocumentUploader";
import { CREATE_ADVERTISING, EDIT_ADVERTISING } from "../../../data/mutation";

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
        type: "text",
        adornmentPosition: "end"
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
                date &&
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
                            Error! {errorAdvertiser.message}
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
                                        Error! {error.message}
                                    </React.Fragment>
                                );

                            const has_data =
                                Boolean(advertiser) &&
                                Boolean(advertiser.active_advertising);

                            const pubId = advertiser.just_brilliant_guide.id;
                            return (
                                <Mutation
                                    mutation={
                                        has_data
                                            ? EDIT_ADVERTISING
                                            : CREATE_ADVERTISING
                                    }
                                    refetchQueries={[
                                        {
                                            query: getAdvertiserFromPublication,
                                            variables: { id: pubId }
                                        }
                                    ]}
                                >
                                    {(
                                        action,
                                        {
                                            loading: loadingMutation,
                                            error: errorMutation
                                        }
                                    ) => {
                                        if (loadingMutation)
                                            return <Loading loadingData />;
                                        if (errorMutation)
                                            return (
                                                <React.Fragment>
                                                    Error!{" "}
                                                    {errorMutation.message}
                                                </React.Fragment>
                                            );
                                        return (
                                            <StepContract
                                                currencyList={currencyList}
                                                {...props}
                                                advertiser={advertiser}
                                                has_data={has_data}
                                                action={action}
                                            />
                                        );
                                    }}
                                </Mutation>
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
            customOnChange,
            adornmentPosition
        },
        values,
        errors,
        setFieldValue,
        optionValues = [],
        inputAdornmentText = null
    ) => {
        const handleDateChange = data => {
            const { $d: date = null } = data || {};
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
                        InputProps={{
                            ...(adornmentPosition === "end" && {
                                endAdornment: Boolean(inputAdornmentText) ? (
                                    <InputAdornment position="end">
                                        {inputAdornmentText}
                                    </InputAdornment>
                                ) : null
                            }),
                            ...(adornmentPosition === "start" && {
                                startAdornment: Boolean(inputAdornmentText) ? (
                                    <InputAdornment position="start">
                                        {inputAdornmentText}
                                    </InputAdornment>
                                ) : null
                            })
                        }}
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
                        value={values[name]}
                        onChange={handleDateChange}
                        clearable
                        autoOk
                        inputVariant="outlined"
                        fullWidth
                    />
                </div>
            );
        } else {
            return <React.Fragment />;
        }
    };

    const { active_advertising } = advertiser;
    const agreement_key_file_array =
        Boolean(active_advertising) &&
        Boolean(active_advertising.agreement_file_key)
            ? active_advertising.agreement_file_key.split("/")
            : [];
    const initialValues = has_data
        ? {
              agreement_number: active_advertising.agreement_number,
              agreement_date: active_advertising.agreement_date,
              agreement_file: active_advertising.agreement_file,
              agreement_filename:
                  agreement_key_file_array[agreement_key_file_array.length - 1],
              invoice_number:
                  Boolean(active_advertising.payment) &&
                  Boolean(active_advertising.payment.invoice_number)
                      ? active_advertising.payment.invoice_number
                      : "",
              currency_id:
                  Boolean(active_advertising.payment) &&
                  Boolean(active_advertising.payment.currency)
                      ? active_advertising.payment.currency.id
                      : null,
              invoice_amount:
                  Boolean(active_advertising.payment) &&
                  Boolean(active_advertising.payment.invoice_amount)
                      ? active_advertising.payment.invoice_amount
                      : "",
              payable_date:
                  Boolean(active_advertising.payment) &&
                  Boolean(active_advertising.payment.payable_date)
                      ? active_advertising.payment.payable_date
                      : null,
              period_month: active_advertising.period_month,
              commence_date: active_advertising.commence_date,
              expiry_date: active_advertising.expiry_date
          }
        : {
              agreement_number: "",
              agreement_date: null,
              agreement_file: null,
              agreement_filename: null,
              invoice_number: "",
              invoice_date: null,
              currency_id:
                  Array.isArray(currencyList) && currencyList.length === 1
                      ? currencyList[0].id
                      : null,
              invoice_amount: "",
              payable_date: null,
              period_month: null,
              commence_date: null,
              expiry_date: null
          };

    let documentRef = React.createRef();
    return (
        <Formik ref={onRef} initialValues={initialValues}>
            {({ values, errors, isSubmitting, setFieldValue }) => {
                const currency = Boolean(values.currency_id)
                    ? currencyList.find(({ id }) => id === values.currency_id)
                    : null;
                const currencyCode = Boolean(currency) ? currency.code : null;
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
                                <FieldContainerDiv>
                                    <SimpleDocumentUploader
                                        onRef={ref => (documentRef = ref)}
                                        {...Boolean(values.agreement_file) && {
                                            previewUrl: values.agreement_file
                                        }}
                                        {...Boolean(
                                            values.agreement_filename
                                        ) && {
                                            previewName:
                                                values.agreement_filename
                                        }}
                                        label="Upload Agreement"
                                    />
                                </FieldContainerDiv>
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
                                                : [],
                                            item.name === "invoice_amount"
                                                ? currencyCode
                                                : null
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
                                <div
                                    style={{
                                        width: "100%",
                                        flex: 1,
                                        display: "flex",
                                        flexDirection: "row-reverse",
                                        alignItems: "flex-end"
                                    }}
                                >
                                    <ContinueButton type="submit" width="50%">
                                        Confirm & Continue
                                    </ContinueButton>
                                </div>
                            </SectionDivModified>
                        </ContainerDivModified>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default StepContractHOC;
