import { MobAiIF } from "O5ai/10MobAiIF";
import { BuildIF1 } from "./09BuildIF1";

export interface BuildIF2 extends BuildIF1 {
  makeAI(): MobAiIF | null;
}
