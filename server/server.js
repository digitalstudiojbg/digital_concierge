import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import db from "./models";
import { ApolloServer } from "apollo-server-express";
import expressJwt from "express-jwt";
import resolvers from "./resolvers";
import schemas from "./schemas";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AWS from "aws-sdk";
const geoip = require("geoip-lite");
const publicIp = require("public-ip");

const port = 3000;
const jwtSecret = Buffer.from(process.env.JWT_SECRET, "base64");
const app = express();

app.use(
    cors(),
    bodyParser.json(),
    expressJwt({
        secret: jwtSecret,
        credentialsRequired: false
    })
);

const graphqlServer = new ApolloServer({
    typeDefs: schemas,
    resolvers,
    context: async ({ req }) => {
        /*
        //Adapted from https://github.com/CITGuru/express-ip/blob/master/index.js
        const xForwardedFor = (req.headers["x-forwarded-for"] || "").replace(
            /:\d+$/,
            ""
        );
        let ip = xForwardedFor || req.connection.remoteAddress;
        if (ip.includes("::ffff:")) {
            ip = ip.split(":").reverse()[0];
        }*/
        const ip = await publicIp.v4();
        // console.log("ip_address ", ip);
        const {
            country = "undefined",
            region = "undefined",
            city = "undefined",
            ll = ["undefined", "undefined"]
        } = geoip.lookup(ip) || {};
        const [latitude, longitude] = ll;
        const user = req.user ? await db.user.findByPk(req.user.sub) : null;
        return {
            user,
            clientIp: {
                country,
                region,
                city,
                latitude,
                longitude,
                ip_address: ip
            }
        };
    },
    uploads: {
        maxFileSize: 100000000, // 100 MB
        maxFiles: 100
    }
});
graphqlServer.applyMiddleware({ app });

AWS.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: "ap-southeast-2"
});

/**
 * REST API TEST
 */
app.get("/", (req, res) => {
    res.set("Content-Type", "application/json");
    let data = {
        message: "Hello world, Woooooeeeee!!!! JBG"
    };
    res.send(JSON.stringify(data, null, 2));
});

app.get("/test", (req, res) => {
    res.set("Content-Type", "application/json");
    let data = {
        message: "Hello world, Woooooeeeee!!!! JBG TEST API"
    };
    res.send(JSON.stringify(data, null, 2));
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await db.user.findOne({
        where: {
            email
        }
    });

    if (!Boolean(user)) {
        res.sendStatus(401);
        return;
    }

    const { id, clientId, password: userPassword } = user;

    if (!bcrypt.compareSync(password, userPassword)) {
        res.sendStatus(401);
        return;
    }

    const token = jwt.sign({ sub: id }, jwtSecret);

    const { name: clientName } = await db.client.findByPk(clientId);

    res.send({ token, clientId, clientName });
});

db.sequelize
    .authenticate()
    .then(() => {
        console.log("MySql Connection has been established successfully.");
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err);
    });
