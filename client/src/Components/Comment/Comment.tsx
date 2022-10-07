import React, { Fragment, useState } from 'react'
import {store} from "../../store/index"
import {observer} from "mobx-react"
import {Button} from "@mui/material"
import {AddComment, AccountCircle} from '@mui/icons-material';
import ActionButton from '../../UI/ActionButton'
import CommentForm from './CommentForm'
import {taskID, commentID} from '../../store/types'

type PropsType = {
  taskID: taskID
}

const Comment: React.FC<PropsType> = ({taskID}) => {

  const { comments } = store

  const [showCommentForm, setShowCommentForm] = useState<boolean>(false)

  const deleteComment = (ID: commentID) => {
    store.deleteComment(taskID, ID)
  }

  return (
    <Fragment>
      <div className="comments-list">
        { comments 
          ? Object.keys(comments).map((key) => (
              <div className="comment" key={key}>
                <div className="comment-content">
                  <AccountCircle className="icon"/>
                  {comments[key].comment}
                </div>
                <ActionButton
                  fn={() => deleteComment(comments[key]._id)}
                  text="delete"
                  color="primary"
                  className="delete"
                  size="small"
                  variant="text"
                  style={{fontSize:"10px"}}
                />
              </div>
            ))
          : null
        }
      </div>
      { showCommentForm
        ? <CommentForm taskID={taskID}></CommentForm>
        : <div className="text-center">
            <Button 
              size="small" 
              color="primary"
              variant="contained"
              startIcon={<AddComment/>}
              onClick={() => setShowCommentForm(true)}
            >
              post comment
            </Button>
          </div>
      }
    </Fragment>
  )
}

export default observer(Comment)