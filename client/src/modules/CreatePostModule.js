import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth-context';
import { useNavigate } from 'react-router-dom';
import CreatePost from './CreatePost';

const CreatePostModule = ({setPosts}) => {
  const [isOpen, setIsOpen] = useState(false);

  const context = useContext(AuthContext)
  const navigate = useNavigate();

  const isOpenHandler = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className='createPost__handler'>
        {
          context.UserId ?
          <figure className='media-left'>
            <p className='image is-48x48'>
              <img alt="profile" src="https://media.istockphoto.com/vectors/male-silhouette-avatar-default-avatar-profile-picture-photo-vector-id1062562340?k=20&m=1062562340&s=612x612&w=0&h=fxd0ulmCLoER4M8rP8mwG9SChmn46zKjMXkZeEZhYiI=" />
            </p>
          </figure>
          :
          <figure className='media-left'>
            <p className='image is-64x64'>
              <img alt="profile" src="https://media.istockphoto.com/vectors/profile-picture-vector-illustration-vector-id587805156?k=20&m=587805156&s=612x612&w=0&h=Ok_jDFC5J1NgH20plEgbQZ46XheiAF8sVUKPvocne6Y=" />
            </p>
          </figure>
        }
        <div className='createPost__handler__container' onClick={isOpenHandler}>
          <button className='createPost__handler__button'>Start a Post</button>
        </div>
      </div>

      {
        context.UserId ? 
        <>
          {/* Post Modal */}
          <div className={`modal ${isOpen ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={isOpenHandler}></div>
            <CreatePost
              setPosts={setPosts}
              isOpenHandler={isOpenHandler}
            />
          </div>
        </>
        :
        <>
          {/* Not Logged in Modal */}
          <div className={`modal ${isOpen ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={isOpenHandler}></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Not Logged In</p>
              </header>
              <section className='modal-card-body'>
                <p>You must be logged in to create a post.</p>
              </section>
              <footer className="modal-card-foot">
                <button onClick={isOpenHandler} className="button">Cancel</button>
                <button onClick={()=>{navigate('/login')}} className="button is-success">Sign in</button>
              </footer>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default CreatePostModule;