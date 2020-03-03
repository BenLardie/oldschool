import React, { useState, useEffect } from 'react';
import './App.css';
import FeaturedPost from './FeaturedPost'

import * as CosmicFunctions from './cosmicFunctions';   


function App() {
  const [dataReceived, setDataReceived] = useState(false)    
  const [posts, setPosts] = useState([]);
  const [authors, setAuthors] = useState([])
  const [featuredPostIndex, setFeaturedPostIndex] = useState(0)
  const [otherPosts, setOtherPosts] = useState([])

  const getData = async  () =>{
    try {
      const {posts, authors} = await CosmicFunctions.getCosmicJsData();
      setDataReceived(true)
      setPosts(posts)
      setAuthors(authors) 
      setOtherPosts(posts.slice(1))
    }
    catch(err) {
      console.error('Error: Problem retrieving Cosmic JS data');
      console.error(err);
      console.error(err.stack);
      setDataReceived(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])
  console.log(posts)
  return (
    <div className="App">
            <header className="App-header">          
                  Old School Shuffle
            </header>
        <div className="featuredPost">
            <FeaturedPost />
        </div>
        <div className="spotifyPlayer">
            <p>Spotify player here</p>
        </div>
        <div className="otherPosts">
            <p>Other posts here</p>
        </div>
        <div className="footer">
            <p>Footer here</p>
        </div>

      </div>
  );
}

export default App;
