import IDisposable from "../helper/dispose";
import { $, append } from "../helper/dom";
import types from "../helper/types";

export const enum Orientation {
    VERTICAL,
    HROIZONTAL,
}

export interface ISplitViewOptions<TLayoutContext = undefined> {
	readonly orientation?: Orientation; // default Orientation.VERTICAL
	// readonly styles?: ISplitViewStyles;
	// readonly orthogonalStartSash?: Sash;
	// readonly orthogonalEndSash?: Sash;
	readonly inverseAltBehavior?: boolean;
	readonly proportionalLayout?: boolean; // default true,
	// readonly descriptor?: ISplitViewDescriptor<TLayoutContext>;
	// readonly scrollbarVisibility?: ScrollbarVisibility;
	readonly getSashOrthogonalSize?: () => number;
}

export class SplitView<TLayoutContext = undefined> extends IDisposable {
    readonly el: HTMLElement;
    orientation: Orientation | undefined;
    inverseAltBehavior: boolean;
    proportionalLayout: boolean;
    getSashOrthogonalSize: (() => number) | undefined;
    sashContainer: HTMLDivElement;
    viewContainer: HTMLDivElement;

    constructor(container: HTMLElement, options: ISplitViewOptions<TLayoutContext> = {}) {
        super();

		this.orientation = types.isUndefined(options.orientation) ? Orientation.VERTICAL : options.orientation;
        this.inverseAltBehavior = !!options.inverseAltBehavior;
		this.proportionalLayout = types.isUndefined(options.proportionalLayout) ? true : !!options.proportionalLayout;
		this.getSashOrthogonalSize = options.getSashOrthogonalSize;

        this.el = document.createElement('div');
		this.el.classList.add('monaco-split-view2');
		this.el.classList.add(this.orientation === Orientation.VERTICAL ? 'vertical' : 'horizontal');
		container.appendChild(this.el);

        this.sashContainer = append(this.el, $<HTMLDivElement>('.sash-container'));
		this.viewContainer = $<HTMLDivElement>('.split-view-container');
    }
}