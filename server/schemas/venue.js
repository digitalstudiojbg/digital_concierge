import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        venue(id: ID!): Venue
        venues: [Venue]
    }

    type Venue {
        id: ID!
        name: String
        number_of_users: Int
        logo: String
        has_parent_category: Boolean
        has_tablet: Boolean
        has_touchscreen: Boolean
        active: Boolean
        createdAt: DateTime
        updatedAt: DateTime
        users: [User]
        roles: [Role]
        tb_categories: [TB_Category]
        tb_landing_page: [TB_LANDING_PAGE]
        global_setting: [Global_Setting]
    }
`;
