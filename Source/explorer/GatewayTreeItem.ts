/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {
	AzureParentTreeItem,
	type AzureTreeItem,
	type ISubscriptionContext,
} from "vscode-azureextensionui";
import type { IGatewayContract } from "../azure/apim/contracts";
import { nonNullProp } from "../utils/nonNull";
import { treeUtils } from "../utils/treeUtils";
import { GatewayApisTreeItem } from "./GatewayApisTreeItem";
import type { GatewaysTreeItem } from "./GatewaysTreeItem";
import type { IGatewayTreeRoot } from "./IGatewayTreeRoot";
import type { IServiceTreeRoot } from "./IServiceTreeRoot";

export class GatewayTreeItem extends AzureParentTreeItem<IGatewayTreeRoot> {
	public static contextValue = "azureApiManagementGatewayTreeItem";
	public contextValue: string = GatewayTreeItem.contextValue;
	public readonly gatewayApisTreeItem: GatewayApisTreeItem;

	private _label: string;
	private _root: IGatewayTreeRoot;

	constructor(
		parent: GatewaysTreeItem,
		public readonly gatewayContract: IGatewayContract,
	) {
		super(parent);
		this._label = nonNullProp(this.gatewayContract, "name");
		this._root = this.createRoot(parent.root);

		this.gatewayApisTreeItem = new GatewayApisTreeItem(this);
	}

	public get label(): string {
		return this._label;
	}

	public get root(): IGatewayTreeRoot {
		return this._root;
	}

	public get iconPath(): { light: string; dark: string } {
		return treeUtils.getThemedIconPath("gateway");
	}

	public hasMoreChildrenImpl(): boolean {
		return false;
	}

	public async loadMoreChildrenImpl(): Promise<
		AzureTreeItem<IGatewayTreeRoot>[]
	> {
		return [this.gatewayApisTreeItem];
	}

	private createRoot(subRoot: ISubscriptionContext): IGatewayTreeRoot {
		return Object.assign({}, <IServiceTreeRoot>subRoot, {
			gatewayName: nonNullProp(this.gatewayContract, "name"),
		});
	}
}
