"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "layouts",
            [
                {
                    name: "OPTION A",
                    mediumId: 1,
                    layoutFamilyId: 1,
                    layoutTypeId: 1
                },

                {
                    name: "OPTION B",
                    mediumId: 1,
                    layoutFamilyId: 1,
                    layoutTypeId: 1
                },
                {
                    name: "OPTION C",
                    mediumId: 1,
                    layoutFamilyId: 1,
                    layoutTypeId: 1
                },
                {
                    name: "OPTION A",
                    mediumId: 1,
                    layoutFamilyId: 1,
                    layoutTypeId: 2
                },

                {
                    name: "OPTION B",
                    mediumId: 1,
                    layoutFamilyId: 1,
                    layoutTypeId: 2
                },
                {
                    name: "OPTION C",
                    mediumId: 1,
                    layoutFamilyId: 1,
                    layoutTypeId: 2
                },
                {
                    name: "OPTION A",
                    mediumId: 1,
                    layoutFamilyId: 1,
                    layoutTypeId: 3
                },

                {
                    name: "OPTION B",
                    mediumId: 1,
                    layoutFamilyId: 1,
                    layoutTypeId: 3
                },
                {
                    name: "OPTION C",
                    mediumId: 1,
                    layoutFamilyId: 1,
                    layoutTypeId: 3
                },
                {
                    name: "OPTION A",
                    mediumId: 1,
                    layoutFamilyId: 1,
                    layoutTypeId: 4
                },

                {
                    name: "OPTION B",
                    mediumId: 1,
                    layoutFamilyId: 1,
                    layoutTypeId: 4
                },
                {
                    name: "OPTION C",
                    mediumId: 1,
                    layoutFamilyId: 1,
                    layoutTypeId: 4
                },
                {
                    name: "OPTION A",
                    mediumId: 1,
                    layoutFamilyId: 1,
                    layoutTypeId: 5
                },

                {
                    name: "OPTION B",
                    mediumId: 1,
                    layoutFamilyId: 1,
                    layoutTypeId: 5
                },
                {
                    name: "OPTION C",
                    mediumId: 1,
                    layoutFamilyId: 1,
                    layoutTypeId: 5
                },
                {
                    name: "OPTION A",
                    mediumId: 1,
                    layoutFamilyId: 2,
                    layoutTypeId: 1
                },

                {
                    name: "OPTION B",
                    mediumId: 1,
                    layoutFamilyId: 2,
                    layoutTypeId: 1
                },
                {
                    name: "OPTION C",
                    mediumId: 1,
                    layoutFamilyId: 2,
                    layoutTypeId: 1
                },
                {
                    name: "OPTION A",
                    mediumId: 1,
                    layoutFamilyId: 2,
                    layoutTypeId: 2
                },

                {
                    name: "OPTION B",
                    mediumId: 1,
                    layoutFamilyId: 2,
                    layoutTypeId: 2
                },
                {
                    name: "OPTION C",
                    mediumId: 1,
                    layoutFamilyId: 2,
                    layoutTypeId: 2
                },
                {
                    name: "OPTION A",
                    mediumId: 1,
                    layoutFamilyId: 2,
                    layoutTypeId: 3
                },

                {
                    name: "OPTION B",
                    mediumId: 1,
                    layoutFamilyId: 2,
                    layoutTypeId: 3
                },
                {
                    name: "OPTION C",
                    mediumId: 1,
                    layoutFamilyId: 2,
                    layoutTypeId: 3
                },
                {
                    name: "OPTION A",
                    mediumId: 1,
                    layoutFamilyId: 2,
                    layoutTypeId: 4
                },

                {
                    name: "OPTION B",
                    mediumId: 1,
                    layoutFamilyId: 2,
                    layoutTypeId: 4
                },
                {
                    name: "OPTION C",
                    mediumId: 1,
                    layoutFamilyId: 2,
                    layoutTypeId: 4
                },
                {
                    name: "OPTION A",
                    mediumId: 1,
                    layoutFamilyId: 2,
                    layoutTypeId: 5
                },

                {
                    name: "OPTION B",
                    mediumId: 1,
                    layoutFamilyId: 2,
                    layoutTypeId: 5
                },
                {
                    name: "OPTION C",
                    mediumId: 1,
                    layoutFamilyId: 2,
                    layoutTypeId: 5
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("layouts", null, {});
    }
};
