import { checkUserLogin, asyncForEach } from "../utils/constant";
import { processUpload } from "../utils/constant";
import { UserInputError } from "apollo-server-express";

export default {
    Mutation: {
        async uploadFile(parent, { file }, { user }) {
            checkUserLogin(user);
            try {
                return await processUpload(file);
            } catch (e) {
                throw new UserInputError(e);
            }
        },
        async uploadFiles(parent, { files }, { user }) {
            checkUserLogin(user);
            try {
                return await new Promise(async (resolve, reject) => {
                    let output = [];
                    asyncForEach(files, async file => {
                        try {
                            output.push(await processUpload(file));
                            output.length === files.length && resolve(output);
                        } catch (err) {
                            reject(err);
                        }
                    });
                });
            } catch (e) {
                throw new UserInputError(err);
            }
        }
    }
};
