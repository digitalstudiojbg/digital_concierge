import gql from "graphql-tag";

export const CREATE_PAYMENT = () => {
    return gql`
        mutation createPayment($input: CreatePaymentInput) {
            createPayment(input: $input) {
                id
                invoice_number
                invoice_date
                invoice_amount
                payable_date
            }
        }
    `;
};
