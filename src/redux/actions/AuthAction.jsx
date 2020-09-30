export const USER_PERMISSION = 'USER_PERMISSION';

export const userAllowed = (bool) => {
    return {
        type: USER_PERMISSION,
        payload:bool
    }
}

export const userNotAllowed = (bool) => {
    return {
        type: USER_PERMISSION,
        payload:bool
    }
}