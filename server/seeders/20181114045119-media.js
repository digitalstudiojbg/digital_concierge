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
                },
                {
                    name: "sample.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/sample.jpg",
                    type: "image",
                    clientId: 3,
                    key: "cms_users/sample.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "Vanuatu_AIF.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/Vanuatu_AIF.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_users/Vanuatu_AIF.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "Mildura_AIF.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/Mildura_AIF.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_users/Mildura_AIF.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "Bass_Coast_AIF.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/Bass_Coast_AIF.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_users/Bass_Coast_AIF.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "Port_Augusta_AIF.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/Port_Augusta_AIF.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_users/Port_Augusta_AIF.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "Mt_Gambier_AIF.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/Mt_Gambier_AIF.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_users/Mt_Gambier_AIF.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "Margaret_River_AIF.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/Margaret_River_AIF.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_users/Margaret_River_AIF.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "Kununurra_AIF.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/Kununurra_AIF.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_users/Kununurra_AIF.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "Kangaroo_Island_AIF.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/Kangaroo_Island_AIF.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_users/Kangaroo_Island_AIF.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "Coffs_Harbour_AIF.jpg",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/Coffs_Harbour_AIF.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_users/Coffs_Harbour_AIF.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "Start1OptionA",
                    path:
                        "https://digitalconcierge.s3-ap-southeast-2.amazonaws.com/cms_assets/Start+Page-01.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_assets/Start Page-01.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "Start1OptionB",
                    path:
                        "https://digitalconcierge.s3-ap-southeast-2.amazonaws.com/cms_assets/Start+Page-04.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_assets/Start Page-04.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "Start1OptionC",
                    path:
                        "https://digitalconcierge.s3-ap-southeast-2.amazonaws.com/cms_assets/Start+Page-11.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_assets/Start Page-11.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "Start2OptionA",
                    path:
                        "https://digitalconcierge.s3-ap-southeast-2.amazonaws.com/cms_assets/Start+Page-23.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_assets/Start Page-23.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "Start2OptionB",
                    path:
                        "https://digitalconcierge.s3-ap-southeast-2.amazonaws.com/cms_assets/Start+Page-25.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_assets/Start Page-25.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "Start2OptionC",
                    path:
                        "https://digitalconcierge.s3-ap-southeast-2.amazonaws.com/cms_assets/Start+Page-31.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_assets/Start Page-31.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "Home1OptionA",
                    path:
                        "https://digitalconcierge.s3-ap-southeast-2.amazonaws.com/cms_assets/Home+Page-03.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_assets/Home Page-03.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "Home1OptionB",
                    path:
                        "https://digitalconcierge.s3-ap-southeast-2.amazonaws.com/cms_assets/Home+Page-05.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_assets/Home Page-05.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "Home1OptionC",
                    path:
                        "https://digitalconcierge.s3-ap-southeast-2.amazonaws.com/cms_assets/Home+Page-08.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_assets/Home Page-08.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "Home2OptionA",
                    path:
                        "https://digitalconcierge.s3-ap-southeast-2.amazonaws.com/cms_assets/Home+Page-10.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_assets/Home Page-10.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "Home2OptionB",
                    path:
                        "https://digitalconcierge.s3-ap-southeast-2.amazonaws.com/cms_assets/Home+Page-11.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_assets/Home Page-11.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "Home2OptionC",
                    path:
                        "https://digitalconcierge.s3-ap-southeast-2.amazonaws.com/cms_assets/Home+Page-12.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_assets/Home Page-12.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "Directory1OptionA",
                    path:
                        "https://digitalconcierge.s3-ap-southeast-2.amazonaws.com/cms_assets/Directory+List+Page-02.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_assets/Directory List Page-02.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "Directory1OptionB",
                    path:
                        "https://digitalconcierge.s3-ap-southeast-2.amazonaws.com/cms_assets/Directory+List+Page-07.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_assets/Directory List Page-07.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "Directory1OptionC",
                    path:
                        "https://digitalconcierge.s3-ap-southeast-2.amazonaws.com/cms_assets/Directory+List+Page-27.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_assets/Directory List Page-27.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "Directory2OptionA",
                    path:
                        "https://digitalconcierge.s3-ap-southeast-2.amazonaws.com/cms_assets/Directory+List+Page-33.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_assets/Directory List Page-33.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "Directory2OptionB",
                    path:
                        "https://digitalconcierge.s3-ap-southeast-2.amazonaws.com/cms_assets/Directory+List+Page-36.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_assets/Directory List Page-36.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "Directory2OptionC",
                    path:
                        "https://digitalconcierge.s3-ap-southeast-2.amazonaws.com/cms_assets/Directory+List+Page-40.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_assets/Directory List Page-40.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "minimalist.jpg",
                    path:
                        "https://digitalconcierge.s3-ap-southeast-2.amazonaws.com/cms_users/minimalist.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_users/minimalist.jpg",
                    size: Math.random() * 50000
                },
                {
                    name: "tropical.jpg",
                    path:
                        "https://digitalconcierge.s3-ap-southeast-2.amazonaws.com/cms_users/tropical.jpg",
                    type: "image",
                    clientId: 2,
                    key: "cms_users/tropical.jpg",
                    size: Math.random() * 50000
                }
            ],
            {}
        );
    },
    down: queryInterface => {
        return queryInterface.bulkDelete("media", null, {});
    }
};
