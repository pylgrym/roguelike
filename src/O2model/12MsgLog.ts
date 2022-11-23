export class MsgLog {
  queue: string[] = [];
  archive: string[] = [];
  msg(s:string, flash:boolean) {
    this.queue.push(s);
    if (!flash) { this.archive.push(s); }
    console.log(s);
  }
  dequeue() { this.queue.shift(); }
  top() {
    return this.empty() ? '-' : this.queue[0];
  }
  clearQueue() { this.queue = []; }
  queuedMsgs():boolean { return this.len()>1; }
  len():number { return this.queue.length; }
  empty():boolean {return !this.queue.length; }    
}
