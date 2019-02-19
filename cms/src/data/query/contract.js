import gql from "graphql-tag";

export const getContractByClientId = gql`
    query getContractByClientId($id: ID!) {
        contract(id: $id) {
            id
            number
            file
            file_key
            agreement_date
            renewal_date
            active
            client {
                activeLicense {
                    key
                    commence_date
                    expire_date
                    auto_renewal
                    active
                    licenseType {
                        id
                        name
                    }
                }
            }
        }
    }
`;
