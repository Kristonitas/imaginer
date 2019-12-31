import express from "express";
import { createServer } from "http";

// Can reuse server instance with createServer
// https://stackoverflow.com/questions/17696801/express-js-app-listen-vs-server-listen

const app = express();

app.get("/", (req, res) => {
	res.send("Hello World!");
});

createServer(app).listen(3000, () => {
	console.log("Example app listening on port 3000!");
});
