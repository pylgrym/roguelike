import { Glyph } from "O2model/07Glyph";
import { WPoint } from "O2model/07WPoint";

export interface SurfaceIF {
  tunnel(s:WPoint,e:WPoint, tile:Glyph):void;
  box_empty(s:WPoint,e:WPoint):boolean;
  box(a:WPoint,b:WPoint, wall:Glyph):void;
}
