"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "just_brilliant_guides",
            [
                {
                    name: "VANUATU",
                    welcomeFamilyId: 1,
                    featureFamilyId: 1,
                    informationFamilyId: 1,
                    mapFamilyId: 1,
                    galleryFamilyId: 1,
                    marketFamilyId: 1,
                    foodFamilyId: 1,
                    attractionFamilyId: 1,
                    eventFamilyId: 1,
                    essentialFamilyId: 1
                },
                {
                    name: "MILDURA",
                    welcomeFamilyId: 1,
                    featureFamilyId: 1,
                    informationFamilyId: 1,
                    mapFamilyId: 1,
                    galleryFamilyId: 1,
                    marketFamilyId: 1,
                    foodFamilyId: 1,
                    attractionFamilyId: 1,
                    eventFamilyId: 1,
                    essentialFamilyId: 1
                },
                {
                    name: "BASS COAST",
                    welcomeFamilyId: 1,
                    featureFamilyId: 1,
                    informationFamilyId: 1,
                    mapFamilyId: 1,
                    galleryFamilyId: 1,
                    marketFamilyId: 1,
                    foodFamilyId: 1,
                    attractionFamilyId: 1,
                    eventFamilyId: 1,
                    essentialFamilyId: 1
                },
                {
                    name: "PORT AUGUSTA",
                    welcomeFamilyId: 1,
                    featureFamilyId: 1,
                    informationFamilyId: 1,
                    mapFamilyId: 1,
                    galleryFamilyId: 1,
                    marketFamilyId: 1,
                    foodFamilyId: 1,
                    attractionFamilyId: 1,
                    eventFamilyId: 1,
                    essentialFamilyId: 1
                },
                {
                    name: "MOUNT GAMBIER",
                    welcomeFamilyId: 1,
                    featureFamilyId: 1,
                    informationFamilyId: 1,
                    mapFamilyId: 1,
                    galleryFamilyId: 1,
                    marketFamilyId: 1,
                    foodFamilyId: 1,
                    attractionFamilyId: 1,
                    eventFamilyId: 1,
                    essentialFamilyId: 1
                },
                {
                    name: "MARGARET RIVER",
                    welcomeFamilyId: 1,
                    featureFamilyId: 1,
                    informationFamilyId: 1,
                    mapFamilyId: 1,
                    galleryFamilyId: 1,
                    marketFamilyId: 1,
                    foodFamilyId: 1,
                    attractionFamilyId: 1,
                    eventFamilyId: 1,
                    essentialFamilyId: 1
                },
                {
                    name: "KUNUNURRA",
                    welcomeFamilyId: 1,
                    featureFamilyId: 1,
                    informationFamilyId: 1,
                    mapFamilyId: 1,
                    galleryFamilyId: 1,
                    marketFamilyId: 1,
                    foodFamilyId: 1,
                    attractionFamilyId: 1,
                    eventFamilyId: 1,
                    essentialFamilyId: 1
                },
                {
                    name: "KANGAROO ISLAND",
                    welcomeFamilyId: 1,
                    featureFamilyId: 1,
                    informationFamilyId: 1,
                    mapFamilyId: 1,
                    galleryFamilyId: 1,
                    marketFamilyId: 1,
                    foodFamilyId: 1,
                    attractionFamilyId: 1,
                    eventFamilyId: 1,
                    essentialFamilyId: 1
                },
                {
                    name: "COFFS HARBOUR",
                    welcomeFamilyId: 1,
                    featureFamilyId: 1,
                    informationFamilyId: 1,
                    mapFamilyId: 1,
                    galleryFamilyId: 1,
                    marketFamilyId: 1,
                    foodFamilyId: 1,
                    attractionFamilyId: 1,
                    eventFamilyId: 1,
                    essentialFamilyId: 1
                }
            ],
            {}
        );
    },
    down: queryInterface => {
        return queryInterface.bulkDelete("just_brilliant_guides", null, {});
    }
};
