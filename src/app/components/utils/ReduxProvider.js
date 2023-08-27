"use client"

import { memo } from "react"
import { Provider } from "react-redux"

import store from "@/app/lib/redux/store"

const ReduxProvider = ({ children }) => (
    <Provider store={store}>
        {children}
    </Provider>
)

export default memo(ReduxProvider)