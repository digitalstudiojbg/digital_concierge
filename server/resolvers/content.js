import db from "../models";

export default {
    Query: {
        content: async (_root, { id }) => {
            return await db.content.findByPk(id);
        },
        contents: async (_root, _input, { user }) => {
            return await db.content.findAll();
        }
    },
    Content: {
        child_contents: async content => {
            return await db.content.findAll({
                include: [
                    {
                        model: db.content,
                        as: "child_content_association",
                        where: { id: content.id }
                    }
                ]
            });
        }
    }
};
