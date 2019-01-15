import { checkUserLogin } from "../utils/constant";
import uuid from "uuid";
import { s3 } from "../utils/constant";

const processUpload = async file => {
    const { stream, filename, mimetype, encoding } = await file;

    s3.upload(
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
            }

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

            processUpload(file);

            return file;
        },
        async uploadFiles(parent, { files }, { user }) {
            await checkUserLogin(user);
            console.log(files);

            files.map(processUpload);

            return files;
        }
    }
};
