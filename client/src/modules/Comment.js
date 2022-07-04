import React from 'react';

const Comment = (props) => {
  return (
    <article className='comment__container media'>
      <figure className='media-left'>
        <p className='image is-64x64'>
          <img alt="profile" src="https://bulma.io/images/placeholders/128x128.png" />
        </p>
      </figure>
      <div className='comment__content media-content' >
        <div className='content'>
          <div className='comment__username'>
            <strong>username</strong>
          </div>
          <div className='comment__body'>
            <p>text</p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Comment;