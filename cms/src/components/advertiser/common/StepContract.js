import React from "react";

import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import {
    OutlinedInput,
    MenuItem,
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
import {
    createContractSchema,
    editContractSchema
} from "./StepContractValidationSchema";

import {
    ContainerDiv,
    SectionDiv,
    SectionHeader,
    FormLabelDiv,
    ContinueButton,
    FieldLabel,
    FieldContainerDiv,
    SubSectionDiv,
    SectionDivModified,
    SectionTitleDiv
} from "./commonStyle";

const styles = () => ({
    myInput: {
        padding: "12px 10px",
        backgroundColor: "white"
    }
});
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
        name: "currencyId",
        label: "Currency",
        required: true,
        type: "select"
    },
    {
        name: "invoice_amount",
        label: "Invoice Amount",
        required: true,
        type: "number",
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
                    "expire_date",
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
                    "expire_date",
                    dayjs(date)
                        .add(values.period_month, "month")
                        .toDate()
                );
        }
    },
    {
        name: "expire_date",
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
            fetchPolicy="network-only"
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

const StepContract = ({
    onRef,
    currencyList,
    advertiser,
    has_data,
    next,
    action
}) => {
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

        if (type === "text" || type === "number") {
            return (
                <div style={{ width: "100%" }}>
                    <FieldLabel>{label}</FieldLabel>

                    <Field
                        name={name}
                        required={required}
                        type={type}
                        component={TextField}
                        variant="outlined"
                        fullWidth={true}
                        inputProps={{
                            style: {
                                padding: "12px 10px",
                                backgroundColor: "white"
                            }
                        }}
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
                    <FieldLabel>{label}</FieldLabel>
                    <Select
                        style={{
                            height: 43,
                            backgroundColor: "white"
                        }}
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
                    <FieldLabel>{label}</FieldLabel>
                    <DatePicker
                        inputProps={{
                            style: {
                                padding: "12px 10px",
                                backgroundColor: "white"
                            }
                        }}
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

    const { active_advertising, id: advertiserId } = advertiser;
    const agreement_key_file_array =
        Boolean(active_advertising) &&
        Boolean(active_advertising.agreement_file_key)
            ? active_advertising.agreement_file_key.split("/")
            : [];
    const initialValues = has_data
        ? {
              advertising_id: active_advertising.id,
              agreement_number: active_advertising.agreement_number,
              agreement_date: active_advertising.agreement_date,
              agreement_file: active_advertising.agreement_file,
              agreement_filename:
                  agreement_key_file_array[agreement_key_file_array.length - 1],
              payment_id: Boolean(active_advertising.payment)
                  ? active_advertising.payment.id
                  : null,
              invoice_number:
                  Boolean(active_advertising.payment) &&
                  Boolean(active_advertising.payment.invoice_number)
                      ? active_advertising.payment.invoice_number
                      : "",
              invoice_date:
                  Boolean(active_advertising.payment) &&
                  Boolean(active_advertising.payment.invoice_date)
                      ? active_advertising.payment.invoice_date
                      : "",
              currencyId:
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
              expire_date: active_advertising.expire_date
          }
        : {
              advertising_id: null,
              agreement_number: "",
              agreement_date: null,
              agreement_file: null,
              agreement_filename: null,
              payment_id: null,
              invoice_number: "",
              invoice_date: null,
              currencyId:
                  Array.isArray(currencyList) && currencyList.length === 1
                      ? currencyList[0].id
                      : null,
              invoice_amount: "",
              payable_date: null,
              period_month: null,
              commence_date: null,
              expire_date: null
          };

    let documentRef = React.createRef();
    const currencyIds = currencyList.map(({ id }) => id);
    return (
        <Formik
            ref={onRef}
            initialValues={initialValues}
            validationSchema={
                has_data
                    ? editContractSchema(currencyIds)
                    : createContractSchema(currencyIds)
            }
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                console.log(documentRef);
                const {
                    advertising_id,
                    agreement_number,
                    agreement_date,
                    payment_id,
                    invoice_number,
                    invoice_date,
                    currencyId,
                    invoice_amount,
                    payable_date,
                    period_month,
                    commence_date,
                    expire_date
                } = values;

                const toSubmit = {
                    ...(has_data && { id: advertising_id }),
                    agreement_number,
                    agreement_date,
                    ...(documentRef.state.file && {
                        agreement_file: documentRef.state.file
                    }),
                    ...(has_data && payment_id && { payment_id }),
                    payment: {
                        invoice_number,
                        invoice_date,
                        currencyId,
                        invoice_amount,
                        payable_date
                    },
                    period_month,
                    commence_date,
                    expire_date,
                    ...(!has_data && { advertiserId })
                };

                console.log("To submit ", toSubmit);
                action({ variables: { input: toSubmit } }).then(({ data }) => {
                    console.log("data received ", data);
                    setSubmitting(false);
                    next();
                });
            }}
        >
            {({ values, errors, isSubmitting, setFieldValue }) => {
                const currency = Boolean(values.currencyId)
                    ? currencyList.find(({ id }) => id === values.currencyId)
                    : null;
                const currencyCode = Boolean(currency) ? currency.code : null;
                return (
                    <Form>
                        <ContainerDiv style={{ paddingTop: "30px" }}>
                            <SectionDiv
                                flexBasis="33%"
                                flexDirection="column"
                                style={{
                                    padding: "0 6%",
                                    borderRight: "1px solid #DDDDDD"
                                }}
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
                                        label="UPLOAD AGREEMENT"
                                    />
                                </FieldContainerDiv>
                            </SectionDiv>
                            <SectionDiv
                                flexBasis="33%"
                                flexDirection="column"
                                style={{
                                    padding: "0 6%",
                                    borderRight: "1px solid #DDDDDD"
                                }}
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
                            </SectionDiv>
                            <SectionDiv
                                flexBasis="33%"
                                flexDirection="column"
                                style={{
                                    padding: "0 6%"
                                }}
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
                                    <ContinueButton
                                        type="submit"
                                        width="50%"
                                        disabled={isSubmitting}
                                    >
                                        Confirm & Continue
                                    </ContinueButton>
                                </div>
                            </SectionDiv>
                        </ContainerDiv>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default StepContractHOC;
