// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   url: 'http://localhost:5000/api',
//   slides: '/slides',
//   locations: '/locations',
//   propertiesAgentid: '/properties-agentid',
//   relatedProperties: '/related-properties',
//   featuredProperties: '/featured-properties',
//   property: '/property',
//   properties: '/properties',

//   apiHome: '/Home',
//   contato: '/Contato',
//   production: false
// };

export const environment = {
  url: 'http://waih.uni5.net/api',
  //url: 'http://localhost:5000/api',
  //slides: '/slides',
  locations: '/locations',
  propertiesAgentid: '/properties-agentid',
  relatedProperties: '/related-properties',
  featuredProperties: '/featured-properties',
  property: '/property',
  properties: '/properties',

  apiHome: '/Home',
  contato: '/Contato',
  production: true
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
