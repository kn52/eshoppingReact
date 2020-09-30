export const PERMISSION = 'PERMISSION';

export const authAllowed = (bool) => {
    return {
        type: PERMISSION,
        payload:bool
    }
}

export const authNotAllowed = (bool) => {
    return {
        type: PERMISSION,
        payload:bool
    }
}