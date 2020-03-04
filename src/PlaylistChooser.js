import React, { useState, useEffect } from 'react';
import './PlaylistChooser.css';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import * as SpotifyFunctions from './spotifyFunctions.js'

const PlaylistChooser = (props) => {
    const [state, setState] = useState({
        addRelatedDiscography: "false",
        playlists: [],
        chosenPlaylistIndex: 0,
        chosenPlaylistName: 'Choose a playlist',
        chosenPlaylistId: null,
        anchorElement: null
    })

    const getPlaylist = async () => {
        await SpotifyFunctions.setAccessToken(props.accessToken);
        const playlists = await SpotifyFunctions.getUserPlaylists();
        setState({playlists: playlists});
    }

    const changeAddRelatedDiscography = e => {
        e.preventDefault()
        setState({addRelatedDiscography: e.target.value})
    }

    const handlePlaylistChooserTopLevelClick = e => setState({anchorElement: e.currentTarget})
    

    const handlePlaylistMenuClick = (e, playlistIndex) => {
        setState({
            chosenPlaylistIndex: playlistIndex,
            chosenPlaylistName: state.playlists[playlistIndex].playlistName,
            chosenPlaylistId: state.playlists[playlistIndex].id,
            anchorElement: null})
    }

    const handlePlaylistMenuClose = e => setState({anchorElement: null})

    const generateListItem = playlistObj => {
        return (
            <ListItem key={playlistObj.id}>
                <ListItemText primary={playlistObj.playlistName}/>
            </ListItem>
        )
    }

    const  generateMenuItem = (playlistObj, index) => {
        return (
            <MenuItem key={playlistObj.id} selected={index === state.chosenPlaylistIndex} onClick={(e) => {handlePlaylistMenuClick(e, index)}}>
                {playlistObj.playlistName}
            </MenuItem>
        )
    }

    useEffect(()=> {
        getPlaylist()
    },[])
    console.log(state)
    return (
        <div className='PlaylistChooser'>
        <List className='playlistViewer'>
          <ListItem button onClick={(e) =>handlePlaylistChooserTopLevelClick(e)}>
            <ListItemText primary="Choose a playlist to shuffle" secondary={state.chosenPlaylistName} />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorelement={state.anchorElement}
          open={Boolean(state.anchorElement)}
          onClose={(e) => handlePlaylistMenuClose(e)}
        >
          {state.playlists.map((playlistObj, index) => {return generateMenuItem(playlistObj, index)})}
        </Menu>
        <div className='optionsSelection'>
        <FormControl component="fieldset" className='optionsSelection'>
          <FormGroup>
          <FormLabel component="legend">Add Related Discography</FormLabel>
          <RadioGroup
            aria-label="Add Related Discography"
            name="addRelatedDiscography"
            value={state.addRelatedDiscography}
            onChange={(e) => changeAddRelatedDiscography(e)}
          >
            <FormControlLabel value="true" control={<Radio />} label="Include" />
            <FormControlLabel value="false" control={<Radio />} label="Just my Playlist" />
          </RadioGroup>
          </FormGroup>
        </FormControl>
        </div>
        <button className="playNowButton" onClick={(e) => {state.addRelatedDiscography === "false" ? SpotifyFunctions.byAlbumNoDiscography(state) : SpotifyFunctions.byAlbumWithDiscography(state)}}>Play Now</button>
        <p className="checkYourPlaylistsAlert">{`You have to have Spotify open to start playback. If Spotify can't find an active device it will create a new playlist you can access later`}</p>
      </div>
    )
}

export default PlaylistChooser