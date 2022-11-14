import { ResizingTerm } from "O1term/03ResizingTerm";
import { TestTerm } from "O1term/03TestTerm";

let term = ResizingTerm.StockTerm();
function onResize() {
  term.onResize();
  TestTerm.test2(term, '-');
}
$(window).on('resize', onResize);
onResize();
