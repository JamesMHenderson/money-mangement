import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";

type PageState = {
    page: string,
    objectId?: string,
}

const initialState: PageState = {
  page: 'home',
};

const pageSlice = createSlice({
    name: 'page',
    initialState: initialState,
    reducers: {
        setPage: (state, {payload} : PayloadAction<PageState>) => payload
    }
});

export const selectPageState = ({page}: RootState) => page;

export const { reducer: pageReducer, actions: {setPage} } = pageSlice;
