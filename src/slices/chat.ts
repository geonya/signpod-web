import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'chat',
  initialState: {},
  reducers: {},
})

export const chatReducer = slice.reducer
