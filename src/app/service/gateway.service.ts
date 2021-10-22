import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GatewayService {
  constructor(public socket: Socket) {}
  getMessage() {
    return this.socket.fromEvent('events');
  }
}
