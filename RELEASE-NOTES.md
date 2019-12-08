# auth-app Release Notes


__Release 3.3.0:__ [upgrade to hewi-ng-lib@4.0.0](https://github.com/heike2718/auth-app/issues/9)

__Release 3.2.3:__ [Issue 6](https://github.com/heike2718/auth-app/issues/6)

__Release 3.2.2:__ logging framework replaced by hewi-ng-lib

__Release 3.2.1:__ migrated to angular 8

__Release 3.1.0:__ default role heißt jetzt STANDARD, statt USER

__Release 3.0.0:__ (nicht abwärtskompatibel) Signatur JWTPayload hat sich geändert, clients. kein refreshToken mehr erforderlich - redirect url geändert

__Release 2.0.0:__ (nicht abwärtskompatibel) Clients müssen statt der clientID ein gültiges accessToken mitgeben (siehe URLs oben)

__Release 1.3.0:__ handle foregot password

__Release 1.2.0:__ provide surename and given name

__Release 1.1.3:__ small devices: less content and smaller font-sizes, forms nerarer to top of page

__Release 1.1.2:__ fix-fstream-cve

__Release 1.1.1:__ rename labels submit buttons

__Release 1.1.0:__ assets werden jetzt immer gefunden

__Roundtrip mit Redirect fertig (Test-Dialog-Button noch vorhanden):__ commit:
a82ed929316c80713a6dbb5fbfeb8d683d266c9c

__Dialog programmatisch auslösen (zum Test noch mit Button):__ commit d0a4d0df145cae1954976e5833e593f97728ae68

__POC Aufruf SignInComponent aus checklistenapp:__ commit 411d90cc4fd8e62f1380d70752679c2307d37b44
