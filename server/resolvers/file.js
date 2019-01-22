import { checkUserLogin, asyncForEach } from "../utils/constant";
import uuid from "uuid";
import { s3 } from "../utils/constant";

const processUpload = async file => {
    const { stream, filename, mimetype, encoding } = await file;
    return new Promise(function(resolve, reject) {
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
            const s3TotalUpload = new Promise(async function(resolve, reject) {
                let output = [];
                await asyncForEach(files, async file => {
                    await processUpload(file).then(data => {
                        output.push(data);
                        output.length === files.length && resolve(output);
                    });
                });
            });
            return await s3TotalUpload;
        }
    }
};
