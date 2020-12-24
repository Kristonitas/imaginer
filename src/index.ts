import express from "express";
import { createServer } from "http";
import { render } from "./renderer";

// Can reuse server instance with createServer
// https://stackoverflow.com/questions/17696801/express-js-app-listen-vs-server-listen

const { PORT = 4321, NODE_ENV } = process.env;
const app = express();
const dev = NODE_ENV !== "production";

console.log(`Starting app in ${dev ? "dev" : "prod"}`);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/:width/:height", (req, res) => {
	const { width: widthS, height: heightS } = req.params;
	const width = parseInt(widthS, 10);
	const height = parseInt(heightS, 10);

	if (isNaN(width) || isNaN(height)) {
		res.status(404);
		res.send(`Invalid width or height supplied: ${widthS}/${heightS}`);
		return;
	}

	const { scale: scaleS = "1", background } = req.query as { scale?: string, background?: string };
	const scale = parseFloat(scaleS);

	const imageStream = render(width, height, {
		dev,
		scale: isNaN(scale) ? undefined : scale,
		background
	});
	res.contentType("jpeg");
	res.status(200);
	res.header("Access-Control-Allow-Origin", "*");
	imageStream.pipe(res);
});

createServer(app).listen(PORT, () => {
	console.log(`Listening on port ${PORT}!`);
});
