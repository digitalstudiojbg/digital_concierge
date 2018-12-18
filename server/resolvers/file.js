import { checkUserLogin } from "../utils/constant";
import uuid from "uuid";
import { s3 } from "../utils/constant";
export default {
    Mutation: {
        async uploadFile(parent, { file }, { user }) {
            await checkUserLogin(user);
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
                }
            );

            return { stream, filename, mimetype, encoding };
        }
    }
};