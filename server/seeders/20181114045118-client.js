"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "clients",
            [
                {
                    name: "HOLIDAY INN RESORT VANUATU",
                    full_company_name: "IHG HOTELS",
                    nature_of_business: "HOTEL",
                    venue_address: "Tassiriki Park",
                    venue_city: "Port Vila",
                    venue_zip_code: "P.O BOX 495",
                    postal_address: " WAIGANI, NCD, PNG",
                    postal_city: " WAIGANI",
                    postal_zip_code: "P.O BOX 495",
                    venueStateId: 14,
                    postalStateId: 14,
                    phone: "+678 22040",
                    email: "reservations.vanuatu@ihg.com",
                    number_of_users: 5,
                    avatar:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/Holiday_Inn_Logo.png"
                },
                {
                    name: "JOHN BATMAN GROUP",
                    full_company_name: "BINDERS COMPENDIUM PTY LTD",
                    nature_of_business: "HOSPITALITY SUPPLIER",
                    venue_address: "48-50 Charter Street",
                    venue_city: "Ringwood",
                    venue_zip_code: "3134",
                    postal_address: "48-50 Charter Street",
                    postal_city: "Ringwood",
                    postal_zip_code: "3134",
                    venueStateId: 7,
                    postalStateId: 7,
                    phone: "+61 9879 8588",
                    email: "info@johnbatman.com.au",
                    number_of_users: 5,
                    avatar:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/jbg_logo.png"
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("clients", null, {});
    }
};
