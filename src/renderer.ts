import { createCanvas } from "canvas";

type Options = {
	dev: boolean;
	scale?: number;
	background?: string;
};

const now = () => {
	const now = new Date();
	let dd = "" + now.getDate();
	let mm = "" + (now.getMonth() + 1);
	const yyyy = now.getFullYear();
	if (dd.length < 2) {
		dd = "0" + dd;
	}

	if (mm.length < 2) {
		mm = "0" + mm;
	}

	const time =
		now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

	return `${yyyy}-${mm}-${dd}\n${time}`;
};

const render = (width: number, height: number, options: Options) => {
	const { dev, scale = 1, background = "white" } = options;
	const canvas = createCanvas(width * scale, height * scale);
	const ctx = canvas.getContext("2d");
	ctx.scale(scale, scale);
	ctx.font = "12px Sans-Serif";

	ctx.fillStyle = background;
	ctx.fillRect(0, 0, width, height);

	if (dev) {
		ctx.fillStyle = "black";
		ctx.fillText("dev", 4, height - 4);
	}

	ctx.fillStyle = "black";
	ctx.fillText(`${width}x${height}`, 4, 16);

	ctx.textAlign = "center";
	ctx.fillText(now(), width / 2, height / 2);

	const stream = canvas.createJPEGStream();
	return stream;
};

export { render };
