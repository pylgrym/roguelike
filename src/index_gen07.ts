import { Glyph } from "O2model/07Glyph";
import { Rnd } from "O2model/07Rnd";
import { WPoint } from "O2model/07WPoint";
import { MapDrawer } from "O7mapgen/33MapDrawer";
import { G7_BoxGrow_Algo } from "O7mapgen/G7_BoxGrow_Algo";

//let dm = new MapDrawer( new WPoint(40,30), Glyph.Floor); 
let dm = new MapDrawer( new WPoint(70,55), Glyph.Floor); 
let rnd = new Rnd(17);
var algo = new G7_BoxGrow_Algo(dm, dm.dim);
algo.run(rnd);
