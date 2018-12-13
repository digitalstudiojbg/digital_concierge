import AWS from "aws-sdk";
import uuid from "uuid";

export default {
    Mutation: {
        async uploadFile(parent, { file }, { user }) {
            //if user is not logged in
            if (!user) {
                throw new AuthenticationError("Unauthorized");
            }

            console.log("Mutation:uploadFile");
            const { stream, filename, mimetype, encoding } = await file;

            //Configuring the SDK & S3
            const albumBucketName = "digitalconcierge";
            const region = "ap-southeast-2";

            AWS.config.update({
                accessKeyId: "AKIAI67VTBT7RT7SL4PA",
                secretAccessKey: "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",
                region
            });

            const s3 = new AWS.S3({
                apiVersion: "2006-03-01",
                params: { Bucket: albumBucketName }
            });

            //Upload to S3 Bucket
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
                    console.log(data);

                    //View list of objects in S3 Bucket
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
