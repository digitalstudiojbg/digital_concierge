"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "layouts",
            [
                {
                    name: "OPTION A",
                    mediumId: 46,
                    layoutFamilyId: 1,
                    layoutTypeId: 1
                },

                {
                    name: "OPTION B",
                    mediumId: 47,
                    layoutFamilyId: 1,
                    layoutTypeId: 1
                },
                {
                    name: "OPTION C",
                    mediumId: 48,
                    layoutFamilyId: 1,
                    layoutTypeId: 1
                },
                {
                    name: "OPTION A",
                    mediumId: 52,
                    layoutFamilyId: 1,
                    layoutTypeId: 2
                },

                {
                    name: "OPTION B",
                    mediumId: 53,
                    layoutFamilyId: 1,
                    layoutTypeId: 2
                },
                {
                    name: "OPTION C",
                    mediumId: 54,
                    layoutFamilyId: 1,
                    layoutTypeId: 2
                },
                {
                    name: "OPTION A",
                    mediumId: 58,
                    layoutFamilyId: 1,
                    layoutTypeId: 3
                },

                {
                    name: "OPTION B",
                    mediumId: 59,
                    layoutFamilyId: 1,
                    layoutTypeId: 3
                },
                {
                    name: "OPTION C",
                    mediumId: 60,
                    layoutFamilyId: 1,
                    layoutTypeId: 3
                },
                {
                    name: "OPTION A",
                    mediumId: 58,
                    layoutFamilyId: 1,
                    layoutTypeId: 4
                },

                {
                    name: "OPTION B",
                    mediumId: 59,
                    layoutFamilyId: 1,
                    layoutTypeId: 4
                },
                {
                    name: "OPTION C",
                    mediumId: 60,
                    layoutFamilyId: 1,
                    layoutTypeId: 4
                },
                {
                    name: "OPTION A",
                    mediumId: 46,
                    layoutFamilyId: 1,
                    layoutTypeId: 5
                },

                {
                    name: "OPTION B",
                    mediumId: 47,
                    layoutFamilyId: 1,
                    layoutTypeId: 5
                },
                {
                    name: "OPTION C",
                    mediumId: 48,
                    layoutFamilyId: 1,
                    layoutTypeId: 5
                },
                {
                    name: "OPTION A",
                    mediumId: 49,
                    layoutFamilyId: 2,
                    layoutTypeId: 1
                },

                {
                    name: "OPTION B",
                    mediumId: 50,
                    layoutFamilyId: 2,
                    layoutTypeId: 1
                },
                {
                    name: "OPTION C",
                    mediumId: 51,
                    layoutFamilyId: 2,
                    layoutTypeId: 1
                },
                {
                    name: "OPTION A",
                    mediumId: 55,
                    layoutFamilyId: 2,
                    layoutTypeId: 2
                },

                {
                    name: "OPTION B",
                    mediumId: 56,
                    layoutFamilyId: 2,
                    layoutTypeId: 2
                },
                {
                    name: "OPTION C",
                    mediumId: 57,
                    layoutFamilyId: 2,
                    layoutTypeId: 2
                },
                {
                    name: "OPTION A",
                    mediumId: 61,
                    layoutFamilyId: 2,
                    layoutTypeId: 3
                },

                {
                    name: "OPTION B",
                    mediumId: 62,
                    layoutFamilyId: 2,
                    layoutTypeId: 3
                },
                {
                    name: "OPTION C",
                    mediumId: 63,
                    layoutFamilyId: 2,
                    layoutTypeId: 3
                },
                {
                    name: "OPTION A",
                    mediumId: 61,
                    layoutFamilyId: 2,
                    layoutTypeId: 4
                },

                {
                    name: "OPTION B",
                    mediumId: 62,
                    layoutFamilyId: 2,
                    layoutTypeId: 4
                },
                {
                    name: "OPTION C",
                    mediumId: 63,
                    layoutFamilyId: 2,
                    layoutTypeId: 4
                },
                {
                    name: "OPTION A",
                    mediumId: 49,
                    layoutFamilyId: 2,
                    layoutTypeId: 5
                },

                {
                    name: "OPTION B",
                    mediumId: 50,
                    layoutFamilyId: 2,
                    layoutTypeId: 5
                },
                {
                    name: "OPTION C",
                    mediumId: 51,
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
