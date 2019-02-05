"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "media",
            [
                {
                    name: "HOLIDAY INN LOGO",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/Holiday_Inn_Logo.png",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/Holiday_Inn_Logo.png",
                    size: Math.random() * 50000
                },

                {
                    name: "JOHN BATMAN GROUP LOGO",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/jbg_logo.png",
                    type: "image",
                    clientId: 2,
                    key: "cms_users/jbg_logo.png",
                    size: Math.random() * 50000
                },
                {
                    name: "png_map.png",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/png_map.png",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/png_map.png",
                    size: Math.random() * 50000
                },
                {
                    name: "cms_users/BUKA-HEADERIMAGE11.png",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/BUKA-HEADERIMAGE11.png",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/BUKA-HEADERIMAGE11.png",
                    size: Math.random() * 50000
                },
                {
                    name: "cms_users/CULTURE-HEADERIMAGE_BykSAk8.png",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/CULTURE-HEADERIMAGE_BykSAk8.png",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/CULTURE-HEADERIMAGE_BykSAk8.png",
                    size: Math.random() * 50000
                },
                {
                    name: "cms_users/D-IMAGEStest-150med.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D-IMAGEStest-150med.jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D-IMAGEStest-150med.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "D-IMAGEStest2-150med.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D-IMAGEStest2-150med.jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D-IMAGEStest2-150med.jpg",
                    size: Math.random() * 50000
                },

                {
                    name: "D-IMAGEStest3-150med.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D-IMAGEStest3-150med.jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D-IMAGEStest3-150med.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "D2-LAE-IMAGES.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D2-LAE-IMAGES.jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D2-LAE-IMAGES.jpg",
                    size: Math.random() * 50000
                },

                {
                    name: "D2-LAE-IMAGES2.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D2-LAE-IMAGES2.jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D2-LAE-IMAGES2.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "D3-MADANG-IMAGES.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D3-MADANG-IMAGES.jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D3-MADANG-IMAGES.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "D3-MADANG-IMAGES2.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D3-MADANG-IMAGES2.jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D3-MADANG-IMAGES2.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "D3-MADANG-IMAGES3.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D3-MADANG-IMAGES3.jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D3-MADANG-IMAGES3.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "D4-MOUNTHAGEN-IMAGES.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D4-MOUNTHAGEN-IMAGES.jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D4-MOUNTHAGEN-IMAGES.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "D4-MOUNTHAGEN-IMAGES2.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D4-MOUNTHAGEN-IMAGES2.jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D4-MOUNTHAGEN-IMAGES2.jpg",
                    size: Math.random() * 50000
                },

                {
                    name: "D5-KOKOPO-IMAGES(1).jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D5-KOKOPO-IMAGES(1).jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D5-KOKOPO-IMAGES(1).jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "D5-KOKOPO-IMAGES2.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D5-KOKOPO-IMAGES2.jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D5-KOKOPO-IMAGES2.jpg",
                    size: Math.random() * 50000
                },

                {
                    name: "D6-GOROKA-IMAGE.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D6-GOROKA-IMAGE.jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D6-GOROKA-IMAGE.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "D6-GOROKA-IMAGE2.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D6-GOROKA-IMAGE2.jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D6-GOROKA-IMAGE2.jpg",
                    size: Math.random() * 50000
                },

                {
                    name: "D7-ALOTAU-IMAGES.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D7-ALOTAU-IMAGES.jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D7-ALOTAU-IMAGES.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "D7-ALOTAU-IMAGES2.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D7-ALOTAU-IMAGES2.jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D7-ALOTAU-IMAGES2.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "D8-KIMBE-IMAGES_P1r06iy.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D8-KIMBE-IMAGES_P1r06iy.jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D8-KIMBE-IMAGES_P1r06iy.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "D9-KAVIENG-IMAGES.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D9-KAVIENG-IMAGES.jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D9-KAVIENG-IMAGES.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "D9-KAVIENG-IMAGES2.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D9-KAVIENG-IMAGES2.jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D9-KAVIENG-IMAGES2.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "D9-KAVIENG-IMAGES3.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D9-KAVIENG-IMAGES3.jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D9-KAVIENG-IMAGES3.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "D10-WEWAK-IMAGES.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D10-WEWAK-IMAGES.jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D10-WEWAK-IMAGES.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "D10-WEWAK-IMAGES2.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D10-WEWAK-IMAGES2.jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D10-WEWAK-IMAGES2.jpg",
                    size: Math.random() * 50000
                },

                {
                    name: "D11-LORENGAU-IMAGES.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D11-LORENGAU-IMAGES.jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D11-LORENGAU-IMAGES.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "D11-LORENGAU-IMAGES2.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D11-LORENGAU-IMAGES2.jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D11-LORENGAU-IMAGES2.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "D11-LORENGAU-IMAGES3.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D11-LORENGAU-IMAGES3.jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D11-LORENGAU-IMAGES3.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "D12-TUFI-IMAGES.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D12-TUFI-IMAGES.jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D12-TUFI-IMAGES.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "D12-TUFI-IMAGES2.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D12-TUFI-IMAGES2.jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D12-TUFI-IMAGES2.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "D12-TUFI-IMAGES3.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D12-TUFI-IMAGES3.jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D12-TUFI-IMAGES3.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "D13-BUKA.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/D13-BUKA.jpg",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/D13-BUKA.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "DIVING-HEADERIMAGE.png",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/DIVING-HEADERIMAGE.png",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/DIVING-HEADERIMAGE.png",
                    size: Math.random() * 50000
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("media", null, {});
    }
};
