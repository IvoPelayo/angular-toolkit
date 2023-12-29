import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class BroadcastService {

  publish<T>(channelName: string, message?: T): void {
    const broadcastChannel = new BroadcastChannel(channelName);
    broadcastChannel.postMessage(message);
  }

  consume<T>(channelName: string): Observable<T> {
    return new Observable(observer => {
      const broadcastChannel = new BroadcastChannel(channelName);
      broadcastChannel.onmessage = (message) => observer.next(message.data);
      broadcastChannel.onmessageerror = (error) => observer.error(error);

      return () => {
        broadcastChannel.close();
      };
    });
  }
}