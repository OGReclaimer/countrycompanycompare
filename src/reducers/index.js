import { combineReducers } from 'redux'

import objectReducer from "./object_reducer"
import loadingReducer from "./loading_reducer"

const rootReducer = combineReducers({
    countryObject: objectReducer,
    loading: loadingReducer
});

export default rootReducer;