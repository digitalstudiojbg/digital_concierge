"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "tb_landing_pages",
            [
                {
                    header_logo: "JBG_header_logo",
                    header_text: "JBG_header_text",
                    body_image: "JBG_body_image",
                    button: "button",
                    bg_color: "JBG_bg_color",
                    tbDirectoryTypeId: "5",
                    venueId: "1"
                },
                {
                    header_logo: "HI_header_logo",
                    header_text: "HI_header_text",
                    body_image: "HI_body_image",
                    button: "button",
                    bg_color: "HI_bg_color",
                    tbDirectoryTypeId: "5",
                    venueId: "2"
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("tb_landing_pages", null, {});
    }
};
