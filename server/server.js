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

const port = 3000;
const jwtSecret = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");

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
    context: async ({ req }) =>
        req.user && {
            user: await db.user.findById(req.user.sub)
        }
});
graphqlServer.applyMiddleware({ app });

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
