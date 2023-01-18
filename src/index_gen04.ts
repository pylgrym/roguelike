import { Glyph } from "O2model/07Glyph";
import { Rnd } from "O2model/07Rnd";
import { WPoint } from "O2model/07WPoint";
import { MapDrawer } from "O7mapgen/33MapDrawer";
import { G4_Maze_Algo } from "O7mapgen/G4_Maze_Algo";

let dm = new MapDrawer( new WPoint(71,55), Glyph.Wall );
let rnd = new Rnd(17);
var algo = new G4_Maze_Algo(dm, rnd, dm.dim);
algo.run(rnd); console.log('done');
dm.print();
