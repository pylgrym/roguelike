let dm = new MapDrawer( new WPoint(71,55), Glyph.Wall );
let rnd = new Rnd(17);
var algoBox = new G3_GridBox_Algo(dm);
var algoMaze = new Maze_Algo(dm, rnd, dm.dim);
algoBox.run(rnd,dm.dim, 2);
algoMaze.run(rnd);