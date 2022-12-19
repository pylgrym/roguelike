import { TermIF } from "O1term/03TermIF";
import { Stack } from "O1term/05ScreenStack";
import { GameIF } from "O3build/08GameIF";
import { StepIF } from "O4cmds/27StepIF";
import { MakerIF } from "./06ScreenMakerIF";
import { BaseScreen } from "./09BaseScreen";

export class StepScreen extends BaseScreen {
  name:string = 'step';     
  constructor(game:GameIF, maker:MakerIF, 
              public step:StepIF|null) {    
      super(game,maker); 
  }
  onKey(e:JQuery.KeyDownEvent, 
        stack:Stack):boolean { 
    return false; 
  } // keys dont do anything during anim.
  draw(term:TermIF) { super.draw(term); } 
  onTime(s:Stack):boolean { 
    if (this.step == null) { 
        throw 'step is null'; 
    }
    this.step = this.step.excS();
    if (this.step) { return true; }    
    this.pop_And_RunNPCLoop(s);
    return true;
  }
}
