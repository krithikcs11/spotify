import React, {useEffect, useState} from 'react';
import './App.css';
import Login from './Login'
import { getTokenFromResponse } from './Spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './Player'
import {useStateValue} from './StateProvider'


const spotify = new SpotifyWebApi();

const App = ()  => {
  
  const [{user, token, playlists}, dispatch] = useStateValue();
  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash = "";
    const _token = hash.access_token;

    if(_token) {
      dispatch({
        type: 'SET_TOKEN',
        token: _token,
      })
     
      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
       

        dispatch({
          type: 'SET_USER',
          user: user,

        })
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists : playlists,
        });
      });

      spotify.getPlaylist("6il7f7CnA9kuSPQIYbOzBV").then((response) => {
        dispatch({
          type: 'SET_DISCOVER_WEEKLY',
          discover_weekly: response,
        })
      } )
    }
  
    
    console.log('token is',token)
  },[token, dispatch]);

  console.log(':)', user);
  console.log('alien',token);
  console.log('playlists',playlists)



  return (
    <div className="App">
      {
        token? (
          <Player  spotify={spotify} />
        ) : (
          <Login />
        )
      }
    
    </div>
  );
}

export default App;
