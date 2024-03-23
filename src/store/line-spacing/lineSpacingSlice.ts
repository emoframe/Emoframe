import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'

// Define a type for the slice state
interface lineSpacingState {
  value: number
}

// Define the initial state using that type
const initialState: lineSpacingState = {
  value: 0,
}

export const lineSpacingSlice = createSlice({
  name: 'lineSpacing',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    incrementLineSpacing: (state) => {
      state.value += 1
    },
    decrementLineSpacing: (state) => {
      state.value -= 1
    },
  },
})

export const { incrementLineSpacing, decrementLineSpacing } = lineSpacingSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.lineSpacing.value

export default lineSpacingSlice.reducer