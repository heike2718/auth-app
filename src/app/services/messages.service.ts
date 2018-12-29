import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Message, INFO, WARN, ERROR } from '../shared/model/message';


@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private infoSubject = new BehaviorSubject<string>('');
  private warnSubject = new BehaviorSubject<string>('');
  private errorSubject = new BehaviorSubject<string>('');


  info$: Observable<string> = this.infoSubject.asObservable();
  warn$: Observable<string> = this.warnSubject.asObservable();
  error$: Observable<string> = this.errorSubject.asObservable();


  constructor() {
    console.log('messagesService instanziiert');
  }



  info(message: string) {
    this.infoSubject.next(message);
  }

  warn(message: string) {
    this.warnSubject.next(message);
  }

  error(message: string) {
    this.errorSubject.next(message);
  }

  neueMessage(message: Message) {
    switch (message.level) {
      case INFO:
        this.info(message.message);
        break;
      case WARN:
        this.warn(message.message);
        break;
      case ERROR:
        this.error(message.message);
        break;
      default:
        this.error('### OMG message ohne level ### ' + message.message);
        break;
    }
  }
}
