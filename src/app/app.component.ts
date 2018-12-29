import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  version = environment.version;
  envName = environment.envName;
  showEnv = !environment.production;
  api = environment.apiUrl;
}
