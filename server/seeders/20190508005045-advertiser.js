"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "advertisers",
            [
                {
                    name: "KFC Vanuatu",
                    nature_of_business: "RESTAURANT",
                    address: "Korman Rd",
                    city: "Port-Vila",
                    zip_code: "N/A",
                    postal_address: "Korman Rd",
                    postal_city: " Port-Vila",
                    postal_zip_code: "N/A",
                    stateId: 14,
                    postalStateId: 14,
                    phone: "+678 775 2066",
                    email: "info@kfcvanuatu.com",
                    justBrilliantGuideId: 1
                },
                {
                    name: "Ahapi Security Services",
                    nature_of_business: "SECURITY COMPANY",
                    address: "Port Fila",
                    city: "Efate",
                    zip_code: "N/A",
                    postal_address: "Port Fila",
                    postal_city: " Efate",
                    postal_zip_code: "N/A",
                    stateId: 17,
                    postalStateId: 17,
                    phone: "+678 29876",
                    email: "info@ahapi.com",
                    justBrilliantGuideId: 1
                },
                {
                    name: "Hungry Jack's Mildura",
                    nature_of_business: "RESTAURANT",
                    address: "827 Fifteenth St",
                    city: "Mildura",
                    zip_code: "3500",
                    postal_address: "827 Fifteenth St",
                    postal_city: " Mildura",
                    postal_zip_code: "3500",
                    stateId: 7,
                    postalStateId: 7,
                    phone: "+61350211405",
                    email: "info@hungryjacks.com.au",
                    justBrilliantGuideId: 2
                },
                {
                    name: "Coles Mildura",
                    nature_of_business: "SUPERMARKET",
                    address: "45-65 Lime Ave",
                    city: "Mildura",
                    zip_code: "3500",
                    postal_address: "45-65 Lime Ave",
                    postal_city: " Mildura",
                    postal_zip_code: "3500",
                    stateId: 7,
                    postalStateId: 7,
                    phone: "+61350233821",
                    email: "info@coles.com.au",
                    justBrilliantGuideId: 2
                },
                {
                    name: "Inverloch Fish and Chips",
                    nature_of_business: "RESTAURANT",
                    address: "4A Ramsey Blvd",
                    city: "Inverloch",
                    zip_code: "3996",
                    postal_address: "4A Ramsey Blvd",
                    postal_city: " Inverloch",
                    postal_zip_code: "3996",
                    stateId: 7,
                    postalStateId: 7,
                    phone: "+61356741175",
                    email: "info@inverlochfnc.com",
                    justBrilliantGuideId: 3
                },
                {
                    name: "Jeronimos Pizza",
                    nature_of_business: "RESTAURANT",
                    address: "84 Graham St",
                    city: "Wonthaggi",
                    zip_code: "3995",
                    postal_address: "84 Graham St",
                    postal_city: " Wonthaggi",
                    postal_zip_code: "3995",
                    stateId: 7,
                    postalStateId: 7,
                    phone: "+61356725050",
                    email: "info@jeronimos.com",
                    justBrilliantGuideId: 3
                }
            ],
            {}
        );
    },
    down: queryInterface => {
        return queryInterface.bulkDelete("advertisers", null, {});
    }
};
