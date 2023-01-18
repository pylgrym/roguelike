import { Glyph } from "O2model/07Glyph";
import { Rnd } from "O2model/07Rnd";
import { WPoint } from "O2model/07WPoint";
import { MapDrawer } from "O7mapgen/33MapDrawer";
import { G3_GridBox_Algo } from "O7mapgen/G3_GridBox_Algo";

let dm = new MapDrawer( new WPoint(70,55), Glyph.Unknown );
let rnd = new Rnd(17);
var algo = new G3_GridBox_Algo(dm);
algo.run(rnd,dm.dim,1); console.log('done');
