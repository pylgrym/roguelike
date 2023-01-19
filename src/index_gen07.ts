let dm = new MapDrawer( new WPoint(70,55), Glyph.Floor); 
let rnd = new Rnd(17);
var algo = new G7_BoxGrow_Algo(dm, dm.dim);
algo.run(rnd);
