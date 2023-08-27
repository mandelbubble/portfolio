import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    desktopBlob : null,
    desktopTextureNeedsUpdate : false,
    computerIsVisible: false,
    commandPromptSketchIsReady: false,
}

const threeSlice = createSlice({
    name: 'three',
    initialState,
    reducers: {
        updateDesktopBlob : (state, { payload }) => {
            if (state.desktopBlob) URL.revokeObjectURL(state.desktopBlob)
            state.desktopBlob = payload
        },
        setDesktopTextureNeedsUpdate : (state, { payload }) => {
            state.desktopTextureNeedsUpdate = payload
        },
        showComputer : (state) => {
            state.computerIsVisible = true
        },
        setCommandPromptSketchReady : state => {
            state.commandPromptSketchIsReady = true
        }
    }
})

export const selectDesktopBlob = state => state.three.desktopBlob
export const selectDesktopTextureNeedsUpdate = state => state.three.desktopTextureNeedsUpdate
export const selectComputerIsVisible = state => state.three.computerIsVisible
export const selectCommandPromptSketchIsReady = state => state.three.commandPromptSketchIsReady

export const {
    updateDesktopBlob,
    setDesktopTextureNeedsUpdate,
    showComputer,
    setCommandPromptSketchReady,
} = threeSlice.actions

export default threeSlice.reducer