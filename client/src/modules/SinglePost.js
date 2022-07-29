import React, { useState, useContext } from 'react';
import API from '../utils/API';
import { AuthContext } from '../context/auth-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const SinglePost = ({id, username, title, body, navigate, setPosts, posts, date, likes}) => {
  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
  const newDate = new Date(date).toDateString()

  const context = useContext(AuthContext);

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

  const likePostHandler = (postId) => {
    if (!context.UserId) {
      return alert('You must be logged in to like this post');
    }
    const data = {PostId: postId}
    axios.post("/api/like", data, {
      headers: { accessToken: localStorage.getItem('accessToken')}
    }).then((res) => {
      setPosts(posts.map((post) => {
        if (post.id === postId) {
          if (res.data.liked) {
            return {...post, Likes: [...post.Likes, 'like']};
          } else {
            const likesArray = post.Likes;
            likesArray.pop();
            return {...post, Likes: likesArray };
          }
        } else {
          return post
        }
      }))
    })
  }


  return (
    <>
      <article className='post__container media' id={id}>
        <figure className='media-left'>
          <p className='image is-64x64'>
            <img alt="profile" src="https://bulma.io/images/placeholders/128x128.png" />
          </p>
        </figure>
        
        <div className='post__content'>

          <div className='media-content'>
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

            <nav className="level is-mobile">
              <div className='level-left'>
                <label>{likes.length}</label>
                <button className='level-item heart__icon' onClick={() => {likePostHandler(id)}}>
                  <span className='icon icon__before'><FontAwesomeIcon icon={['far', 'heart']} size='lg' /></span>
                </button>
              </div>
            </nav>
          </div>

          <div className="delete__container">
            <button onClick={() => onDeleteModalHandler(id)} className="delete"></button>
          </div>
        </div>

        {/* Delete Post Modal */}
        <div className={`modal ${deleteModalActive ? "is-active" : ""}`} >
          <div className="modal-background" onClick={onDeleteModalHandler}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Do you want to delete this post?</p>
            </header>
            <footer className="modal-card-foot">
              <button onClick={onDeleteModalHandler} className="button">Cancel</button>
              <button onClick={onDelete} className="button is-success">Delete</button>
            </footer>
          </div>
        </div> 
      </article>
        
    </>
  )
}

export default SinglePost;