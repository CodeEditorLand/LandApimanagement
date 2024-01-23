/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// tslint:disable:no-unsafe-any

import * as cp from "node:child_process";
import * as path from "node:path";
import * as gulp from "gulp";
import {
	gulp_installAzureAccount,
	gulp_webpack,
} from "vscode-azureextensiondev";
import { gulp_installRestClient } from "./gulp/gulp_installRestClient";

const env = process.env;

function test(): cp.ChildProcess {
	env.DEBUGTELEMETRY = "1";
	env.CODE_TESTS_PATH = path.join(__dirname, "dist/test");
	return cp.spawn("node", ["./node_modules/vscode/bin/test"], {
		stdio: "inherit",
		env,
	});
}

exports["webpack-dev"] = () => gulp_webpack("development");
exports["webpack-prod"] = () => gulp_webpack("production");
exports.test = gulp.series(
	gulp_installAzureAccount,
	gulp_installRestClient,
	test,
);
