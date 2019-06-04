import * as Yup from "yup";

const requiredErrorMessage = "Required";

export const createContractSchema = currencyList =>
    Yup.object().shape({
        agreement_number: Yup.string().required(requiredErrorMessage),
        agreement_date: Yup.date().required(requiredErrorMessage),
        period_month: Yup.number()
            .integer()
            .required(requiredErrorMessage),
        commence_date: Yup.date().required(requiredErrorMessage),
        expire_date: Yup.date().required(requiredErrorMessage),
        invoice_number: Yup.string().required(requiredErrorMessage),
        invoice_date: Yup.date().required(requiredErrorMessage),
        currencyId: Yup.string()
            .oneOf(currencyList)
            .required(requiredErrorMessage),
        invoice_amount: Yup.number()
            .min(1)
            .required(requiredErrorMessage),
        payable_date: Yup.date().required(requiredErrorMessage)
    });

export const editContractSchema = currencyList =>
    Yup.object().shape({
        advertising_id: Yup.string().required(requiredErrorMessage),
        agreement_number: Yup.string().required(requiredErrorMessage),
        agreement_date: Yup.date().required(requiredErrorMessage),
        period_month: Yup.number()
            .integer()
            .required(requiredErrorMessage),
        commence_date: Yup.date().required(requiredErrorMessage),
        expire_date: Yup.date().required(requiredErrorMessage),
        payment_id: Yup.string().required(requiredErrorMessage),
        invoice_number: Yup.string().required(requiredErrorMessage),
        invoice_date: Yup.date().required(requiredErrorMessage),
        currencyId: Yup.string()
            .oneOf(currencyList)
            .required(requiredErrorMessage),
        invoice_amount: Yup.number()
            .min(1)
            .required(requiredErrorMessage),
        payable_date: Yup.date().required(requiredErrorMessage)
    });
