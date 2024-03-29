import { Buff } from "./24BuffEnum";

export interface TickIF { 
  tick(time:number):void; 
}

export interface BuffIF {
  buff:Buff; 
  time:number; 
  effect:TickIF|undefined;
}


