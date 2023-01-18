let dm = new MapDrawer( new WPoint(70,55), Glyph.Outside );
let rnd = new Rnd(17);
var algo = new G2_RndBox_Algo(dm);
algo.run(dm.dim, rnd);
console.log('done');
