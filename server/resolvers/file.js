import { checkUserLogin } from "../utils/constant";
import uuid from "uuid";
import { s3 } from "../utils/constant";
import { UserInputError } from "apollo-server-express";

const processUpload = async file => {
    const { stream, filename, mimetype, encoding } = await file;

    await s3.upload(
        {
            Key: `cms_users/${uuid.v4()}-${filename}`,
            Body: stream,
            ACL: "public-read"
        },
        (err, data) => {
            if (err) {
                console.log(
                    `There was an error uploading your photo: ${err.message}`
                );
                throw new UserInputError(err.message, {
                    invalidArgs: filename
                });
            }
            console.log("==============");
            console.log(data.Location);
            console.log("--------------");

            s3.listObjects({ Delimiter: "/" }, (err, data) => {
                if (err) {
                    console.log(err.message);
                } else {
                    console.log(data);
                }
            });
        }
    );
};

export default {
    Mutation: {
        async uploadFile(parent, { file }, { user }) {
            await checkUserLogin(user);
            await processUpload(file);
            console.log("FROM RESULT : !!!!!");
            console.log(result);

            return file;
        },
        async uploadFiles(parent, { files }, { user }) {
            await checkUserLogin(user);
            await files.map(processUpload);
            return files;
        }
    }
};
