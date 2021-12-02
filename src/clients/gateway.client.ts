import { Injectable } from '@angular/core';
import Amplify, { Auth } from 'aws-amplify';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class GatewayClient {
    constructor() {
        Amplify.configure({
            region: environment.amplify.region,
            userPoolId: environment.amplify.userPoolId,
            userPoolWebClientId: environment.amplify.userPoolWebClientId,
            mandatorySignIn: true,
            oauth: {
                domain: environment.amplify.oauthDomain,
                scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
                redirectSignIn: environment.amplify.redirectSignIn,
                redirectSignOut: environment.amplify.redirectSignOut,
                responseType: 'code'
            }
        });
    }
    api: any;

    get(endPoint: string, options = {}): any {
        return new Promise(async (res, rej) => {
            let header = await this.mergeHeader(options);
            try {
                fetch(this.api + endPoint, {
                    headers: header
                })
                    .then((response) => {
                        if (response.status === 401) {
                            this.getToken(true).then(() => {
                                this.get(endPoint, options).then((data: any) => {
                                    res(data);
                                })
                            });
                        } else {
                            response.json().then(json => {
                                res(json);
                            });
                        }
                    }).catch((err) => {
                        rej(err);
                    });
            } catch (err) {
                rej(err);
            }
        });
    }

    getBlob(endPoint: any, options = {}) {
        return new Promise(async (res, rej) => {
            let header = await this.mergeHeader(options);
            try {
                fetch(this.api + endPoint, {
                    headers: header
                })
                    .then((response) => {
                        if (response.status === 401) {
                            this.getToken(true).then(() => {
                                this.get(endPoint, options).then((data: any) => {
                                    res(data);
                                })
                            });
                        }
                        return response.blob();
                    }).then((blob) => {
                        res(blob)
                    }).catch((err) => {
                        console.log(err);
                        rej(err);
                    });
            } catch (err) {
                rej(err);
            }
        });
    }

    post(endPoint: any, options = {}, data = {}) {
        return new Promise(async (res, rej) => {
            let header = await this.mergeHeader(options);
            try {
                fetch(this.api + endPoint, {
                    method: 'POST',
                    headers: header,
                    body: JSON.stringify(data)
                })
                    .then((response) => {
                        if (response.status === 401) {
                            this.getToken(true).then(() => {
                                this.post(endPoint, options, data).then(data => {
                                    res(data);
                                })
                            });
                        }
                        return response.json();
                    }).then(json => {
                        res(json);
                    }).catch((err) => {
                        console.log(err);
                        rej(err);
                    });
            } catch (err) {
                rej(err);
            }
        });
    }

    put(endPoint: any, options = {}, data = {}) {
        return new Promise(async (res, rej) => {
            let header = await this.mergeHeader(options);
            try {
                fetch(this.api + endPoint, {
                    method: 'PUT',
                    headers: header,
                    body: JSON.stringify(data)
                })
                    .then((response) => {
                        if (response.status === 401) {
                            this.getToken(true).then(() => {
                                this.put(endPoint, options, data).then(data => {
                                    res(data);
                                })
                            });
                        }
                        return response.json();
                    }).then(json => {
                        res(json);
                    }).catch((err) => {
                        console.log(err);
                        rej(err);
                    });
            } catch (err) {
                rej(err);
            }
        });
    }

    delete(endPoint: any, options = {}) {
        return new Promise(async (res, rej) => {
            let header = await this.mergeHeader(options);
            try {
                fetch(this.api + endPoint, {
                    method: 'DELETE',
                    headers: header
                })
                    .then((response) => {
                        if (response.status === 401) {
                            this.getToken(true).then(() => {
                                this.delete(endPoint, options).then(data => {
                                    res(data);
                                })
                            });
                        }
                        return response.json();
                    }).then(json => {
                        res(json);
                    }).catch((err) => {
                        console.log(err);
                        rej(err);
                    });
            } catch (err) {
                rej(err);
            }
        });
    }

    mergeHeader(headers = {}): any {
        return new Promise(async (res, rej) => {
            let token = await this.getToken();
            let defaultHeader = {
                'Authorization': 'Bearer ' + token
            };
            res(Object.assign(defaultHeader, headers));
        })
    }

    getToken(force = false) {
        return new Promise(async (res) => {
            let token = localStorage.getItem('token');
            if (!token || force || token === "") {
                let data = await Auth.signIn('tommy@saleslab', 'AntAm15121998@');
                token = data?.signInUserSession?.accessToken?.jwtToken;
                localStorage.setItem('token', token ? token : "");
            }
            res(token);
        })
    }
}
