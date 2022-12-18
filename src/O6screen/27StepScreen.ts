export class StepScreen extends BaseScreen {
  name:string = 'step';     
  constructor(game:GameIF, maker:MakerIF, 
              public step:StepIF|null) {    
      super(game,maker); 
  }
  onKey(e:JQuery.KeyDownEvent, 
        stack:ScreenStack):boolean { 
    return false; 
  } // keys dont do anything during anim.
  draw(term:Term) { super.draw(term); } 
  onTime(s:ScreenStack):boolean { 
    if (this.step == null) { 
        throw 'step is null'; 
    }
    this.step = this.step.excS();
    if (this.step) { return true; }    
    this.pop_And_RunNPCLoop(s);
    return true;
  }
}
