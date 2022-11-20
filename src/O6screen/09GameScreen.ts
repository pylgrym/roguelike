import { StackIF } from "O1term/05ScreenStackIF";
import { GameIF } from "O3build/08GameIF";
import { MakerIF } from "./06ScreenMakerIF";
import { BaseScreen } from "./09BaseScreen";
import { ParsePly } from "./09ParsePly";

export class GameScreen extends BaseScreen {
  name='game';
  constructor(game:GameIF,make:MakerIF) {
    super(game, make);    
  }
  onKey(e:JQuery.KeyDownEvent, s:StackIF) {
    this.plyKeyTurn(s, ParsePly.keyPressToCode(e),e);
  }
  plyKeyTurn(s:StackIF, c:string,
             e:JQuery.KeyDownEvent|null):void { 
    if (this.game.log) {
      this.game.log.clearQueue();
    }    
    if (this.plyTurn(s,c,e)) { this.npcTurns(s); }
  }    

  plyTurn(s:StackIF, c:string,
          e:JQuery.KeyDownEvent|null):boolean {
    let parser = new ParsePly(this.game, this.make);
    return parser.parseKeyCodeAsTurn(c,s,e);
  }
}
