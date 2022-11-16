import { SScreenIF } from "./05SScreenIF";

export interface StackIF {
  pop():void;
  push(screen:SScreenIF):void;
  cur():SScreenIF;
}
