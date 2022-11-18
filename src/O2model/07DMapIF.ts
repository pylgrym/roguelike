import { MapCell } from "./07MapCell";
import { WPoint } from "./07WPoint";

export interface DMapIF {
  dim:WPoint;
  cell(p:WPoint):MapCell;
  legal(p:WPoint):boolean;
  level: number;
}
