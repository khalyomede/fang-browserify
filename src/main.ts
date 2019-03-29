import * as browserify from "browserify";
import { basename } from "path";
import * as deasync from "deasync";

const fangBrowserify = options => fang => {
	fang.pluginName = "fang-browserify";

	fang.files.forEach(async file => {
		const fileName = basename(file.path);
		var done = false;

		if (fang.options.debug) {
			fang.info(`converting ${fileName}...`);
		}

		browserify(file.path, options).bundle((error, buffer) => {
			if (error) {
				throw error;
			}

			file.content = buffer;

			done = true;
		});

		deasync.loopWhile(() => !done);

		if (fang.options.debug) {
			fang.info(`converted ${fileName}`);
		}

		return file;
	});

	return fang;
};

export = fangBrowserify;
