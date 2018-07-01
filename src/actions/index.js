import {
    COUNTRY,
    SVG,
    LOADING,
    LOADED
} from "./types"

export function saveToState(obj){
    return function(dispatch) {
        dispatch({
            type: COUNTRY,
            payload: obj
        })
    }
}

export function saveSVGToState(url) {
    return function(dispatch) {
        dispatch({
            type: SVG,
            payload: url
        })
    }
}

export function load() {
    return function(dispatch) {
        dispatch({
            type: LOADING
        })
    }
}

export function loaded() {
    return function(dispatch) {
        dispatch({
            type: LOADED
        })
    }
}