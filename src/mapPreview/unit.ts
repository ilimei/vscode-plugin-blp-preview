import { quat, vec3 } from 'gl-matrix';
import { VEC3_UNIT_Z } from '../common/gl-matrix-addon';
import { MappedDataRow } from '../w3xReader/MappedData';
import MapViewer from './mapViewer';
import { Widget } from './widget';
import DooUnit from '../w3xReader/unitsdoo/unit';

const heapZ = vec3.create();

/**
 * A unit.
 */
export default class Unit extends Widget {
  /**
   * StartLocation.mdx (and others?) seems to be built-in, and has no row.
   */
  row: MappedDataRow | undefined;

  constructor(map: MapViewer, model: any, row: MappedDataRow | undefined, unit: DooUnit) {
    super(map, model);

    const instance = this.instance;

    instance.move(<vec3>unit.location);
    instance.rotateLocal(quat.setAxisAngle(quat.create(), VEC3_UNIT_Z, unit.angle));
    instance.scale(<vec3>unit.scale);
    instance.setTeamColor(unit.player);
    instance.setScene(map.worldScene);

    if (row) {
      heapZ[2] = row.number('moveHeight');

      instance.move(heapZ);
      instance.setVertexColor([row.number('red') / 255, row.number('green') / 255, row.number('blue') / 255, 1]);
      instance.uniformScale(row.number('modelScale'));
    }

    this.instance = instance;
    this.row = row;
  }
}
