require("dotenv").config();

// Import app:
const express = require("express");
const app = express();

// Enable CORS:
const cors = require("cors");
app.use(cors());

// Loop through routes:
const { readdirSync } = require("fs");
readdirSync(require("path").join(__dirname, "../dist")).forEach(file => {
    const handler = require(`../dist/${file}`).default;

    const [_ext, method, ...pathFragments] = file.split(".").reverse();

    const path = pathFragments.reverse().join("/");

    app[method](`/${path}`, async (req, res) => {
        const { code, data } = await handler(req);
        res.status(code).json(data);
    });
});

// Start server
const port = process.env.PORT || 6969;
app.listen(port, () => console.log(`Listening on port ${port}`));