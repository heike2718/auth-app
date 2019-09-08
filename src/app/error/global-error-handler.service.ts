import { Injectable, ErrorHandler, Injector } from '@angular/core';
// import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Logger } from '@nsalaun/ng-logger';
import { LogService, MessagesService } from 'hewi-ng-lib';
import { LogPublishersService } from '../logger/log-publishers.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

	private logService: LogService;
	private logger: Logger;


	constructor(private injector: Injector) {

		// ErrorHandler wird vor allen anderen Injectables instanziiert,
		// so dass man benötigte Services nicht im Konstruktor injekten kann !!!
		const logPublishersService = this.injector.get(LogPublishersService);
		this.logService = this.injector.get(LogService);
		this.logService.registerPublishers(logPublishersService.publishers);

		this.logger = this.injector.get(Logger);
	}

	handleError(error: any): void {
		let message = 'Unerwarteter Fehler aufgetreten :/';

		if (error.message) {
			message += ': ' + error.message;
		}

		// try sending an Error-Log to the Server
		this.logService.error(message, 'auth-app');

		if (error instanceof HttpErrorResponse) {
			this.logger.debug('das sollte nicht vorkommen, da diese Errors vom ChecklistenService behandelt werden');
		} else {
			this.logger.error('Unerwarteter Fehler: ' + error.message);
		}

		this.injector.get(MessagesService).error(message);

		// const router = this.injector.get(Router);
		// router.navigateByUrl('/error');
	}
}


