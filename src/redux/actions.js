export const SET_NAME = 'SET NAME';

export function setName(newName) {
    return {
        type: SET_NAME,
        payload: newName
    }
}