import { StackIF } from "O1term/05ScreenStackIF";
import { Glyph } from "O2model/07Glyph";
import { WPoint } from "O2model/07WPoint";
import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { MakerIF } from "O6screen/06ScreenMakerIF";
import { StepScreen } from "O6screen/27StepScreen";
import { CmdBase } from "./09CmdBase";
import { CmdIF } from "./09CmdIF";
import { DirStep } from "./27DirStep";
import { StepIF } from "./27StepIF";
import { PayloadStep } from "./29PayloadStep";

export class PayloadCmd extends CmdBase {
  dir:WPoint = new WPoint();
  constructor(public me:Mob, public g:GameIF, 
              public ss:StackIF, public maker:MakerIF,
              public payload:CmdIF)
  {super(me,g);}
  setDir(dir:WPoint):CmdIF{this.dir=dir; return this;}
  exc():boolean {
    let g=this.g;
    let m=this.me;
    let sprite = Glyph.Bullet;
    let effect = null; // no step-effect.
    let next = new PayloadStep(m,g, this.payload);
    let step:StepIF =
      new DirStep(effect,next,sprite,m.pos.copy(),g);
    step.setDir(this.dir);
    this.ss.push(new StepScreen(g,this.maker,step));
    return false;
  }  
}
