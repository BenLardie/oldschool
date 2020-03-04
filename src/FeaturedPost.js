import React from 'react'
import './FeaturedPost.css';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Author from './Author'

export default function FeaturedPost(props) {

    const createMarkup = (htmlString) => {
        return {__html: htmlString}
    }

    console.log(props.post.title)

    return (
        <div className="FeaturedPost">
            <Paper>
                <Typography component="h3">
                    {props.post.title}
                </Typography>
                <Author authorName={props.post.metadata.author.title} avatarImageSrc={props.post.metadata.author.metadata.avatarimage.url}/>
                <div className="content" dangerouslySetInnerHTML={createMarkup(props.post.content)}>
                </div>
                    <button className="playArtist">Play Discography</button>
            </Paper>
        </div>
    )
}
