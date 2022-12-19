import { TermIF } from "O1term/03TermIF";
import { Stack } from "O1term/05ScreenStack";
import { StackIF } from "O1term/05ScreenStackIF";
import { SScreenIF } from "O1term/05SScreenIF";
import { DMapIF } from "./07DMapIF";
import { DrawMap } from "./07DrawMap";
import { WPoint } from "./07WPoint";

export class MapScreen implements SScreenIF {
  name='map'; 
  constructor(public map:DMapIF) {}
  onKey(e:JQuery.KeyDownEvent, stack:StackIF){}
  draw(term:TermIF) { 
      DrawMap.drawMap0(term,this.map,new WPoint()); 
  }
  onTime():boolean{return false;} // ch27
    
  static runMapScreen(map:DMapIF) {
    Stack.run_SScreen(new MapScreen(map));
  }
}
