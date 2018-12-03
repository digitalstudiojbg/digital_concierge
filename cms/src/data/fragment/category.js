import gql from "graphql-tag";

export const categoryDetailFragment = gql`
    fragment categoryDetail on TB_Category {
        id
        name
        has_directory
        active
        image
        tb_directory_type {
            id
            name
        }
        venues {
            id
            name
        }
        tb_directories {
            id
            name
        }
    }
`;
