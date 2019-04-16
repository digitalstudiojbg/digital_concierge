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

export const getSystemDetail = gql`
    query getSystemDetail($id: ID!) {
        system(id: $id) {
            id
            name
            aif
            numberOfDevices
            createdAt
            updatedAt
            client {
                id
                name
                full_company_name
                phone
                email
                active
                number_of_users
                avatar
                contacts {
                    id
                    name
                    title
                    phone
                    mobile
                    email
                }
                palettes {
                    id
                    name
                    colours
                }
            }
            layouts {
                id
                name
            }
            start {
                id
                name
            }
            home {
                id
                name
            }
            device_type {
                id
                name
            }
            system_type {
                id
                name
            }
            features {
                id
                name
            }
            theme {
                ...themeDetail
            }
        }
    }
    ${themeDetailFragment}
`;

export const getSystemThemeAndPalettes = gql`
    query getSystemTheme($id: ID!) {
        system(id: $id) {
            id
            theme {
                ...themeDetail
            }
            client {
                id
                palettes {
                    id
                    name
                    colours
                }
            }
        }
    }
    ${themeDetailFragment}
`;
