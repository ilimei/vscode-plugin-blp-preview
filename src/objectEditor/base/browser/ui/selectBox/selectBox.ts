/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IContentActionHandler } from '../../../browser/formattedTextRenderer';
import { IContextViewProvider } from '../../../browser/ui/contextview/contextview';
import { IListStyles } from '../../../browser/ui/list/listWidget';
import { SelectBoxList } from '../../../browser/ui/selectBox/selectBoxCustom';
import { SelectBoxNative } from '../../../browser/ui/selectBox/selectBoxNative';
import { Widget } from '../../../browser/ui/widget';
import { Color } from '../../../common/color';
import { Event } from '../../../common/event';
import { IDisposable } from '../../../common/lifecycle';
import { deepClone } from '../../../common/objects';
import { isMacintosh } from '../../../common/platform';
import './selectBox.css';



// Public SelectBox interface - Calls routed to appropriate select implementation class

export interface ISelectBoxDelegate extends IDisposable {

	// Public SelectBox Interface
	readonly onDidSelect: Event<ISelectData>;
	setOptions(options: ISelectOptionItem[], selected?: number): void;
	select(index: number): void;
	setAriaLabel(label: string): void;
	focus(): void;
	blur(): void;
	setFocusable(focus: boolean): void;

	// Delegated Widget interface
	render(container: HTMLElement): void;
	style(styles: ISelectBoxStyles): void;
	applyStyles(): void;
}

export interface ISelectBoxOptions {
	useCustomDrawn?: boolean;
	ariaLabel?: string;
	ariaDescription?: string;
	minBottomMargin?: number;
	optionsAsChildren?: boolean;
}

// Utilize optionItem interface to capture all option parameters
export interface ISelectOptionItem {
	text: string;
	detail?: string;
	decoratorRight?: string;
	description?: string;
	descriptionIsMarkdown?: boolean;
	descriptionMarkdownActionHandler?: IContentActionHandler;
	isDisabled?: boolean;
}

export interface ISelectBoxStyles extends IListStyles {
	selectBackground?: Color;
	selectListBackground?: Color;
	selectForeground?: Color;
	decoratorRightForeground?: Color;
	selectBorder?: Color;
	selectListBorder?: Color;
	focusBorder?: Color;
}

export const defaultStyles = {
	selectBackground: Color.fromHex('#3C3C3C'),
	selectForeground: Color.fromHex('#F0F0F0'),
	selectBorder: Color.fromHex('#3C3C3C')
};

export interface ISelectData {
	selected: string;
	index: number;
}

export class SelectBox extends Widget implements ISelectBoxDelegate {
	private selectBoxDelegate: ISelectBoxDelegate;

	constructor(options: ISelectOptionItem[], selected: number, contextViewProvider: IContextViewProvider, styles: ISelectBoxStyles = deepClone(defaultStyles), selectBoxOptions?: ISelectBoxOptions) {
		super();

		// Default to native SelectBox for OSX unless overridden
		if (isMacintosh && !selectBoxOptions?.useCustomDrawn) {
			this.selectBoxDelegate = new SelectBoxNative(options, selected, styles, selectBoxOptions);
		} else {
			this.selectBoxDelegate = new SelectBoxList(options, selected, contextViewProvider, styles, selectBoxOptions);
		}

		this._register(this.selectBoxDelegate);
	}

	// Public SelectBox Methods - routed through delegate interface

	get onDidSelect(): Event<ISelectData> {
		return this.selectBoxDelegate.onDidSelect;
	}

	setOptions(options: ISelectOptionItem[], selected?: number): void {
		this.selectBoxDelegate.setOptions(options, selected);
	}

	select(index: number): void {
		this.selectBoxDelegate.select(index);
	}

	setAriaLabel(label: string): void {
		this.selectBoxDelegate.setAriaLabel(label);
	}

	focus(): void {
		this.selectBoxDelegate.focus();
	}

	blur(): void {
		this.selectBoxDelegate.blur();
	}

	setFocusable(focusable: boolean): void {
		this.selectBoxDelegate.setFocusable(focusable);
	}

	render(container: HTMLElement): void {
		this.selectBoxDelegate.render(container);
	}

	style(styles: ISelectBoxStyles): void {
		this.selectBoxDelegate.style(styles);
	}

	applyStyles(): void {
		this.selectBoxDelegate.applyStyles();
	}
}
