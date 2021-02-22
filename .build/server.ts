import { promises as fs, existsSync } from "fs";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// Dump .env file:
require("dotenv").config();

// Create and run server:
async function runServer() {
    // Create express app:
    const app = express();

    // Accept JSON:
    app.use(bodyParser.json());

    // Enable CORS:
    app.use(cors());

    // Custom middleware and other things 
    try {
        const { config } = require("../serviette.config");
        config(app);
    }

    catch {
        console.log("No config found");
    }

    // Loop through routes:
    const endpointFiles = await fs.readdir(require("path").join(__dirname, "../dist"))
    endpointFiles.forEach((file: string) => {
        const handler = require(`../dist/${file}`);

        if (!handler || !handler.default) return;

        const [_ext, method, ...pathFragments] = file.split(".").reverse();

        let path = pathFragments.reverse().join("/");

        if (path === "index") {
            path = "";
        }

        console.log(`Discovered ${method.toUpperCase()} method at /${path}`);

        app[method as "get" | "post" | "put" | "delete" | "patch" | "all"](`/${path}`, async (req, res) => {
            Promise.resolve(handler.default(req)).then(({ code, data }) => res.status(code).json(data));
        });
    });

    // Start server:
    const port = process.env.PORT || 8888;
    app.listen(port, () => console.log(`Listening on port ${port}`));
}

runServer();