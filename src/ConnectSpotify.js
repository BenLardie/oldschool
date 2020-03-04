import React from 'react';
import './ConnectSpotify.css';
import * as SpotifyFunctions from './spotifyFunctions.js'

const ConnectSpotify = () => {

    return (
      <div className="ConnectSpotify">
        <a href={SpotifyFunctions.redirectUrlToSpotifyForLogin()}>
            <button>Connect to Spotify</button>
        </a>
      </div>
    );
  }

export default ConnectSpotify;