// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverURL: "http://localhost:5001/joshsjingles/us-central1/app/",
  firebase: {
    apiKey: "AIzaSyDiBfxYUc9c-X57Hl7xP27qb14KMgTcM_8",
    authDomain: "joshsjingles.firebaseapp.com",
    databaseURL: "https://joshsjingles.firebaseio.com",
    projectId: "joshsjingles",
    storageBucket: "joshsjingles.appspot.com",
    messagingSenderId: "914876195169"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
