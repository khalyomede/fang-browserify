const fang = require("@khalyomede/fang");
const browserify = require("./lib/main");

const js = () =>
	fang
		.from("example/src/js/**/*.js")
		.do(browserify())
		.save("example/dist");

const build = [js];

module.exports = { build };
