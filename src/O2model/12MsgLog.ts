export class MsgLog {
  queue: string[] = [];
  archive: string[] = [];
  msg(s:string) {
    this.archive.push(s);
    this.queue.push(s);
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
