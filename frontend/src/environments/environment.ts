// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  appName: 'Sicenad DEV',
  production: false,
  sizeMaxEscudo: "2 MB",
  sizeMaxDocRecurso: "10 MB",
  sizeMaxDocSolicitud: "10 MB",
  //endpoint para trabajar en local a H2
  // hostSicenad: 'http://localhost:8080/api/'
  //endpoint para trabajar en local a la BD MINERVA
  hostSicenad: 'http://192.168.100.199:8080/api/'
  //endpoint para atacar la app desplegada en heroku
  //  hostSicenad: 'https://sicenad.herokuapp.com/api/'
  //  hostSicenad: 'https://sicenad2.herokuapp.com/api/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.