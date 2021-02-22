import { Express } from "express";

export function config(app: Express) {
    app.get("/customExpressRoute", (req, res) => res.send("<h1>Woah!</h1>"));
}