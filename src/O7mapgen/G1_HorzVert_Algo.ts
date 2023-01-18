import { Glyph } from "O2model/07Glyph";
import { Rnd } from "O2model/07Rnd";
import { WPoint } from "O2model/07WPoint";
import { MapBuilder } from "./33MapBuilder";
import { MapDrawerIF } from "./33MapDrawerIF";

export class G1_HorzVert_Algo {
  run(dim:WPoint, r:Rnd, dm:MapDrawerIF) {
    MapBuilder.addFence(dm.map); dm.render();
    for (let p = new WPoint(2,2); p.x<dim.x-3; p.x+=2 ) {
      for (p.y = 2; p.y<dim.y-3; p.y+=2 ) {
        let vert = r.oneIn(2);
        let q = p.plus(new WPoint(vert?0:1, vert?1:0));
        dm.setp(p, Glyph.Wall); dm.setp(q, Glyph.Wall);
      }
    }
  }
}
