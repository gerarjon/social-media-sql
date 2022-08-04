import React, { useState } from 'react';
import API from '../utils/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Comment = ({commentBody, id, setComments, comments, username}) => {
  const [deleteCommentActive, setDeleteCommentActive] = useState(false)

  const onDeleteCommentModal = () => {
    setDeleteCommentActive(!deleteCommentActive)
  }

  const onDeleteComment = async () => {
    try {
      const result = await API.deleteComment(id)
      setComments(comments.filter((comment) => comment.id !== id))
      setDeleteCommentActive(!deleteCommentActive)
    } catch (err) {
      throw err
    }
  }

  return (
    <article className='comment__container media' id={id}>
      <figure className='media-left'>
        <p className='image is-64x64'>
          <img alt="profile" src="https://bulma.io/images/placeholders/128x128.png" />
        </p>
      </figure>
      <div className='comment__content media-content' >
        <div className='content'>
          <div className='post__username'>
            <strong>{username}</strong>
          </div>
          <div className='comment__body'>
            <p>{commentBody}</p>
          </div>
        </div>

        <div className="delete__container">
          <span onClick={onDeleteCommentModal} className="delete-icon"><FontAwesomeIcon icon="fa-regular fa-trash-can" /></span>
        </div>

        <div className={`modal ${deleteCommentActive ? "is-active" : ""}`} >
          <div className="modal-background" onClick={onDeleteCommentModal}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Delete Comment</p>
            </header>
            <section className='modal-card-body' >
              <p>Are you sure you want to delete this comment?</p>
            </section>
            <footer className="modal-card-foot">
              <button onClick={onDeleteCommentModal} className="button is-pulled-left">Cancel</button>
              <button onClick={onDeleteComment} className="button is-success is-pulled-right">Delete</button>
            </footer>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Comment;