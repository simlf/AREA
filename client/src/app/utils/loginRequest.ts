import { HttpClient } from "@angular/common/http";
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
 * A function to cast an object to a specified model.
 * @param data The data to be cast.
 * @param model The model to cast the data to.
 * @returns The casted data.
 */
function cast<T>(data: any, model: new (...args: any[]) => T): T {
    const classInstance = new model();
    return _.assign(classInstance, data);
}

/**
 * A class to handle the login request and store the login response data.
 */
export class loginRequest {
    /**
     * Email of the user.
     */
    private email: string;

    /**
     * Access token of the user.
     */
    private accessToken: string;

    /**
     * Id of the user.
     */
    private id: string;

    /**
     * Constructor for loginRequest class.
     * @param http Angular HttpClient for making HTTP requests.
     */
    constructor(private http: HttpClient) { 
        this.email = ""; 
        this.accessToken = ""; 
        this.id = ""; 
    }

    /**
     * A method to post data to a specified URL and store the login response data.
     * @param url The URL to post the data to.
     * @param data The data to be posted.
     * @param model The model to cast the response to.
     * @returns The casted response.
     */
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

    /**
     * Get the email of the user.
     * @returns The email of the user.
     */
    public getEmail(): string {
        return this.email;
    }

    /**
     * Get the access token of the user.
     * @returns The access token of the user.
     */
    public getToken(): string {
        return this.accessToken;
    }

    /**
     * Get the id of the user.
     * @returns The id of the user.
     */
    public getId(): string {
        return this.id;
    }
    /**
     * A function to save the login data to local storage.
     */
    public saveData() {
        localStorage.setItem('auth_id', this.id);
        localStorage.setItem('auth_email', this.email);
        localStorage.setItem('auth_token', this.accessToken);
    }
}