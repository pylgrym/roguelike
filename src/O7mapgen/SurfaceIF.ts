import { WPoint } from "O2model/07WPoint";

export enum Tile { 
  C_WALL = '#', 
  C_FLOOR = ' ', 
  C_CORRFLOOR = ',', 
  C_HALLWALL = 'H', 
  UNSET = '' 
};

export interface SurfaceIF {
  tunnel(s:WPoint,e:WPoint, tile:Tile):void;
  box_empty(s:WPoint,e:WPoint):boolean;
  box(a:WPoint,b:WPoint, wall:Tile):void;
}
