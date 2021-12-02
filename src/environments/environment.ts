// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  amplify: {
    region: 'eu-west-2',
    userPoolId: 'eu-west-2_tz6ym19LI',
    userPoolWebClientId: '2fkb6lfipqkm0jvbptv6n60ehv',
    redirectSignIn: 'https://app.seamless.insure',
    redirectSignOut: 'https://app.seamless.insure',
    oauthDomain: 'seamless-tenant-users.auth.eu-west-2.amazoncognito.com',
    authorizedScopes: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
    responseType: 'code'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
