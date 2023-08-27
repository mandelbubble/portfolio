import { configureStore, combineReducers } from "@reduxjs/toolkit";

import three from "./slices/three"

const reducer = combineReducers({
    three,
})

const store = configureStore({ reducer })

export default store