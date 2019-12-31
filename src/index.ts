import express from "express";
import { createServer } from "http";
import { render } from "./renderer";

// Can reuse server instance with createServer
// https://stackoverflow.com/questions/17696801/express-js-app-listen-vs-server-listen

const app = express();
const dev = process.env.NODE_ENV !== "production";

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

	const { scale: scaleS, background } = req.query;
	const scale = parseInt(scaleS, 10);

	const imageStream = render(width, height, {
		dev,
		scale: isNaN(scale) ? undefined : scale,
		background
	});
	imageStream.pipe(res);
});

createServer(app).listen(3000, () => {
	console.log("Example app listening on port 3000!");
});
