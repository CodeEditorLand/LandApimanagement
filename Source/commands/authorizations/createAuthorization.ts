/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import type { IActionContext } from "vscode-azureextensionui";
import { AuthorizationProviderTreeItem } from "../../explorer/AuthorizationProviderTreeItem";
import type {
	AuthorizationsTreeItem,
	IAuthorizationTreeItemContext,
} from "../../explorer/AuthorizationsTreeItem";
import { ext } from "../../extensionVariables";

export async function createAuthorization(
	context: IActionContext & Partial<IAuthorizationTreeItemContext>,
	node?: AuthorizationsTreeItem,
): Promise<void> {
	if (!node) {
		const authorizationProviderNode = <AuthorizationProviderTreeItem>(
			await ext.tree.showTreeItemPicker(
				AuthorizationProviderTreeItem.contextValue,
				context,
			)
		);
		node = authorizationProviderNode.authorizationsTreeItem;
	}

	await node.createChild(context);
}
