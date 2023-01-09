// * base urls
const BASE_URL = 'http://localhost:8080';
const AUTH_BASE_URL = `${BASE_URL}/auth`;
const IMAGES_BASE_URL = `${BASE_URL}/images`;
const USER_BASE_URL = `${BASE_URL}/users`;

// * auth endpoints
export const LOGIN = `${AUTH_BASE_URL}/login`;

// * user endpoints
export const CREATE_USER = `${USER_BASE_URL}/create`;

// * image(s) endpoints
export const FETCH_IMAGES = `${IMAGES_BASE_URL}/user`;
export const UPLOAD_IMAGE = `${IMAGES_BASE_URL}/upload`;
export const CDN_BASE_SRC = 'https://cdn.filestackcontent.com'
