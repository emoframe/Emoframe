import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'

// Define a type for the slice state
interface FontSizeState {
  value: number
}

// Define the initial state using that type
const initialState: FontSizeState = {
  value: 0,
}

export const fontSizeSlice = createSlice({
  name: 'fontSize',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    incrementFontSize: (state) => {
      state.value += 1
    },
    decrementFontSize: (state) => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { incrementFontSize, decrementFontSize, incrementByAmount } = fontSizeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.fontSize.value

export default fontSizeSlice.reducer