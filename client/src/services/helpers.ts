// @ts-ignore
import Cookies from 'js-cookie';

export const safeParse = (json: string|null|undefined, defaultTo?: any) => {
    try {
      /* @ts-ignore */
      const parsed = JSON.parse(json);
      return parsed;
    } catch (error) {
      return defaultTo ?? null
    }
}

export const getHeaders = () => {
    const parsedToken = safeParse(Cookies.get('auth_token'))
    const headers =  {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
    }

    if (parsedToken) {
        return { ...headers, Authorization: `Bearer ${parsedToken}`}
    }

    return headers
}