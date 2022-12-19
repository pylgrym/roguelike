import { StackIF } from "O1term/05ScreenStackIF";
import { Glyph } from "O2model/07Glyph";
import { WPoint } from "O2model/07WPoint";
import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { MakerIF } from "O6screen/06ScreenMakerIF";
import { StepScreen } from "O6screen/27StepScreen";
import { CmdBase } from "./09CmdBase";
import { CmdIF } from "./09CmdIF";
import { BlastStep, School } from "./27BlastStep";
import { DirStep } from "./27DirStep";
import { StepIF } from "./27StepIF";

export class BulletCmd extends CmdBase {
  dir:WPoint = new WPoint();
  constructor(public me:Mob, public g:GameIF, 
              public ss:StackIF, public maker:MakerIF)
  {super(me,g);}
  setDir(dir:WPoint):CmdIF{this.dir=dir; return this;}
  exc():boolean {
    let g=this.g;
    let m=this.me;
    let dmg = 4;
    let school = School.Magic;
    let sprite = Glyph.Bullet;
    let effect = null; // no step-effect.
    let next = new BlastStep(dmg,school,m,g);
    let step:StepIF =
      new DirStep(effect,next,sprite,m.pos.copy(),g);
    step.setDir(this.dir);
    this.ss.push(new StepScreen(g,this.maker,step));
    return false;
  }  
}
