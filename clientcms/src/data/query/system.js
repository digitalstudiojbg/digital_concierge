import gql from "graphql-tag";
import { themeDetailFragment } from "../fragment";

export const getSystemsFromUser = gql`
    query get_systems_by_user {
        systemsByUser {
            id
            name
            createdAt
            updatedAt
        }
    }
`;

export const getSystemsFromClient = gql`
    query get_systems_by_client($id: ID!) {
        systemsByClient(id: $id) {
            id
            name
            createdAt
            updatedAt
        }
    }
`;

export const getSystemThemesFromClient = gql`
    query get_system_themes_by_client($id: ID!) {
        systemsByClient(id: $id) {
            id
            name
            theme {
                ...themeDetail
            }
        }
    }
    ${themeDetailFragment}
`;

export const getSystemDetailSidebar = gql`
    query getSystemDetailSidebar($id: ID!) {
        system(id: $id) {
            id
            name
            client {
                id
                name
                avatar
            }
        }
    }
`;
