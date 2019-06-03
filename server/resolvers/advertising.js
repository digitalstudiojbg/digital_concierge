import db from "../models";
import { UserInputError } from "apollo-server-express";
import {
    handleCreateActionActivityLog,
    handleUpdateActionActivityLog,
    processUpload
} from "../utils/constant";

export default {
    Query: {
        advertising: async (_root, { id }) => await db.advertising.findByPk(id),
        advertisings: async (_root, _input, { user }) =>
            await db.advertising.findAll()
    },

    Mutation: {
        createAdvertising: async (
            _root,
            {
                input: {
                    agreement_number,
                    agreement_date,
                    agreement_file: agreement_file_raw,
                    payment,
                    period_month,
                    commence_date,
                    expire_date,
                    advertiserId
                }
            },
            { user, clientIp }
        ) => {
            //Handle Upload Agreement File
            let agreement_file;
            if (agreement_file_raw) {
                agreement_file = await processUpload(agreement_file_raw);
            }

            if (
                !agreement_file ||
                !agreement_file.location ||
                !agreement_file.key
            ) {
                throw new UserInputError("Unable to upload agreement file!");
            }

            const tempAdvertising = {
                agreement_number,
                agreement_date,
                agreement_file: agreement_file.location,
                agreement_file_key: agreement_file.key,
                period_month,
                commence_date,
                expire_date,
                advertiserId
            };

            let create_advertising = db.advertising.build({
                ...tempAdvertising
            });

            try {
                await create_advertising.save();
            } catch (error) {
                throw new UserInputError(
                    `Advertising number ${agreement_number} was not created.\nError Message: ${
                        error.message
                    }`
                );
            }

            const tempPayment = {
                ...payment,
                advertisingId: create_advertising.id
            };

            //Create and associating payment to advertising
            let create_payment = db.payment.build({
                ...tempPayment
            });

            try {
                await create_payment.save();
            } catch (error) {
                throw new UserInputError(
                    `Payment number ${
                        payment.invoice_number
                    } was not created.\nError Message: ${error.message}`
                );
            }

            handleCreateActionActivityLog(
                create_advertising,
                { ...tempAdvertising, payment: { ...tempPayment } },
                user,
                clientIp
            );

            return create_advertising;
        },
        editAdvertising: async (
            _root,
            {
                input: {
                    id,
                    agreement_number,
                    agreement_date,
                    agreement_file: agreement_file_raw,
                    payment_id,
                    payment: {
                        invoice_number,
                        invoice_date,
                        currency_id,
                        invoice_amount,
                        payable_date
                    },
                    period_month,
                    commence_date,
                    expiry_date
                }
            },
            { user, clientIp }
        ) => {
            let temp = await db.payment.findByPk(payment_id);
            if (!Boolean(temp)) {
                throw new UserInputError(
                    `Error! Payment ID ${payment_id} does not exist`
                );
            }

            temp = await db.payment.findByPk(id);
            if (!Boolean(temp)) {
                throw new UserInputError(
                    `Error! Advertising ID ${id} does not exist`
                );
            }

            //Update payment
            const tempPayment = {
                invoice_number,
                invoice_date,
                currency_id,
                invoice_amount,
                payable_date
            };

            let updatePayment = null;
            try {
                updatePayment = await db.payment.update(
                    { ...tempPayment },
                    { where: { id: payment_id } }
                );
            } catch (error) {
                throw new UserInputError(
                    `Unable to update payment ${payment_id} `,
                    error
                );
            }

            handleUpdateActionActivityLog(
                updatePayment,
                tempPayment,
                user,
                clientIp
            );

            //Optionally upload new agreement file
            let agreement_file = null;
            let uploadNewFile = false;
            if (agreement_file_raw) {
                agreement_file = await processUpload(agreement_file_raw);
                if (
                    !agreement_file ||
                    !agreement_file.location ||
                    !agreement_file.key
                ) {
                    throw new UserInputError(
                        "Unable to upload new agreement file!"
                    );
                }
                uploadNewFile = true;
            }

            const tempAdvertising = {
                agreement_number,
                agreement_date,
                ...(uploadNewFile &&
                    agreement_file.location && {
                        agreement_file: agreement_file.location
                    }),
                ...(uploadNewFile &&
                    agreement_file.key && {
                        agreement_file_key: agreement_file.key
                    }),
                period_month,
                commence_date,
                expiry_date
            };

            let updateAdvertising = null;
            try {
                updateAdvertising = await db.advertising.update(
                    { ...tempAdvertising },
                    { where: { id } }
                );
            } catch (error) {
                throw new UserInputError(
                    `Unable to update advertising ${id} `,
                    error
                );
            }

            handleUpdateActionActivityLog(
                updateAdvertising,
                tempAdvertising,
                user,
                clientIp
            );

            return updateAdvertising;
        }
    },

    Advertising: {
        media: async ({ mediumId }) => await db.media.findByPk(mediumId),
        advertiser: async ({ advertiserId }) =>
            await db.advertiser.findByPk(advertiserId),
        artwork_size: async ({ artworkSizeId }) =>
            await db.artwork_size.findByPk(artworkSizeId),
        payments: async ({ id }) =>
            await db.payment.findAll({ where: { advertisingId: id } }),
        payment: async ({ id }) =>
            await db.payment.findOne({
                where: { advertisingId: id },
                order: [["invoice_date", "DESC"]]
            }),
        articles: async ({ id }) =>
            await db.article.findAll({
                include: [
                    {
                        model: db.advertising,
                        where: { id }
                    }
                ]
            })
    }
};
