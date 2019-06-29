# AuthApp

Frontend für authprovider.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

## Dependencies

Benötigt hewi-ng-lib: npm install hewi-ng-lib

## Development server

Run `ng serve --port 4300` for a dev server. Navigate to `http://localhost:4300/`. The app will automatically reload if you change any of the source files.

## Devtest- URL (Abkürzung)

__Change TempPassword__

	http://localhost:4300/password/temp/change?tokenId=jsgdgggAXO

__SignUp__

	http://localhost:4300/signup?clientId=WLJLH4vsldWapZrMZi2U5HKRBVpgyUiRTWwX7aiJd8nX&redirectUrl=http:%2F%2Flocalhost:4200

__LogIn__

	http://localhost:4300/login?clientId=WLJLH4vsldWapZrMZi2U5HKRBVpgyUiRTWwX7aiJd8nX&redirectUrl=http:%2F%2Flocalhost:4200

## Notizen (chronologisch absteigend)

* __Release 1.2.0:__ provide surename and given name
* __Release 1.1.3:__ small devices: less content and smaller font-sizes, forms nerarer to top of page
* __Release 1.1.2:__ fix-fstream-cve
* __Release 1.1.1:__ rename labels submit buttons
* __Release 1.1.0:__ assets werden jetzt immer gefunden
* __Roundtrip mit Redirect fertig (Test-Dialog-Button noch vorhanden):__ commit: a82ed929316c80713a6dbb5fbfeb8d683d266c9c
* __Dialog programmatisch auslösen (zum Test noch mit Button):__ commit d0a4d0df145cae1954976e5833e593f97728ae68
* __POC Aufruf SignInComponent aus checklistenapp:__ commit 411d90cc4fd8e62f1380d70752679c2307d37b44
