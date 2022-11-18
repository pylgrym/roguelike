import { CmdBase } from "./09CmdBase";

export class WaitCmd extends CmdBase {
  exc(): boolean { console.log('wait..'); return true; }
}
