const { src, dest, series, watch } = require("gulp");
const typescript = require("gulp-typescript");

const js = () =>
	src("src/main.ts")
		.pipe(typescript())
		.pipe(dest("lib"));

const listen = () => watch("src/**/*.ts", js);

const build = series(js);

module.exports = { listen, build };
