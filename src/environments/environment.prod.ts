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
