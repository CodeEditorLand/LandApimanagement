/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { AzureTreeItem, IActionContext } from "vscode-azureextensionui";

import { ext } from "../extensionVariables";

export async function deleteNode(
	context: IActionContext,
	expectedContextValue: string | RegExp,
	node?: AzureTreeItem,
): Promise<void> {
	if (!node) {
		node = await ext.tree.showTreeItemPicker<AzureTreeItem>(
			expectedContextValue,
			context,
		);
	}

	await node.deleteTreeItem(context);
}
