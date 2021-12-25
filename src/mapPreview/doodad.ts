import { quat } from 'gl-matrix';
import { VEC3_UNIT_Z } from '../common/gl-matrix-addon';
import Doodaded from '../w3xReader/doo/doodad';
import { MappedDataRow } from '../w3xReader/MappedData';
import MapViewer from './mapViewer';
import { Widget } from './widget';

/**
 * A doodad.
 */
export default class Doodad extends Widget {
  row: MappedDataRow;

  constructor(map: MapViewer, model: any, row: MappedDataRow, doodad: Doodaded) {
    super(map, model);

    const instance = this.instance;

    instance.move(doodad.location);
    instance.rotateLocal(quat.setAxisAngle(quat.create(), VEC3_UNIT_Z, doodad.angle));
    instance.scale(doodad.scale);
    instance.setScene(map.worldScene);

    this.instance = instance;
    this.row = row;
  }
}
