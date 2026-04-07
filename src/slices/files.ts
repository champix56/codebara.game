import { createSlice } from '@reduxjs/toolkit'
import { ROOT } from '../tools/fs'
import { IFile } from '../interfaces/files'

interface IFilesState{
    files:Array<IFile>
    baseloc:string
}
const initialState:IFilesState = {
    baseloc:ROOT,
    files:[]
}

const files = createSlice({
  name: 'files',
  initialState,
  reducers: {
    initFilesList:(s,a)=>{
        s.files=a.payload
    }
  }
});

export const {initFilesList} = files.actions

export default files.reducer