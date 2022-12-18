export class BulletCmd extends CmdBase {
  dir:WPoint = new WPoint();
  constructor(public mob:Mob, public game:GameIF, 
              public ss:StackIF, public maker:MakerIF)
  {super();}
  setDir(dir:WPoint):CmdIF{this.dir=dir; return this;}
  exc():boolean {
    let g=this.game;
    let m=this.mob;
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
