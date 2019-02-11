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
    Payment: {
        currency: async payment => {
            return await db.currency.findByPk(payment.currencyId);
        },
        client: async payment => {
            return await db.client.findByPk(payment.clientId);
        }
    }
};
