import MapViewer from './mapViewer';
import randomStandSequence from './standsequence';

export enum WidgetState {
  IDLE,
  WALK,
}

/**
 * A widget.
 */
export class Widget {
  instance: any;
  state = WidgetState.IDLE;

  constructor(map: MapViewer, model: any) {
    this.instance = model.addInstance();

    this.instance.setScene(map.worldScene);
  }

  update(): void {
    if (this.instance.sequenceEnded || this.instance.sequence === -1) {
      if (this.state === WidgetState.IDLE) {
        randomStandSequence(this.instance);
      }
    }
  }
}
