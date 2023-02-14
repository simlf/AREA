import { HttpClient } from "@angular/common/http";
import * as _ from 'lodash';

export class responseRegister {
    constructor(public success: string, public message: string) { }
}

function cast<T>(data: any, model: new (...args: any[]) => T): T {
    const classInstance = new model();
    return _.assign(classInstance, data);
}

export class registerRequest {
    private success: string;
    private message: string;

    constructor(private http: HttpClient) { this.success = ""; this.message = ""; }

    public async postData<T>(url: string, data: any, model: new (...args: any[]) => T): Promise<T> {
        console.log(data)
        const response = await this.http.post(url, data).toPromise()
            .catch((error) => {
                return error;
            });
        const responseCast = response as responseRegister;

        this.success = responseCast.success;
        this.message = responseCast.message;
        return cast(response, model);
    }

    public getMessage(): string {
        return this.message;
    }

    public getSucces(): string {
        return this.success;
    }
}