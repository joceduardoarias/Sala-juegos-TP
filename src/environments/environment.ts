// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDMi-bhDB8D8oZZAMJxaNKzOJHMbdB84qI",
    authDomain: "sala-de-juegos-fc64c.firebaseapp.com",
    projectId: "sala-de-juegos-fc64c",
    storageBucket: "sala-de-juegos-fc64c.appspot.com",
    messagingSenderId: "126117589588",
    appId: "1:126117589588:web:93bfad9f9d6c227e65f3c1"
  },
  apiURL: 'https://breakingbadapi.com/api/characters?limit=25'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
