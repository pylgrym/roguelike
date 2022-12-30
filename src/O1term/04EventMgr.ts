import { ResizingTerm } from "./03ResizingTerm";
import { RawScreenIF } from "./04RawScreenIF";

export class EventMgr { 
  constructor(public term:ResizingTerm, 
              public screen:RawScreenIF) 
  {
    $('#body1').on('keydown', this.onKey.bind(this));
    $(window).on('resize', this.onResize.bind(this));
    this.onResize();
    this.initTimer(); // ch27
  }
  onResize() {
    this.term.onResize();
    this.screen.draw(this.term); 
  }
  onKey(e:JQuery.KeyDownEvent) {
    e.originalEvent!.preventDefault(); // this should be merged back from ch04.
    this.screen.onKey(e);
    this.screen.draw(this.term); 
  }

  // ch27
  initTimer() {
    let interval_ms = 100; 
    setInterval(this.onTimer.bind(this), interval_ms); 
  }
  onTimer() { 
    let change:boolean = this.screen.onTime(); 
    if (change) { this.screen.draw(this.term); } 
  } 


  static runRawScreen(rawScreen:RawScreenIF) {
     return new EventMgr(ResizingTerm.StockTerm(), 
                         rawScreen);
  }
}
