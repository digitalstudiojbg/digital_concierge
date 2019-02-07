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

            console.log(sort);
            console.log(sortObject);

            let output_data;
            const totalImages = await db.media.findAll({
                where: { clientId: id }
            });

            const { name, by } = sortObject;
            if (cursor) {
                output_data = await db.media.findAll({
                    where: { clientId: id },
                    limit,
                    where: {
                        createdAt: {
                            [db.op.ls]: cursor
                        }
                    },
                    order: [["size", "DESC"]]
                });
                console.log("---------------1");
            } else if (offset) {
                output_data = await db.media.findAll({
                    where: { clientId: id },
                    limit,
                    offset,
                    order: [[name, by]]
                });
                console.log("---------------2");
            } else {
                output_data = await db.media.findAll({
                    where: { clientId: id },
                    limit,
                    order: [[name, by]]
                });
                console.log("---------------3");
            }
            // console.log(output_data);

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
