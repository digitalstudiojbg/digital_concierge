import db from "../models";

export default {
    Query: {
        payment: async (root, { id }, { user }) => {
            //if user is not logged in
            if (!user) {
                throw new AuthenticationError("Unauthorized");
            }
            return await db.payment.findByPk(id);
        },

        payments: async (oot, input, { user }) => {
            //if user is not logged in
            if (!user) {
                throw new AuthenticationError("Unauthorized");
            }

            return await db.payment.findAll();
        }
    },
    Mutation: {
        createPayment: async (
            _root,
            {
                input: {
                    invoice_number,
                    invoice_date,
                    invoice_amount,
                    payable_date,
                    currencyId,
                    clientId
                }
            },
            { user, clientIp }
        ) => {
            let created_payment = db.payment.build({
                invoice_number,
                invoice_date,
                payable_date: new Date(payable_date),
                invoice_date: new Date(invoice_date),
                invoice_amount,
                currencyId,
                clientId
            });

            return await created_payment.save();
        }
    },
    Payment: {
        currency: async payment => {
            return await db.currency.findByPk(payment.currencyId);
        },
        client: async payment => {
            return await db.client.findByPk(payment.clientId);
        },
        advertising: async payment =>
            await db.advertising.findByPk(payment.advertisingId)
    }
};
