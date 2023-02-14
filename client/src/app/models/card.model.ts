
export interface action {
    name: string;
    description: string;
  }
  
  export interface reaction {
    name: string;
    description: string;
  }
  
  export interface Service {
    name: string;
    actions?: action[];
    reactions?: reaction[];
  }
  
  export interface Client {
    host: string;
  }
  
  export interface Server {
    currentTimeServer: string;
    services: Service[];
  }
  export interface About {
    client: Client;
    server: Server; 
  }

export interface Card {
    name: string;
    description: string;
    img: string;
    logo: string;
    url: string;
}