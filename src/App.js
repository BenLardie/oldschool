import React, { useState, useEffect } from 'react';
import './App.css';
import FeaturedPost from './FeaturedPost'
import SpotifyContainer from './SpotifyContainer';
import OtherPost from './OtherPost';

import * as CosmicFunctions from './cosmicFunctions';


function App() {
  const [dataReceived, setDataReceived] = useState(false)
  const [posts, setPosts] = useState([]);
  const [authors, setAuthors] = useState([])
  const [featuredPostIndex, setFeaturedPostIndex] = useState(0)
  const [otherPosts, setOtherPosts] = useState([])

  const getData = async () => {
    try {
      const { posts, authors } = await CosmicFunctions.getCosmicJsData();
      setPosts(posts)
      setAuthors(authors)
      setOtherPosts(posts.slice(1))
      setDataReceived(true)
    }
    catch (err) {
      console.error('Error: Problem retrieving Cosmic JS data');
      console.error(err);
      console.error(err.stack);
      setDataReceived(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const changeFeaturedPost = (index) => {
    let copyOfPosts = posts.slice();
    copyOfPosts.splice(index, 1);
    setFeaturedPostIndex(index)
    setOtherPosts(copyOfPosts);
  }

  return (
    <div className="App">
      <header className="App-header">
        Ben's Spotify Blog
            </header>
      <div className="featuredPost">
        {dataReceived ? <FeaturedPost post={posts[featuredPostIndex]} /> : ''}
      </div>
      <div className="spotifyPlayer">
        <SpotifyContainer />
      </div>
      <div className="otherPosts">
        <OtherPost allPosts={posts} otherPosts={otherPosts} changeFeaturedPost={(index) => changeFeaturedPost(index)} />
      </div>
      <div className="footer">
        <p>Made by Ben Lardie</p>
      </div>

    </div>
  );
}

export default App;
