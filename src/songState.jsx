import { createSlice } from "@reduxjs/toolkit";


export const songSlice = createSlice({
    name:"songs",
    initialState:{
        songs:[],
        userAddedSongs:[],
        isLoading : false,
        upload:[]
    },
    reducers:{
        getSongsFetch:(state)=>{
            state.isLoading = true
        },
        getSongsSuccess:(state,action)=>{
            state.songs= action.payload;
            state.isLoading = false;
        },
        getSongsFailure:(state)=>{
            state.isLoading = false;
        },
        addSongs:(state,action)=>{
         state.userAddedSongs.push(action.payload);
        },
        updateSongs:(state,action)=>{
         const { trackId,artistName} = action.payload;
         const container = state.userAddedSongs.find(f=>f.trackId==trackId);
         if(container){
            container.trackId = trackId;
            container.artistName = artistName;
         }
        },
        deleteSongs:(state,action)=>{
            const {trackId} = action.payload;
            const findIndex = state.userAddedSongs.findIndex(i=>i.trackId==trackId);
            findIndex !== -1 && state.userAddedSongs.splice(findIndex,1);
        },
        uploadSongs:(state,action)=>{

            const upload = action.payload;
          
            state.upload.push(upload)
        },
       deleteUpload:(state,action)=>{
        const {name} = action.payload;
        const findIndex = state.upload.findIndex(i=>i.audio.name==name);
        findIndex !== -1 && state.upload.splice(findIndex,1);
       }
        
    }
    
})

export const {getSongsFetch,getSongsSuccess,getSongsFailure,addSongs,updateSongs,deleteSongs,uploadSongs,deleteUpload} = songSlice.actions;
export default songSlice.reducer;