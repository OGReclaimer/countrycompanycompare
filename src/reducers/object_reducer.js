import { 
    COUNTRY,
    SVG
} from "../actions/types"

export default function(state = null, action) {
    switch(action.type){
        case COUNTRY: 
            return {...state, country: action.payload }
        case SVG:
            return {...state, url: action.payload }
    }
    return state
}