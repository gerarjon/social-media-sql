import React from 'react';
import API from '../utils/API';

const Comment = ({commentBody, id, setComments, comments, username}) => {
  const onDeleteComment = async () => {
    try {
      const result = await API.deleteComment(id)
      setComments(comments.filter((comment) => comment.id !== id))
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
          <button onClick={onDeleteComment} className="delete"></button>
        </div>
      </div>
    </article>
  )
}

export default Comment;