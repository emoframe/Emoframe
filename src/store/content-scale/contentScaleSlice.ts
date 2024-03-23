import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'

// Define a type for the slice state
interface ContentScaleState {
  value: number
}

// Define the initial state using that type
const initialState: ContentScaleState = {
  value: 0,
}

export const contentScaleSlice = createSlice({
  name: 'contentScale',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    incrementContentScale: (state) => {
    //   TODO: If value is 10, send a message that is not possible to increment more
        state.value += 1
    },
    decrementContentScale: (state) => {
    //   TODO: If value is -5, send a message that is not possible to decrement more
        state.value -= 1
    },
  },
})

export const { incrementContentScale, decrementContentScale } = contentScaleSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.contentScale.value

export default contentScaleSlice.reducer