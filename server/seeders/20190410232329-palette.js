"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "palettes",
            [
                {
                    name: "SCHEME 1",
                    colour1Hex: "#008466",
                    colour1Alpha: 100,
                    colour2Hex: "#566567",
                    colour2Alpha: 100,
                    colour3Hex: "#999999",
                    colour3Alpha: 100,
                    colour4Hex: "#000000",
                    colour4Alpha: 100,
                    colour5Hex: "#000000",
                    colour5Alpha: 100,
                    clientId: 1
                },
                {
                    name: "SCHEME 2",
                    colour1Hex: "#008466",
                    colour1Alpha: 100,
                    colour2Hex: "#566567",
                    colour2Alpha: 100,
                    colour3Hex: "#999999",
                    colour3Alpha: 100,
                    colour4Hex: "#000000",
                    colour4Alpha: 100,
                    colour5Hex: "#000000",
                    colour5Alpha: 100,
                    clientId: 2
                }
            ],
            {}
        );
    },

    down: queryInterface => {
        return queryInterface.bulkDelete("features", null, {});
    }
};
