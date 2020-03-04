import React, { useState, useEffect } from 'react';
import './App.css';
import FeaturedPost from './FeaturedPost'
import OtherPost from './OtherPost';

import * as CosmicFunctions from './cosmicFunctions';   


function App() {
  const [dataReceived, setDataReceived] = useState(false)    
  const [posts, setPosts] = useState([]);
  const [authors, setAuthors] = useState([])
  const [featuredPostIndex, setFeaturedPostIndex] = useState(0)
  const [otherPosts, setOtherPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const getData = async  () =>{
    try {
      const {posts, authors} = await CosmicFunctions.getCosmicJsData();
      setPosts(posts)
      setAuthors(authors) 
      setOtherPosts(posts.slice(1))
      setDataReceived(true)
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
    setLoading(false)
  }, [])
 console.log(posts)
 console.log(dataReceived)
  return (
    <div className="App">
            <header className="App-header">          
                  Old School Shuffle
            </header>
        <div className="featuredPost">
            { dataReceived ? <FeaturedPost post={posts[featuredPostIndex]} /> : ''} 
        </div>
        <div className="spotifyPlayer">
            <p>Spotify player here</p>
        </div>
        <div className="otherPosts">
            <OtherPost otherPosts={otherPosts}/>
        </div>
        <div className="footer">
            <p>Footer here</p>
        </div>

      </div>
  );
}

export default App;
