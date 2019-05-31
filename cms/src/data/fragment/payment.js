import gql from "graphql-tag";

export const paymentDetailFragment = gql`
    fragment paymentDetail on Payment {
        id
        invoice_number
        invoice_date
        invoice_amount
        payable_date
        createdAt
        updatedAt
        currency {
            id
            name
        }
    }
`;
