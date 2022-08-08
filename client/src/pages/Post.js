import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Comment from '../modules/Comment';
import CreateComment from '../modules/CreateComment';
import API from '../utils/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const stockImage = "https://bulma.io/images/placeholders/128x128.png";

const Post = () => {
  const [postData, setPostData] = useState({})
  const [comments, setComments] = useState([])
  let { id } = useParams();

  const setDate = () => {
    if (postData.createdAt !== postData.updatedAt) {
      return postData.updatedAt;
    } else {
      return postData.createdAt;
    }
  }

  const newDate = new Date(setDate()).toDateString()

  useEffect(() => {
    const getPost = async () => {
      try {
        const result = await API.getPost(id);
        setPostData(result.data)
      } catch (err) {
        throw err
      }
    }
    const getComments = async () => {
      try {
        const result = await API.getComments(id);
        setComments(result.data)
      } catch (err) {
        throw err
      }
    }
    getPost();
    getComments();
  },[id])

  const commentCountHandler = (param) => {
    if (param === 'addComment') {
      setPostData((postData) => {
        return {...postData, Comments: [...postData.Comments, 'comment']};
      })
    } else {
      const commentsArray = postData.Comments;
      commentsArray.pop();
      setPostData((postData) => {
        return {...postData, Comments: commentsArray }
      })
    }
  }

  return (
    <div className='container'>
      <article className='postPage__container media' id={postData.id}>
        <div className='postPage__content media-content'>
          <div className='content'>
            <div className='postPage__header'>
              <figure>
                <p 
                  className='image is-64x64 post__profile__pic'
                  style={{width: '64px', height: '64px'}} 
                >
                  <img alt="profile" 
                    style={{objectFit: 'cover', height: '100%'}} 
                    src={postData.profileUrl? `${postData.profileUrl}` : stockImage } />
                </p>
              </figure>
              <div className='postPage__username'>
                <strong>{postData.username}</strong>
              </div>
            </div>
            <div className='postPage__title'>
              <h3>{postData.title}</h3>
            </div>
            <div className='postPage__body'>
              <p>{postData.body}</p>
            </div>
            {
                postData.imgUrl &&
                <div className='post__image' >
                  <img alt="post image" src={postData.imgUrl} />
                </div>
              }
            <div className='postPage__footer'>
              <p>{newDate}</p>
              <nav className="level is-mobile">
                <div className='level-left'>
                  <button className='heart__icon'>
                    <span className='icon icon__before'><FontAwesomeIcon icon={['far', 'heart']} size='lg' /></span>
                  </button>
                  <label className='level-item'>{postData.Likes && postData.Likes.length}</label>
                  <span className='icon'><FontAwesomeIcon icon="fa-regular fa-comment" /></span>
                  <label className='level-item'>{postData.Comments ? postData.Comments.length : 0}</label>
                </div>
              </nav>
            </div>
          </div>

          <div className='comments__container'>
            <CreateComment 
              id={id}
              setComments={setComments}
              commentCountHandler={commentCountHandler}
            />

            {comments.map((comment,key) => {
              return (
                <Comment 
                  comment={comment}
                  comments={comments}
                  setComments={setComments}
                  key={key}
                  commentCountHandler={commentCountHandler}
                />
              )
            })}
          </div>
        </div>
      </article>
    </div>
  )
}

export default Post;