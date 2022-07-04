import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Comment from '../modules/Comment';
import CreateComment from '../modules/CreateComment';


const Post = () => {
  const [postData, setPostData] = useState({})
  const [comments, setComments] = useState([])
  let { id } = useParams();

  useEffect(() => {
    axios.get(`/api/posts/byId/${id}`).then((res) => {
			setPostData(res.data)
    })
    axios.get(`/api/comments/${id}`).then((res) => {
			setComments(res.data)
    })
  },[])

  return (
    <div className='container'>
      <article className='postPage__container media' id={postData.id}>
        <div className='postPage__content media-content'>
          <div className='content'>
            <div className='postPage__header'>
              <figure>
                <p className='image is-64x64'>
                  <img alt="profile" src="https://bulma.io/images/placeholders/128x128.png" />
                </p>
              </figure>
              <div className='postPage__username'>
                <strong>{postData.username}</strong>
              </div>
            </div>
            <div className='postPage__title'>
              <h1>{postData.title}</h1>
            </div>
            <div className='postPage__body'>
              <p>{postData.body}</p>
            </div>
          </div>

          <div className='comments__container'>
            <CreateComment 
              id={id}
              setComments={setComments}
            />

            {comments.map((comment,key) => {
              return (
                <Comment 
                  id={comment.id}
                  commentBody={comment.commentBody}
                  key={key}
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