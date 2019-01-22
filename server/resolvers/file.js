import { checkUserLogin, asyncForEach } from "../utils/constant";
import uuid from "uuid";
import { s3 } from "../utils/constant";

const processUpload = async file => {
    const { stream, filename, mimetype, encoding } = await file;
    return new Promise((resolve, reject) => {
        s3.upload(
            {
                Key: `cms_users/${uuid.v4()}-${filename}`,
                Body: stream,
                ACL: "public-read"
            },
            (err, data) => {
                if (err) {
                    reject(
                        `There was an error uploading your photo: ${
                            err.message
                        }`
                    );
                }

                s3.listObjects({ Delimiter: "/" }, (err, data) => {
                    if (err) {
                        console.log(err.message);
                    } else {
                        console.log(data);
                    }
                });

                resolve({ filename, location: data.Location });
            }
        );
    });
};

export default {
    Mutation: {
        async uploadFile(parent, { file }, { user }) {
            checkUserLogin(user);
            return await processUpload(file);
        },
        async uploadFiles(parent, { files }, { user }) {
            checkUserLogin(user);
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
        }
    }
};
