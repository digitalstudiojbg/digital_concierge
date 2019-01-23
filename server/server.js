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
        //Adapted from https://github.com/CITGuru/express-ip/blob/master/index.js
        const xForwardedFor = (req.headers["x-forwarded-for"] || "").replace(
            /:\d+$/,
            ""
        );
        let ip = xForwardedFor || req.connection.remoteAddress;
        if (ip.includes("::ffff:")) {
            ip = ip.split(":").reverse()[0];
        }
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
        maxFileSize: 10000000, // 10 MB
        maxFiles: 10
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
            email: email
        }
    });

    if (!bcrypt.compareSync(password, user.password)) {
        res.sendStatus(401);
        return;
    }

    const token = jwt.sign({ sub: user.id }, jwtSecret);

    res.send({ token });
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
