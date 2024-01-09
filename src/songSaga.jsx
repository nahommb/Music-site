import {call, put,takeEvery} from 'redux-saga/effects';
import { getSongsSuccess } from './songState';

function* doGetSongsFetch(){
   
    const songs = yield call(()=>fetch(" https://itunes.apple.com/search?term=beutiful"));
    const formattedSongs = yield songs.json();
    yield put(getSongsSuccess(formattedSongs.results))
}

function* songSaga(){
    yield takeEvery("songs/getSongsFetch" ,doGetSongsFetch)
}

export default songSaga;