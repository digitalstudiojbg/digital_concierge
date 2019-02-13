import db from "../models";
import { s3 } from "../utils/constant";
import { log } from "util";
import AWS from "aws-sdk";

export default {
    Query: {
        medium: async (_root, { id }) => await db.media.findByPk(id),
        media: async (_root, _input, { user }) => await db.media.findAll(),
        mediaByClient: async (
            _root,
            { id, limit, cursor, offset, sort },
            { user }
        ) => {
            let sortObject = {
                name: "name",
                by: "ASC"
            };

            switch (sort) {
                case 1:
                    sortObject = {
                        name: "name",
                        by: "ASC"
                    };
                    break;
                case 2:
                    sortObject = {
                        name: "name",
                        by: "DESC"
                    };
                    break;
                case 3:
                    sortObject = {
                        name: "createdAt",
                        by: "ASC"
                    };
                    break;
                case 4:
                    sortObject = {
                        name: "createdAt",
                        by: "DESC"
                    };
                    break;
                case 5:
                    sortObject = {
                        name: "size",
                        by: "ASC"
                    };
                    break;
                case 6:
                    sortObject = {
                        name: "size",
                        by: "DESC"
                    };
                    break;
                default:
                    break;
            }

            let output_data;
            const totalImages = await db.media.findAll({
                where: { clientId: id, type: "image" }
            });

            const { name, by } = sortObject;
            if (cursor) {
                output_data = await db.media.findAll({
                    where: { clientId: id, type: "image" },
                    limit,
                    where: {
                        createdAt: {
                            [db.op.ls]: cursor
                        }
                    },
                    order: [[name, by]]
                });
            } else if (offset) {
                output_data = await db.media.findAll({
                    where: { clientId: id, type: "image" },
                    limit,
                    offset,
                    order: [[name, by]]
                });
            } else {
                output_data = await db.media.findAll({
                    where: { clientId: id, type: "image" },
                    limit,
                    order: [[name, by]]
                });
            }

            output_data.map(each => {
                each["totalImages"] = totalImages.length;
            });

            return output_data;
        },
        mediaBySystem: async (_root, { id }, { user }) =>
            await db.media.findAll({
                include: [
                    {
                        model: db.system,
                        where: { id }
                    }
                ]
            })
    },
    Media: {
        client: async media => await db.client.findByPk(media.clientId)
    }
};
