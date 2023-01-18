//let dm = new DrawMap( new WPoint(81,50), Glyph.BrownFloor );
let dm = new MapDrawer( new WPoint(41,25), Glyph.Floor );
let rnd = new Rnd(17);
var algo = new G0_BrokenColumns_Algo(); 
algo.run(dm.dim,rnd,dm); console.log('done');
