
const regExpForEmail =/\S+@\S+\.\S+/;

export const validateEmail = (email: string) => {
    return Boolean(email.match(regExpForEmail));
};

export const validatePassword = (password: string) => {
    const clearPass = password.trim();

    if (clearPass.length < 8) {
        return false;
    }

    const existUpper = Boolean(clearPass.match(/[A-Z]/));
    const existNumber = Boolean(clearPass.match(/[0-9]/));
    const existSimbol = /^[a-zA-Z0-9]+$/.test(clearPass)

    if (!existUpper || !existNumber || !existSimbol) {
        return false;
    }

    return !clearPass.match(/[^A-Za-z0-9]/);
};

export const setLocalStorageItem = (key: string, value: unknown) => {
    try {
        const valueToSave = JSON.stringify(value);
        localStorage.setItem(key, valueToSave);
    } catch (error) {
        console.log('Ошибка сохранения в localStorage.', error);
    }
};
export const getLocalStorageItem = (key: string) => {
    try {
        const result = localStorage.getItem(key);
        return result ? result : '';
    } catch (error) {
        return '';
    }
};

export const removeLocalStorageItem = (key: string) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.log('Ошибка удаления из localStorage.', error);
    }
};

export interface IPreviousLocations {
    location: { pathname: string };
}
export const getClearLastRoutePath = (previousLocations: Array<IPreviousLocations>) => {
    if (!previousLocations.length) return '';

    return previousLocations[previousLocations.length - 1].location?.pathname.split('/').join('/');
};

export const getCookie = (key: string) => {
    const nameCookie = key + '=';
    const ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }

        if (c.indexOf(nameCookie) == 0) return c.substring(nameCookie.length, c.length);
    }

    return '';
};


export const sortArrayByDate = <T, K extends keyof T>(items: T[], key: K): T[] => {
    const sortedItems = [...items].sort((a: T, b: T) => {
        const date1 = Date.parse(a[key] as string);
        const date2 = Date.parse(b[key] as string);

        if (date1 < date2) {
            return 1;
        }

        return -1;
    });

    return sortedItems;
};
