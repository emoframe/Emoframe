import { configureStore } from '@reduxjs/toolkit'

import fontSizeReducer from './font-size/fontSizeSlice'
import contrastReducer from './contrast/constrastSlice'
import textAlignmentReducer from './text-alignment/textAlignmentSlice'
import highlightLinkReducer from './highlight-link/highlightLinkSlice'
import lineSpacingReducer from './line-spacing/lineSpacingSlice'
import contentScaleReducer from './content-scale/contentScaleSlice';

export const store = configureStore({
  reducer: {
    fontSize: fontSizeReducer,
    contrast: contrastReducer,
    textAlignment: textAlignmentReducer,
    highlightLink: highlightLinkReducer,
    lineSpacing: lineSpacingReducer,
    contentScale: contentScaleReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch