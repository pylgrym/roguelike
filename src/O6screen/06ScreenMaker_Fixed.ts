import { Stack } from "O1term/05ScreenStack";
import { SScreenIF } from "O1term/05SScreenIF";
import { MakerIF } from "./06ScreenMakerIF";
import { DummyScreen } from "./06DummyScreen";
import { OverScreen0 } from "./06OverScreen";

export class ScreenMaker0_Fixed implements MakerIF {
  new_Game():SScreenIF { return new DummyScreen(this); }
  gameOver():SScreenIF { return new OverScreen0(this); }

  static run_GOfirst(m:MakerIF) {
    Stack.run_SScreen(m.gameOver());
  }
  static StockMaker():MakerIF {
    return new ScreenMaker0_Fixed();
  }
  static GOfirst() {
    this.run_GOfirst(this.StockMaker());
  }  
}
