import gql from "graphql-tag";

export const globalSettingFragment = gql`
    fragment globalSettingDetail on Global_Setting {
        id
        name
    }
`;
