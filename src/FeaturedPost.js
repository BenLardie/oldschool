import React from 'react'
import './FeaturedPost.css';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

export default function FeaturedPost() {
    return (
        <div className="FeaturedPost">
            <Paper>
                <Typography variant="headline" component="h3">
                    Cake
                </Typography>
            <div className="authorName">
                <p>Giorgio Vasari</p>
            </div>
                <div className="content">
                I am the first great appreciator of art, and I also appreciate the powerful sound of loud trumpets and references to driving cars.
                </div>
                    <button className="playArtist">Play Discography</button>
            </Paper>
        </div>
    )
}
