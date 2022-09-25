/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { reset } from '../../../browser/dom';
import { renderLabelWithIcons } from '../../../browser/ui/iconLabel/iconLabels';

export class SimpleIconLabel {

	constructor(
		private readonly _container: HTMLElement
	) { }

	set text(text: string) {
		reset(this._container, ...renderLabelWithIcons(text ?? ''));
	}

	set title(title: string) {
		this._container.title = title;
	}
}
