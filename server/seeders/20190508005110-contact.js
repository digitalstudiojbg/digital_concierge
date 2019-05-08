"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "contacts",
            [
                {
                    name: "Matthew Senyard",
                    title: "Acting General Manager",
                    phone: "+678 22040 ext. 8030",
                    mobile: "+678 755 4033",
                    email: "matthew.senyard@ihg.com",
                    clientId: 1
                },
                {
                    name: "Jarrod La Canna",
                    title: "General Manager",
                    phone: "+61 9879 8588",
                    mobile: "+61 425 872 499",
                    email: "jarrod@johnbatman.com.au",
                    clientId: 3
                },
                {
                    name: "Yijie Shen",
                    title: "Front End Developer",
                    phone: "+61 9879 8588",
                    mobile: "+61 425 872 498",
                    email: "nealshen@johnbatman.com.au",
                    clientId: 3
                },
                {
                    name: "Karen Hutter",
                    title: "General Manager",
                    phone: "+678 775 2066",
                    mobile: "+678 775 2066",
                    email: "karen@kfcvanuatu.com",
                    advertiserId: 1
                },
                {
                    name: "Miriam Sterling",
                    title: "Accounts Officer",
                    phone: "+678 29876",
                    mobile: "+678 29876",
                    email: "miriam@ahapi.com",
                    advertiserId: 2
                },
                {
                    name: "Javis Toth",
                    title: "Floor Manager",
                    phone: "+61350211405",
                    mobile: "+61 425 872 498",
                    email: "javis@hungryjacks.com.au",
                    advertiserId: 3
                },
                {
                    name: "Natasha Garner",
                    title: "Acting Store Manager",
                    phone: "+61350233821",
                    mobile: "+61425872498",
                    email: "natasha@coles.com.au",
                    advertiserId: 4
                },
                {
                    name: "Charlie Toney",
                    title: "Owner",
                    phone: "+61356741175",
                    mobile: "+61 425 872 498",
                    email: "charlie@inverlochfnc.com",
                    advertiserId: 5
                },
                {
                    name: "Rachel Gough",
                    title: "Front End Developer",
                    phone: "+61356725050",
                    mobile: "+61 425 872 498",
                    email: "rachel@jeronimos.com.au",
                    advertiserId: 6
                }
            ],
            {}
        );
    },
    down: queryInterface => {
        return queryInterface.bulkDelete("contacts", null, {});
    }
};
