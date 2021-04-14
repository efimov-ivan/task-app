import React, { Fragment, useState } from 'react'
import {store} from "../../store/index"
import {observer} from "mobx-react"
import Button from "@material-ui/core/Button"
import {AddComment, AccountCircle} from '@material-ui/icons'
import ActionButton from '../../UI/ActionButton'
// import TextField from "@material-ui/core/TextField"
import CommentForm from './CommentForm'

type PropsType = {
  taskKey: string
}

const Comment: React.FC<PropsType> = ({taskKey}) => {

  const { comments } = store

  const [showCommentForm, setShowCommentForm] = useState<boolean>(false)

  const deleteComment = (ID: string) => {
    store.deleteComment(ID)
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
        ? <CommentForm taskKey={taskKey}></CommentForm>
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