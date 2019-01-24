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
                    phone: "++61 9879 8588",
                    mobile: "+61 425 872 499",
                    email: "jarrod@johnbatman.com.au",
                    clientId: 2
                },
                {
                    name: "Yijie Shen",
                    title: "Front End Developer",
                    phone: "++61 9879 8588",
                    mobile: "+61 425 872 498",
                    email: "nealshen@johnbatman.com.au",
                    clientId: 2
                }
            ],
            {}
        );
    },
    down: queryInterface => {
        return queryInterface.bulkDelete("contacts", null, {});
    }
};
