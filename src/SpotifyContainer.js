import React, { useState, useEffect } from 'react';
import './SpotifyContainer.css';
import Paper from '@material-ui/core/Paper';
import ConnectSpotify from './ConnectSpotify';
import * as SpotifyFunctions from './spotifyFunctions.js'

const SpotifyContainer = () => {
    const [state, setState] = useState({
        loggedInToSpotify: false,
        accessToken: null
        })


    useEffect(() => {
        const accessToken = SpotifyFunctions.checkUrlForSpotifyAccessToken();
        accessToken ? setState({
            loggedInToSpotify: true,
            accessToken: accessToken}) : setState({
                loggedInToSpotify: false,
                accessToken: accessToken})
            },[state.accessToken])

            console.log(state.loggedInToSpotify)
    return (
        <div className="SpotifyContainer">
        <Paper>
          <p>Spotify Controls</p>
          { !state.loggedInToSpotify ? <ConnectSpotify /> : <p>{`We're in! Access Token is ${state.accessToken}`}</p> }
          </Paper>
        </div>
    );
  }

export default SpotifyContainer;