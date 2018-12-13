import { s3, checkUserLogin } from "../utils/constant";
import uuid from "uuid";

export default {
    Mutation: {
        async uploadFile(parent, { file }, { user }) {
            await checkUserLogin(user);
            const { stream, filename, mimetype, encoding } = await file;

            s3.upload(
                {
                    Key: `${uuid.v4()}-${filename}`,
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
