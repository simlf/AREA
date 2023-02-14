import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as _ from 'lodash';

/**
 * A class to store the response data of a login request.
 */
export class responseLogin {
    /**
     * Constructor for responseLogin class.
     * @param email The email address of the user.
     * @param accessToken The access token for the user.
     * @param id The id of the user.
     */
    constructor(public email: string, public accessToken: string, public id: string) { }
}

/**
 * A class to handle the login request and store the login response data.
 */
export class whoamiRequest {
    /**
     * Constructor for loginRequest class.
     * @param http Angular HttpClient for making HTTP requests.
     */
    constructor(private http: HttpClient) { }

    /**
     * A method to post data to a specified URL and store the login response data.
     * @param url The URL to post the data to.
     * @param data The data to be posted.
     * @param model The model to cast the response to.
     * @returns The casted response.
     */
    public async isUser(): Promise<boolean> {
        const headersBearrer = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('auth_token'),
        });
        const response = await this.http.get('http://localhost:8080/auth/whoami', { headers: headersBearrer }).toPromise();
        console.log(response);
        if (JSON.stringify(response).includes("400"))
            console.log("400");
        else
            console.log("200");
        return false;
    }
}
