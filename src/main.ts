import * as browserify from "browserify";
import { basename } from "path";
import * as deasync from "deasync";

interface Options {
	noParse: Array<String>;
	transform: Array<Function | String>;
	ignoreTransform: Array<Function | String>;
	plugin: Array<Function | String>;
	extensions: Array<String>;
	paths: Array<String>;
	commondir: Boolean;
	fullPaths: Boolean;
	builtins: Array<String>;
	bundleExternal: Boolean;
	browserField: Boolean;
	insertGlobals: Boolean;
	detectGlobals: Boolean;
	ignoreMissing: Boolean;
	debug: Boolean;
	standalone: String;
	externalRequireName: String;
}

/**
 * Convert a javascript file into a browser-compatible javascript file using browserify.
 *
 * @param {Object} options The options to customize the behavior of browserify.
 * @param {Array<String>} options.noParse
 * @param {Array<Function | String>} options.transform
 * @param {Array<Function | String>} options.ignoreTransform
 * @param {Array<Function | String>} options.plugin
 * @param {Array<String>} options.extensions
 * @param {Array<String>} options.paths
 * @param {Boolean} options.commondir
 * @param {Boolean} options.fullPaths
 * @param {Array<String>} options.builtins
 * @param {Boolean} options.bundleExternal
 * @param {Boolean} options.browserField
 * @param {Boolean} options.insertGlobals
 * @param {Boolean} options.detectGlobals
 * @param {Boolean} options.ignoreMissing
 * @param {Boolean} optionS.debug
 * @param {String} options.standalone
 * @param {String} options.externalRequireName
 * @return {Fang}
 * @see https://www.npmjs.com/package/browserify#browserifyfiles--opts For a list of available options.
 */
const fangBrowserify = (options: Options): Object => fang => {
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
