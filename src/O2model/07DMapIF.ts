import { MapCell } from "./07MapCell";
import { WPoint } from "./07WPoint";
import { Mob } from "./09Mob";
import { TurnQ } from "./09TurnQ";

export interface DMapIF {
  dim:WPoint;
  cell(p:WPoint):MapCell;
  legal(p:WPoint):boolean;
  level: number;

  // ch09:
  Q:TurnQ;
  addNPC(m:Mob):Mob;
  enterMap(ply:Mob, np:WPoint):void;
  moveMob(m:Mob, p:WPoint):void;
  removeMob(m:Mob):void;

  blocked(p:WPoint):boolean;
}
