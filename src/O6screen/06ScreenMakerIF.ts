import { SScreenIF } from "O1term/05SScreenIF";

export interface MakerIF {
  new_Game():SScreenIF;
  gameOver():SScreenIF;
}
