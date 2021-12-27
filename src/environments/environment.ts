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
  },
  userId: '8147e34e-2d41-4d5e-8d12-0d91b87dd6b0',
  productPA: 'product-ec7b818d-2b27-08d9-6f58-3d38e85eb6cb',
  productCTPL: 'product-1731d8ec-2b30-08d9-9140-094e89f102c5'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
