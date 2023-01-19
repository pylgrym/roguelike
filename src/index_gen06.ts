import { Glyph } from "O2model/07Glyph";
import { Rnd } from "O2model/07Rnd";
import { WPoint } from "O2model/07WPoint";
import { MapDrawer } from "O7mapgen/33MapDrawer";
import { G3_GridBox_Algo } from "O7mapgen/G3_GridBox_Algo";
import { G4_Maze_Algo } from "O7mapgen/G4_Maze_Algo";
import { G6_CaveIn } from "O7mapgen/G6_CaveIn";

let dm = new MapDrawer( new WPoint(71,55), Glyph.Wall );
let rnd = new Rnd(17);
var algoBox = new G3_GridBox_Algo(dm);
var algoMaze = new G4_Maze_Algo(dm, rnd, dm.dim);
let caveIn = new G6_CaveIn(dm);
algoBox.run(rnd,dm.dim, 2);
algoMaze.run(rnd); 
caveIn.run(dm.dim);
console.log('done');
