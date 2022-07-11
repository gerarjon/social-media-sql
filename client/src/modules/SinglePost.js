import React, { useState } from 'react';
import API from '../utils/API';

const SinglePost = ({id, username, title, body, navigate, setPosts, posts, date}) => {
  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
  const newDate = new Date(date).toDateString()

  const onDeleteModalHandler = (id) => {
    setDeleteModalActive(!deleteModalActive)
    setIdDelete(id)
  }

  const onDelete = async () => {
   try {
    const result = await API.deletePost(idDelete);
    setPosts(posts.filter((post) => post.id !== idDelete))
    setIdDelete(null)
    setDeleteModalActive(!deleteModalActive)
   } catch (err) {
    throw err;
   }
  }


  return (
    <>
      <article className='post__container media' id={id}>
        <figure className='media-left'>
          <p className='image is-64x64'>
            <img alt="profile" src="https://bulma.io/images/placeholders/128x128.png" />
          </p>
        </figure>
        
        <div className='post__content media-content'>
          <div className='content' onClick={()=>{navigate(`/post/${id}`)}}>
            <div className='post__username'>
              <strong>{username}</strong> || {newDate}
            </div>
            <div className='post__title'>
              <h4>{title}</h4>
            </div>
            <div className='post__body'>
              <p>{body}</p>
            </div>
          </div>

          <div className="delete__container">
            <button onClick={() => onDeleteModalHandler(id)} className="delete"></button>
          </div>
        </div>

        <div className={`modal ${deleteModalActive ? "is-active" : ""}`} >
          <div className="modal-background" onClick={onDeleteModalHandler}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Do you want to delete this post?</p>
            </header>
            <footer className="modal-card-foot">
              <button onClick={onDelete} className="button is-success">Delete</button>
              <button onClick={onDeleteModalHandler} className="button">Cancel</button>
            </footer>
          </div>
        </div> 
      </article>
        
    </>
  )
}

export default SinglePost;