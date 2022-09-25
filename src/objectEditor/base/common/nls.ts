/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

let isPseudo = (typeof document !== 'undefined' && document.location && document.location.hash.indexOf('pseudo=true') >= 0);

interface INLSPluginConfig {
	availableLanguages?: INLSPluginConfigAvailableLanguages;
	loadBundle?: BundleLoader;
	translationServiceUrl?: string;
}

export interface INLSPluginConfigAvailableLanguages {
	'*'?: string;
	[module: string]: string | undefined;
}

interface BundleLoader {
	(bundle: string, locale: string | null, cb: (err: Error, messages: string[] | IBundledStrings) => void): void;
}

interface IBundledStrings {
	[moduleId: string]: string[];
}

export interface ILocalizeInfo {
	key: string;
	comment: string[];
}

interface ILocalizeFunc {
	(info: ILocalizeInfo, message: string, ...args: (string | number | boolean | undefined | null)[]): string;
	(key: string, message: string, ...args: (string | number | boolean | undefined | null)[]): string;
}

interface IBoundLocalizeFunc {
	(idx: number, defaultValue: null): string;
}

interface IConsumerAPI {
	localize: ILocalizeFunc | IBoundLocalizeFunc;
	getConfiguredDefaultLocale(stringFromLocalizeCall: string): string | undefined;
}

function _format(message: string, args: (string | number | boolean | undefined | null)[]): string {
	let result: string;

	if (args.length === 0) {
		result = message;
	} else {
		result = message.replace(/\{(\d+)\}/g, (match, rest) => {
			const index = rest[0];
			const arg = args[index];
			let result = match;
			if (typeof arg === 'string') {
				result = arg;
			} else if (typeof arg === 'number' || typeof arg === 'boolean' || arg === void 0 || arg === null) {
				result = String(arg);
			}
			return result;
		});
	}

	if (isPseudo) {
		// FF3B and FF3D is the Unicode zenkaku representation for [ and ]
		result = '\uFF3B' + result.replace(/[aouei]/g, '$&$&') + '\uFF3D';
	}

	return result;
}

function endWithSlash(path: string): string {
	if (path.charAt(path.length - 1) === '/') {
		return path;
	}
	return path + '/';
}

async function getMessagesFromTranslationsService(translationServiceUrl: string, language: string, name: string): Promise<string[] | IBundledStrings> {
	const url = endWithSlash(translationServiceUrl) + endWithSlash(language) + 'vscode/' + endWithSlash(name);
	const res = await fetch(url);
	if (res.ok) {
		const messages = await res.json() as string[] | IBundledStrings;
		return messages;
	}
	throw new Error(`${res.status} - ${res.statusText}`);
}

function createScopedLocalize(scope: string[]): IBoundLocalizeFunc {
	return function (idx: number, defaultValue: null) {
		const restArgs = Array.prototype.slice.call(arguments, 2);
		return _format(scope[idx], restArgs);
	};
}

/**
 * Localize a message.
 *
 * `message` can contain `{n}` notation where it is replaced by the nth value in `...args`
 * For example, `localize({ key: 'sayHello', comment: ['Welcomes user'] }, 'hello {0}', name)`
 */
export function localize(info: ILocalizeInfo, message: string, ...args: (string | number | boolean | undefined | null)[]): string;

/**
 * Localize a message.
 *
 * `message` can contain `{n}` notation where it is replaced by the nth value in `...args`
 * For example, `localize('sayHello', 'hello {0}', name)`
 */
export function localize(key: string, message: string, ...args: (string | number | boolean | undefined | null)[]): string;

export function localize(data: ILocalizeInfo | string, message: string, ...args: (string | number | boolean | undefined | null)[]): string {
	return _format(message, args);
}

/**
 *
 * @param stringFromLocalizeCall You must pass in a string that was returned from a `nls.localize()` call
 * in order to ensure the loader plugin has been initialized before this function is called.
 */
export function getConfiguredDefaultLocale(stringFromLocalizeCall: string): string | undefined;
export function getConfiguredDefaultLocale(_: string): string | undefined {
	// This returns undefined because this implementation isn't used and is overwritten by the loader
	// when loaded.
	return undefined;
}

export function setPseudoTranslation(value: boolean) {
	isPseudo = value;
}

/**
 * Invoked in a built product at run-time
 */
export function create(key: string, data: IBundledStrings & IConsumerAPI): IConsumerAPI {
	return {
		localize: createScopedLocalize(data[key]),
		getConfiguredDefaultLocale: data.getConfiguredDefaultLocale ?? ((_: string) => undefined)
	};
}
