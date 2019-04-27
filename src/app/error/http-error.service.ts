import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Logger } from '@nsalaun/ng-logger';
import { MessagesService, Message, WARN, ERROR } from 'hewi-ng-lib';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {

  constructor(private messagesService: MessagesService, private logger: Logger) { }

  handleError(error: HttpErrorResponse, context: string) {

    if (error instanceof ErrorEvent) {
      this.logger.error(context + ': ErrorEvent occured - ' + JSON.stringify(error));
      throw (error);
    } else {
      switch (error.status) {
        case 0:
          this.messagesService.error('Der Server ist nicht erreichbar.');
          break;
        default:
          this.logger.error(context + ': Servererror status=' + error.status);
          const msg = this.extractMessageObject(error);
          if (msg !== null) {
            this.showServerResponseMessage(msg);
          } else {
            this.messagesService.error('Es ist ein unerwarteter Fehler aufgetreten. Bitte senden Sie eine Mail an mathe@egladil.de');
          }
      }
    }
  }

  private extractMessageObject(error: HttpErrorResponse): Message {

    if (error['_body']) {
      // so bekommt man den body als nettes kleines JSON-Objekt :)
      const body = JSON.parse(error['_body']);
      if (body['message']) {
        return <Message>body['message'];
      }
    }

    if (error['error']) {
      const err = error['error'];
      return <Message>err['message'];
    }

    return null;
  }

  private showServerResponseMessage(msg: Message) {
    switch (msg.level) {
      case WARN:
        this.messagesService.error(msg.message);
        break;
      case ERROR:
        this.messagesService.error(msg.message);
        break;
      default:
        this.messagesService.error('Unbekanntes message.level ' + msg.level + ' vom Server bekommen.');
    }
  }
}

