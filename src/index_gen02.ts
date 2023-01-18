import { Glyph } from "O2model/07Glyph";
import { Rnd } from "O2model/07Rnd";
import { WPoint } from "O2model/07WPoint";
import { MapDrawer } from "O7mapgen/33MapDrawer";
import { G2_RndBox_Algo } from "O7mapgen/G2_RndBox_Algo";

//Glyph.Outside
let dm = new MapDrawer( new WPoint(70,55), Glyph.Unknown );
let rnd = new Rnd(17);
var algo = new G2_RndBox_Algo(dm);
algo.run(dm.dim, rnd);
console.log('done');
