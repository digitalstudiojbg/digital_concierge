"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "contents_contents",
            [
                {
                    parent_content_Id: 1,
                    child_content_Id: 2,
                    active: 1
                },
                {
                    parent_content_Id: 2,
                    child_content_Id: 3,
                    active: 1
                },
                {
                    parent_content_Id: 3,
                    child_content_Id: 5,
                    active: 1
                },
                {
                    parent_content_Id: 4,
                    child_content_Id: 6,
                    active: 1
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("contents_contents", null, {});
    }
};
