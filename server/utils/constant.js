import { AuthenticationError } from "apollo-server-express";
import AWS from "aws-sdk";
import uuid from "uuid";
import { UserInputError } from "apollo-server-express";

export const JBG_EMAIL_SUFFIX = "@johnbatman.com.au";
/**
 * check whether user is login
 */
export const checkUserLogin = async user => {
    if (!user) {
        throw new AuthenticationError("Unauthorized");
    }
};

/**
 * check whether user's venue belongs to one of the list of venues from category
 */
export const checkUserClientByDirectoryList = async (user, directory_list) => {
    const system = await directory_list.getSystem();
    const userClient = await user.getClient();
    const systemClient = await system.getClient();

    let checkUserClient = systemClient.id === userClient.id;
    /**
     * JBG_EMAIL_SUFFIX is the super admin privilege
     */
    //TODO: CHECK IF USER have proper admin privileges
    if (!checkUserClient && !user.email.includes(JBG_EMAIL_SUFFIX)) {
        throw new AuthenticationError(
            `User ${user.name} (user id: ${
                user.id
            }) does not have permission to ${directory_list.name} (user id : ${
                directory_list.id
            }) `
        );
    }
};

/**
 * check whether user has permission to modify system
 */
export const checkUserPermissionModifySystem = async (user, system) => {
    const systemClient = await system.getClient();
    const userClient = await user.getClient();

    let allowUserToModify = systemClient.id === userClient.id;

    //TODO: CHECK User level permission

    if (!allowUserToModify) {
        throw new AuthenticationError(
            `User ${user.name} (user email: ${
                user.email
            }) does not have permission to modify data in ${system.name}!`
        );
    }
};

export const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};

export const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: "digitalconcierge" }
});

export const processUpload = async file => {
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
                        `There was an error uploading your photos: ${
                            err.message
                        }`
                    );
                    return;
                }

                s3.listObjects({ Delimiter: "/" }, (err, data) => {
                    if (err) {
                        console.log(err.message);
                    } else {
                        console.log(data);
                    }
                });

                resolve({
                    filename,
                    location: data.Location,
                    key: data.key
                });
            }
        );
    });
};

export const processDelete = Key => {
    return new Promise((resolve, reject) => {
        s3.deleteObject(
            {
                Bucket: "digitalconcierge",
                Key
            },
            (err, data) => {
                if (err) {
                    reject(
                        `There was an error deleting your photos: ${
                            err.message
                        }`
                    );
                    return;
                }
                resolve(data);
            }
        );
    });
};
