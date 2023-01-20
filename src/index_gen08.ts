import { Glyph } from "O2model/07Glyph";
import { Rnd } from "O2model/07Rnd";
import { WPoint } from "O2model/07WPoint";
import { MapDrawer } from "O7mapgen/33MapDrawer";
import { G8_Sprouter_Algo } from "O7mapgen/G8_Sprouter_Algo";

let dm = new MapDrawer( new WPoint(70,55), Glyph.Floor); 
let rnd = new Rnd(17);
var algo = new G8_Sprouter_Algo(dm,rnd);
algo.run();
