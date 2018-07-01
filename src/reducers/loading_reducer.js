import {
    LOADING,
    LOADED
} from "../actions/types"


export default function(state = {}, action) {
    switch(action.type){ 
        case LOADING:
            return {...state, loading: true}
        case LOADED:
            return {...state, loading: false}
    }
    return state
}