import React from 'react';

const SinglePost = ({id, username, title, body, navigate}) => {
  return (
    <article className='post__container media' id={id}>
      <figure className='media-left'>
        <p className='image is-64x64'>
          <img alt="profile" src="https://bulma.io/images/placeholders/128x128.png" />
        </p>
      </figure>
      <div className='post__content media-content' onClick={()=>{navigate(`/post/${id}`)}}>
        <div className='content'>
          <div className='post__username'>
            <strong>{username}</strong>
          </div>
          <div className='post__title'>
            <h4>{title}</h4>
          </div>
          <div className='post__body'>
            <p>{body}</p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default SinglePost;