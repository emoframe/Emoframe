import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'

// Define a type for the slice state
interface ContrastState {
  value: boolean
}

// Define the initial state using that type
const initialState: ContrastState = {
  value: false,
}

export const contrastSlice = createSlice({
  name: 'contrast',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toogleHighlightLink: (state) => {
        state.value = !state.value;
    }
  },
})

export const { toogleHighlightLink } = contrastSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.contrast.value

export default contrastSlice.reducer