/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { HoverPosition } from '../../../browser/ui/hover/hoverWidget';
import { IUpdatableHoverOptions } from '../../../browser/ui/iconLabel/iconLabelHover';
import { IMarkdownString } from '../../../common/htmlContent';
import { IDisposable } from '../../../common/lifecycle';

export interface IHoverDelegateTarget extends IDisposable {
	readonly targetElements: readonly HTMLElement[];
	x?: number;
}

export interface IHoverDelegateOptions extends IUpdatableHoverOptions {
	content: IMarkdownString | string | HTMLElement;
	target: IHoverDelegateTarget | HTMLElement;
	hoverPosition?: HoverPosition;
	showPointer?: boolean;
	skipFadeInAnimation?: boolean;
}

export interface IHoverDelegate {
	showHover(options: IHoverDelegateOptions, focus?: boolean): IHoverWidget | undefined;
	onDidHideHover?: () => void;
	delay: number;
	placement?: 'mouse' | 'element';
}

export interface IHoverWidget extends IDisposable {
	readonly isDisposed: boolean;
}
