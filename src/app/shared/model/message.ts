
export const INFO = 'INFO';
export const WARN = 'WARN';
export const ERROR = 'ERROR';

export interface Message {

    level: string;
    message: string;
}


export interface ResponsePayload {
    message: Message;
    data?: any;
}

