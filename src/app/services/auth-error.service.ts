import { Injectable } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';
import { MessagesService } from './messages.service';
import { Message, WARN, ERROR, ResponsePayload } from '../shared/model/message';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthErrorService {

  constructor(private logger: Logger, private messagesService: MessagesService) { }

  handleError(error: HttpErrorResponse, context: string) {

    if (error instanceof ErrorEvent) {
      this.logger.error(context + ': ErrorEvent occured - ' + JSON.stringify(error));
      throw (error);
    } else {
      switch (error.status) {
        case 0:
          this.messagesService.error(context +
            ': Server ist nicht erreichbar. Mögliche Ursachen: downtime oder CORS policy. Guckstu Browser- Log (F12)');
          break;
        case 401:
          this.showServerResponseMessage({
            level: 'ERROR',
            message: 'OMG - Not Found'
          });
          break;
        default:
          if (error['_body']) {
            // so bekommt man den body als nettes kleines JSON-Objekt :)
            const body = JSON.parse(error['_body']);
            if (body['message']) {
              const msg = <Message>body['message'];
              this.showServerResponseMessage(msg);
            } else {
              this.messagesService.error(context + ' status=' + error.status
                + ': OMG +++ Divide By Cucumber Error. Please Reinstall Universe And Reboot +++');
            }
          } else {
            this.messagesService.error(context + ' status=' + error.status
              + ': OMG +++ Divide By Cucumber Error. Please Reinstall Universe And Reboot +++');
          }
      }
    }
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
