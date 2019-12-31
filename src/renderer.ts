import { createCanvas } from "canvas";

type Options = {
	dev: boolean;
	scale?: number;
	background?: string;
};

const render = (width: number, height: number, options: Options) => {
	const { dev, scale = 1, background = "white" } = options;
	const canvas = createCanvas(width * scale, height * scale);
	const ctx = canvas.getContext("2d");
	ctx.scale(scale, scale);

	ctx.fillStyle = background;
	ctx.fillRect(0, 0, width, height);

	if (dev) {
		ctx.fillStyle = "black";
		ctx.font = "12px Sans-Serif";
		ctx.fillText("dev", 4, height - 4);
	}

	ctx.fillStyle = "black";
	ctx.font = "12px Sans-Serif";
	ctx.fillText(`${width}x${height}`, 4, 16);

	const stream = canvas.createJPEGStream();
	return stream;
};

export { render };
