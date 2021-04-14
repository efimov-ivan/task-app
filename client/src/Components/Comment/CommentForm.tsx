import React, { useState } from 'react'
import { store } from "../../store/index"
import { observer } from "mobx-react"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { AddComment } from '@material-ui/icons'

type PropsType = {
    taskKey: string
}

const CommentForm: React.FC<PropsType> = ({ taskKey }) => {

    const [commentValue, setCommentValue] = useState<string>('')

    const postComment = () => {
        if (commentValue) {
            store.postComment(taskKey, commentValue);
            setCommentValue('')
        }
    }

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentValue(event.target.value)
    }
    
    return (
        <div className="comment-form">
            <TextField
                fullWidth
                name="comment"
                variant="outlined"
                multiline
                rows="4"
                onChange={changeHandler}
                value={commentValue}
            />
            <div className="text-center">
                <Button
                    size="small"
                    variant="contained"
                    startIcon={<AddComment />}
                    color="primary"
                    onClick={() => postComment()}
                >
                    post
              </Button>
            </div>
        </div>
    )
}

export default observer(CommentForm)