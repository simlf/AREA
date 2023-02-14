import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as _ from 'lodash';

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
        const response = await this.http.get('http://localhost:8080/auth/whoami', { headers: headersBearrer }).toPromise()
        .then((data) => {
            return true;
        }).catch((error) => {
            return false;
        });
        return response;
    }
}
