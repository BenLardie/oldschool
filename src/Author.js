import React from 'react'
import './Author.css';
import Avatar from '@material-ui/core/Avatar'

const Author = (props) => {
    console.log(props)
    return (
        <div className="Author">
            <Avatar alt={props.authorName} src={props.avatarImageSrc} />
            <p>by {props.authorName}</p>
        </div>
    )
}

export default Author