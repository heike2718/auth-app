import { Component, OnInit } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'auth-temp-password',
	templateUrl: './temp-password.component.html',
	styleUrls: ['./temp-password.component.css']
})
export class TempPasswordComponent implements OnInit {

	constructor(private logger: Logger,
		private router: Router,
		private route: ActivatedRoute) { }

	ngOnInit() {


		// /temppwd?tokenId=bajksosooasoao

	}

}

