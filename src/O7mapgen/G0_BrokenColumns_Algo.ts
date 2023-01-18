export class G0_BrokenColumns_Algo {
  run(dim:WPoint, r:Rnd, dm:MapDrawerIF) {
    MapBuilder0.addFence(dm.map); 
    dm.render();
    for (let p = new WPoint(2,1); p.x<dim.x-1; p.x+=2 ) {
      let a = r.rnd(1,dim.y-1), b = r.rnd(1,dim.y-1);
      for (p.y = 1; p.y<dim.y; ++p.y ) {
        dm.setp(p, (p.y == a || p.y == b ? 
                    Glyph.Floor : Glyph.Wall));
      }
    }
  }
}
