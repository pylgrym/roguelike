import { DMapIF } from "O2model/07DMapIF";
import { Glyph } from "O2model/07Glyph";
import { WPoint } from "O2model/07WPoint";
import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { CmdBase } from "./09CmdBase";

export class DigCmd extends CmdBase {
  constructor(
    public dir:WPoint, public me:Mob, 
    public g:GameIF
  ) { super(me,g); }
  exc(): boolean {
    let game = this.g;
    let ply = game.ply;
    let map = <DMapIF> game.curMap();
    let np = ply.pos.plus(this.dir);
    let cell = map.cell(np);
    let e = cell.env;
    if (e != Glyph.Wall && e != Glyph.Rock) { // bug seen in 29, must be fixed in 26.
      game.flash('No rock to dig in.');
      console.log('not rock:',Glyph[e]);
      return false;
    }
    let rnd = this.g.rnd;
    let dug = rnd.oneIn(10);
    if (dug) {
      cell.env = Glyph.Floor;
      game.msg('ply broke the rock.');
    } else {
      game.flash('ply digs..');
    }
    return true;
  }
}
