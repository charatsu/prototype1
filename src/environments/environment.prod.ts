export const environment = {
  production: true,
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
