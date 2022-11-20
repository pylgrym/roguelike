import { StackIF } from "O1term/05ScreenStackIF";
import { GameIF } from "O3build/08GameIF";
import { MakerIF } from "./06ScreenMakerIF";
import { BaseScreen } from "./09BaseScreen";

export class MoreScreen extends BaseScreen {
  name='more'; 
  constructor(game:GameIF, make:MakerIF) {
    super(game,make);
  }
  onKey(e:JQuery.KeyDownEvent, s:StackIF) {
    let log = this.game.log;
    log.dequeue();
    if (!log.queuedMsgs()) { s.pop(); }
  }
}
