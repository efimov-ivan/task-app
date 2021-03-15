const Comment = require('../models/commentModel')

getComments = async (req, res) => {
  await Comment.find({taskId: req.params.id}, (err, comments) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    return res.status(200).json({ success: true, data: comments })
  }).catch(err => console.log(err))
}

createComment = async (req, res) => {
  const body = req.body
  if(!body){
    return res.status(400).json({
      success: false,
      message: 'You must provide a comment'
    })
  }

  const comment = new Comment(body)
  if (!comment) {
    return res.status(400).json({ success: false, error: err })
  }

  comment
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        message: 'Comment created!',
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Comment not created!',
      })
    })
}

deleteComment = async (req, res) => {
  await Comment.findOneAndDelete({_id: req.params.id}, (err, comment) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, error: `Comment not found` })
    }

    return res.status(200).json({ success: true})
  }).catch(err => console.log(err))
}

module.exports = {
  getComments,
  createComment,
  deleteComment
}