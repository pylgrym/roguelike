import { DMap } from "./07DMap";
import { DMapIF } from "./07DMapIF";
import { Glyph } from "./07Glyph";
import { Rnd } from "./07Rnd";
import { WPoint } from "./07WPoint";

export class TestMap {
  static test0():DMapIF {
    let wdim = new WPoint(14,8);
    let level = 0;
    return new DMap(wdim,Glyph.Wall,level);    
  }

  static test(dim:WPoint, rnd:Rnd, level:number):DMapIF {
    let m = new DMap(dim, Glyph.Wall, level);
    for (let p=new WPoint(); p.y<dim.y;++p.y) {
      for (p.x=0; p.x<dim.x;++p.x) {
        let edge = !( p.x > 0 && p.x < dim.x-1
                   && p.y > 0 && p.y < dim.y-1);
        let chance = rnd.oneIn(4);
        let wall = (edge || chance);
        m.cell(p).env = (wall ? Glyph.Wall : Glyph.Floor);
      }
    }
    return m;
  }

  static fullTest():DMapIF {
    let wdim = new WPoint(32,16);
    let rnd = new Rnd(42);
    return TestMap.test(wdim,rnd,0);    
  }
  
}
