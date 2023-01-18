import { Glyph } from "O2model/07Glyph";
import { Rnd } from "O2model/07Rnd";
import { WPoint } from "O2model/07WPoint";
import { MapDrawer } from "O7mapgen/33MapDrawer";
import { G1_HorzVert_Algo } from "O7mapgen/G1_HorzVert_Algo";

let dm = new MapDrawer( new WPoint(40,26), Glyph.Floor );
let rnd = new Rnd(17);
var algo = new G1_HorzVert_Algo(); 
algo.run(dm.dim, rnd, dm); console.log('done');
