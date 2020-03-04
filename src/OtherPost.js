import React from 'react'
import './otherPost.css';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

const OtherPosts = (props) => {
    const handleClick = (targetPostObject) =>{
        const allPosts = props.allPosts
        const targetIndex = allPosts.findIndex((postObject) => {
          return targetPostObject._id === postObject._id
        })
        props.changeFeaturedPost(targetIndex);
      }
    return (
        <div className="OtherPosts">
        <ExpansionPanel>
          <ExpansionPanelSummary>
            <Typography>Previous Posts</Typography>
          </ExpansionPanelSummary>
          {props.otherPosts.map((postObject, index) => {
          return (
            <ExpansionPanelDetails key={`otherPost-${index}`} onClick={(e) => {handleClick(postObject)}}>
              <Typography>
                {postObject.title}
              </Typography>
            </ExpansionPanelDetails>
          )
        })}
        </ExpansionPanel>
        </div>
    )
}

export default OtherPosts