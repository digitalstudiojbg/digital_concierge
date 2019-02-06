import {
    AuthenticationError,
    ApolloError,
    UserInputError
} from "apollo-server-express";
import AWS from "aws-sdk";
import uuid from "uuid";
import db from "../models";

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

                s3.headObject({ Key: data.key })
                    .promise()
                    .then(res =>
                        resolve({
                            filename,
                            location: data.Location,
                            key: data.key,
                            size: res.ContentLength
                        })
                    );
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

export const processDeleteMedia = async (key, imageId) => {
    try {
        const uploaded_media = await processDelete(key);
        try {
            const select_media = await db.media.findByPk(imageId);

            /**
             * Remove relationship between media and directory list
             */

            new Promise(async (resolve, reject) => {
                const select_media_fk_directory_list = await select_media.getDirectory_lists();
                select_media
                    .removeDirectory_lists(select_media_fk_directory_list)
                    .then(async () => {
                        await db.media.destroy({
                            where: { id: imageId }
                        });
                        resolve();
                    })
                    .catch(() => {
                        reject();
                    });
            });
        } catch (e) {
            throw new UserInputError(e);
        }
    } catch (e) {
        throw new UserInputError(e);
    }
};

export const handleCreateActionActivityLog = async (
    subject,
    properties,
    user,
    clientIp
) => {
    const {
        ip_address: ip,
        country,
        region,
        city,
        latitude,
        longitude
    } = clientIp;
    //Get model and table name in sequelize v4: https://stackoverflow.com/a/47918030
    try {
        db.activity_log.create({
            tableName: subject.constructor.getTableName(),
            modelName: subject.constructor.name,
            subjectId: subject.id,
            actionType: "CREATE",
            properties: JSON.stringify(properties),
            ip,
            country,
            region,
            city,
            latitude,
            longitude,
            userId: user.id
        });
    } catch (error) {
        throw new new ApolloError(
            `Fail to create action type log of creating for object ${
                subject.constructor.name
            } with ID ${subject.id}.\nError message: ${error.message}`,
            500
        )();
    }
};

export const handleUpdateActionActivityLog = async (
    subject,
    properties,
    user,
    clientIp
) => {
    const {
        ip_address: ip,
        country,
        region,
        city,
        latitude,
        longitude
    } = clientIp;
    //Get model and table name in sequelize v4: https://stackoverflow.com/a/47918030
    try {
        db.activity_log.create({
            tableName: subject.constructor.getTableName(),
            modelName: subject.constructor.name,
            subjectId: subject.id,
            actionType: "UPDATE",
            properties: JSON.stringify(properties),
            ip,
            country,
            region,
            city,
            latitude,
            longitude,
            userId: user.id
        });
    } catch (error) {
        throw new new ApolloError(
            `Fail to create action type log of updating for object ${
                subject.constructor.name
            } with ID ${subject.id}.\nError message: ${error.message}`,
            500
        )();
    }
};

export const handleDeleteActionActivityLog = async (
    subject,
    properties,
    user,
    clientIp
) => {
    const {
        ip_address: ip,
        country,
        region,
        city,
        latitude,
        longitude
    } = clientIp;
    //Get model and table name in sequelize v4: https://stackoverflow.com/a/47918030
    try {
        db.activity_log.create({
            tableName: subject.constructor.getTableName(),
            modelName: subject.constructor.name,
            subjectId: subject.id,
            actionType: "DELETE",
            properties: JSON.stringify(properties),
            ip,
            country,
            region,
            city,
            latitude,
            longitude,
            userId: user.id
        });
    } catch (error) {
        throw new new ApolloError(
            `Fail to create action type log of deleting for object ${
                subject.constructor.name
            } with ID ${subject.id}.\nError message: ${error.message}`,
            500
        )();
    }
};

export const processUploadMedia = async (image, clientId, type) => {
    try {
        const uploaded_media = await processUpload(image);
        try {
            console.log("-------------------");
            console.log(uploaded_media.size);

            return await db.media.create({
                name: uploaded_media.filename,
                path: uploaded_media.location,
                clientId,
                type,
                key: uploaded_media.key,
                size: uploaded_media.size
            });
        } catch (e) {
            throw new UserInputError(e);
        }
    } catch (e) {
        throw new UserInputError(e);
    }
};
