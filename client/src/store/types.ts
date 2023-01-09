export type Error = { 
    message: string;
    error?: any
}

export interface User {
    username: string;
    email: string;
    fname: string;
    lname: string;
    id: string;
}

export interface UserState extends User {
    isLoggedIn: boolean;
    status: string;
    error: null | Error
}

export enum ModalOptions {
    login = "login",
    signup = "signup"
}

export type UIState = {
    modal: ModalOptions | null;
}

export type Image = {
    id: string;
    handle: string;
}


interface FetchImagesResponse {
    images: Array<Image>;
    next: string | null;
    prev: string | null;
}

export interface FetchImagesResponseWithError extends FetchImagesResponse {
    error?: Error
}

export interface ImagesState extends FetchImagesResponse {
    offset: number;
    limit: number;
    status: string;
    error: null | Error;
}

export type State = {
    ui: UIState;
    user: UserState;
    images: ImagesState;
}