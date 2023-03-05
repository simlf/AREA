import { HttpClient } from "@angular/common/http";
import * as _ from 'lodash';

/**
 * A class to store the response data of a login request.
 */
export class responseWorkflows {
    /**
     * Constructor for responseWorkflow class.
     * @param id The id of the workflow.
     */
    constructor(public id: string, public actionName: string, public reactionName: string, public userId: string, public workflowName: string, public description: string, public logo: string, public url: string, public img: string, public active: boolean) { }
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
 * A class to handle the workflow request and store the Workflow response data.
 */
export class workflowRequest {

    /**
     * Id of the workflow.
     */
    private id: string;
    private actionName: string;
    private reactionName: string;
    private userId: string;
    private workflowName: string;
    private description: string;
    private logo: string;
    private url: string;
    private img: string;
    private active: boolean;

    /**
     * Constructor for loginRequest class.
     * @param http Angular HttpClient for making HTTP requests.
     */
    constructor(private http: HttpClient) { 
        this.id = "";
        this.actionName = "";
        this.reactionName = "";
        this.userId = "";
        this.workflowName = "";
        this.description = "";
        this.logo = "";
        this.url = "";
        this.img = "";
        this.active = false;
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
        const responseCast = response as responseWorkflows;

        this.id = responseCast.id;
        this.actionName = responseCast.actionName;
        this.reactionName = responseCast.reactionName;
        this.userId = responseCast.userId;
        this.workflowName = responseCast.workflowName;
        this.description = responseCast.description;
        this.logo = responseCast.logo;
        this.url = responseCast.url;
        this.img = responseCast.img;
        this.active = responseCast.active;
        return cast(response, model);
    }

    /**
     * Get the id of the workflow.
     * @returns The id of the workflow.
     */
    public getId(): string {
        return this.id;
    }

    /**
     * Get the actionName of the workflow.
     * @returns The actionName of the workflow.
    */
    public getActionName(): string {
        return this.actionName;
    }

    /**
     * Get the reactionName of the workflow.
     * @returns The reactionName of the workflow.
    */
    public getReactionName(): string {
        return this.reactionName;
    }

    /**
    * Get the state of the workflow.
    * @returns The state of the workflow.
    */
    public getActiveState(): boolean {
        return this.active;
    }
}