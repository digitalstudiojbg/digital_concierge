"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "themes",
            [
                {
                    companyLogo:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/jbg_logo.png",
                    headerFont: "Source Sans Pro Black",
                    subHeaderFont: "Source Sans Pro Black",
                    bodyFont: "Source Sans Pro Black",
                    captionFont: "Source Sans Pro Black",
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
                    defaultStartLayoutId: 1,
                    defaultHomeLayoutId: 4,
                    defaultDirListLayoutId: 8,
                    defaultDirEntryLayoutId: 10,
                    systemId: 1
                },
                {
                    companyLogo:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/jbg_logo.png",
                    headerFont: "Source Sans Pro Black",
                    subHeaderFont: "Source Sans Pro Black",
                    bodyFont: "Source Sans Pro Black",
                    captionFont: "Source Sans Pro Black",
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
                    defaultStartLayoutId: 1,
                    defaultHomeLayoutId: 4,
                    defaultDirListLayoutId: 8,
                    defaultDirEntryLayoutId: 10,
                    systemId: 2
                },
                {
                    companyLogo:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/Holiday_Inn_Logo.png",
                    headerFont: "Source Sans Pro Black",
                    subHeaderFont: "Source Sans Pro Black",
                    bodyFont: "Source Sans Pro Black",
                    captionFont: "Source Sans Pro Black",
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
                    defaultStartLayoutId: 1,
                    defaultHomeLayoutId: 4,
                    defaultDirListLayoutId: 8,
                    defaultDirEntryLayoutId: 10,
                    systemId: 3
                },
                {
                    companyLogo:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/Holiday_Inn_Logo.png",
                    headerFont: "Source Sans Pro Regular",
                    subHeaderFont: "Source Sans Pro Regular",
                    bodyFont: "Source Sans Pro Regular",
                    captionFont: "Source Sans Pro Regular",
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
                    defaultStartLayoutId: 1,
                    defaultHomeLayoutId: 4,
                    defaultDirListLayoutId: 8,
                    defaultDirEntryLayoutId: 10,
                    systemId: 4
                }
            ],
            {}
        );
    },
    down: queryInterface => {
        return queryInterface.bulkDelete("contracts", null, {});
    }
};
