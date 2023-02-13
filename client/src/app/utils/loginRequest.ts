import { HttpClient } from "@angular/common/http";
import * as _ from 'lodash';

export class responseLogin {
    constructor(public email: string, public accessToken: string, public id: string) { }
}

function cast<T>(data: any, model: new (...args: any[]) => T): T {
    const classInstance = new model();
    return _.assign(classInstance, data);
}

export class loginRequest {
    constructor(private http: HttpClient, private email: string, private accessToken: string, private id: string) { email = ""; accessToken = ""; id = ""; }

    public async postData<T>(url: string, data: any, model: new (...args: any[]) => T): Promise<T> {
        const response = await this.http.post(url, data).toPromise()
            .catch((error) => {
                return error;
            });
        const responseCast = response as responseLogin;

        this.email = responseCast.email;
        this.accessToken = responseCast.accessToken;
        this.id = responseCast.id;

        return cast(response, model);
    }

    public getEmail(): string {
        return this.email;
    }

    public getToken(): string {
        return this.accessToken;
    }

    public getId(): string {
        return this.id;
    }

    public saveData() {
        localStorage.setItem('auth_id', this.id);
        localStorage.setItem('auth_email', this.email);
        localStorage.setItem('auth_token', this.accessToken);
    }
}