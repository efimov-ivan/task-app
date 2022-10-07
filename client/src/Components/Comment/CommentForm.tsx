import React, { useState } from 'react'
import { store } from "../../store/index"
import { observer } from "mobx-react"
import {TextField, Button} from "@mui/material";
import { AddComment } from '@mui/icons-material';
import {taskID} from '../../store/types'

type PropsType = {
    taskID: taskID
}

const CommentForm: React.FC<PropsType> = ({ taskID }) => {

    const [commentValue, setCommentValue] = useState<string>('')

    const postComment = () => {
        if (commentValue) {
            store.postComment(taskID, commentValue);
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