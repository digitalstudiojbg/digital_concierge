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
                    address: "Tassiriki Park, Port Vila, Vanuatu",
                    postal_address: "P.O BOX 495, WAIGANI, NCD, PNG",
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
                    address: "48-50 Charter Street, Ringwood VIC 3134",
                    postal_address: "PO BOX 726, Ringwood VIC 3134",
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
