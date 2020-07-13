import React, { Fragment, useState } from 'react'
import { observer } from "mobx-react"
import Button from "@material-ui/core/Button"
import {AddComment, AccountCircle} from '@material-ui/icons'
import ActionButton from '../../UI/ActionButton'
import TextField from "@material-ui/core/TextField"
import {store} from "../../store/index"

const Comment: React.FC<{taskKey: string}> = ({taskKey}) => {

  const { comments } = store;
  console.log(typeof comments)

  const [showCommentForm, setShowCommentForm] = useState(false)

  const [commentValue, setCommentValue] = useState('')

  const postComment = () => {
    if(commentValue) {
      store.postComment(taskKey, commentValue);
      setCommentValue('')
    }
  }

  const deleteComment = (commentKey: string) => {
    store.deleteComments(taskKey, commentKey)
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
                  fn={() => deleteComment(key)}
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
          ? <div className="comment-form">
              <TextField
                fullWidth
                name="comment"
                variant="outlined"
                multiline
                rows="4"
                onChange={e =>
                  setCommentValue(e.target.value)
                }
                value={commentValue}
              />
              <div className="text-center">
                <Button 
                  size="small"
                  variant="contained"
                  startIcon={<AddComment/>} 
                  color="primary" 
                  onClick={() => postComment()}
                >
                  post
                </Button>
              </div>
            </div>
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