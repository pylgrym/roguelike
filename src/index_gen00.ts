import { Glyph } from "O2model/07Glyph";
import { Rnd } from "O2model/07Rnd";
import { WPoint } from "O2model/07WPoint";
import { MapDrawer } from "O7mapgen/33MapDrawer";
import { G0_BrokenColumns_Algo } from "O7mapgen/G0_BrokenColumns_Algo";

//let dm = new DrawMap( new WPoint(81,50), Glyph.BrownFloor );
let dm = new MapDrawer( new WPoint(41,25), Glyph.Floor );
let rnd = new Rnd(17);
var algo = new G0_BrokenColumns_Algo(); 
algo.run(dm.dim,rnd,dm); console.log('done');
