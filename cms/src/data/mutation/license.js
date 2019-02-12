import gql from "graphql-tag";

export const CREATE_LICENSE = () => {
    return gql`
        mutation createLicense($input: CreateLicenseInput) {
            createLicense(input: $input) {
                id
                key
                commence_date
                expire_date
                auto_renewal
                active
                licenseType {
                    name
                }
            }
        }
    `;
};
