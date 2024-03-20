import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'

// Define a type for the slice state
interface ContrastState {
  value: number
}

// Define the initial state using that type
const initialState: ContrastState = {
  value: 0,
}

export const contrastSlice = createSlice({
  name: 'contrast',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    incrementContrast: (state) => {
    //   TODO: If value is 10, send a message that is not possible to increment more
        state.value += 1
    },
    decrementContrast: (state) => {
    //   TODO: If value is -5, send a message that is not possible to decrement more
        state.value -= 1
    },
  },
})

export const { incrementContrast, decrementContrast } = contrastSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.contrast.value

export default contrastSlice.reducer