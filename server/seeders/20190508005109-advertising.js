"use strict";

module.exports = {
    up: queryInterface => {
        const current = new Date();
        let nextYear = new Date();
        const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));
        nextYear.setDate(current.getDate() + 365);
        let randomDate = new Date();
        randomDate.setDate(current.getDate() - getRandomInt(20));

        return queryInterface.bulkInsert(
            "advertising",
            [
                {
                    agreement_number: "11282-31220-JD",
                    agreement_date: current,
                    agreement_file:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/CONTRACT_AS4000-1997.pdf",
                    agreement_file_key: "cms_users/CONTRACT_AS4000-1997.pdf",
                    period_month: 12,
                    commence_date: current,
                    expire_date: nextYear,
                    artwork_supply_date: randomDate,
                    mediumId: 36,
                    advertiserId: 1,
                    artworkSizeId: 1
                },
                {
                    agreement_number: "=4d6L@2bn^2e=bEZ",
                    agreement_date: current,
                    agreement_file:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/CONTRACT_AS4000-1997.pdf",
                    agreement_file_key: "cms_users/CONTRACT_AS4000-1997.pdf",
                    period_month: 12,
                    commence_date: current,
                    expire_date: nextYear,
                    artwork_supply_date: randomDate,
                    mediumId: 36,
                    advertiserId: 2,
                    artworkSizeId: 1
                },
                {
                    agreement_number: "NhZ^3L#H-k!k?+wM",
                    agreement_date: current,
                    agreement_file:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/CONTRACT_AS4000-1997.pdf",
                    agreement_file_key: "cms_users/CONTRACT_AS4000-1997.pdf",
                    period_month: 12,
                    commence_date: current,
                    expire_date: nextYear,
                    artwork_supply_date: randomDate,
                    mediumId: 36,
                    advertiserId: 3,
                    artworkSizeId: 2
                },
                {
                    agreement_number: "mr%jh@z4b5=e#Ka-",
                    agreement_date: current,
                    agreement_file:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/CONTRACT_AS4000-1997.pdf",
                    agreement_file_key: "cms_users/CONTRACT_AS4000-1997.pdf",
                    period_month: 12,
                    commence_date: current,
                    expire_date: nextYear,
                    artwork_supply_date: randomDate,
                    mediumId: 36,
                    advertiserId: 4,
                    artworkSizeId: 1
                },
                {
                    agreement_number: "d7&YME&MN@5=Amfm",
                    agreement_date: current,
                    agreement_file:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/CONTRACT_AS4000-1997.pdf",
                    agreement_file_key: "cms_users/CONTRACT_AS4000-1997.pdf",
                    period_month: 12,
                    commence_date: current,
                    expire_date: nextYear,
                    artwork_supply_date: randomDate,
                    mediumId: 36,
                    advertiserId: 5,
                    artworkSizeId: 2
                },
                {
                    agreement_number: "tq^LjG7Ku5aZ%CJf",
                    agreement_date: current,
                    agreement_file:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/CONTRACT_AS4000-1997.pdf",
                    agreement_file_key: "cms_users/CONTRACT_AS4000-1997.pdf",
                    period_month: 12,
                    commence_date: current,
                    expire_date: nextYear,
                    artwork_supply_date: randomDate,
                    mediumId: 36,
                    advertiserId: 6,
                    artworkSizeId: 1
                }
            ],
            {}
        );
    },
    down: queryInterface => {
        return queryInterface.bulkDelete("contracts", null, {});
    }
};
