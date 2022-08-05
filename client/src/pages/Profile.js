import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import API from '../utils/API';
import SinglePost from '../modules/SinglePost';

const Profile = () => {
  const [user, setUser] = useState('');
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  let { id } = useParams();

  useEffect(() =>{
    const getUser = async () =>{
      try {
        const { data } = await API.getUser(id);
       
        setUser(data);
      } catch (err) {
        throw err;
      }
    }
    const getUserPosts = async () =>{
      try {
        const { data } = await API.getUserPosts(id);
        setPosts(data);
      } catch (err) {
        throw err;
      }
    }
    const getUserComments = async () =>{
      try {
        const { data } = await API.getUserComments(id);
        setComments(data);
      } catch (err) {
        throw err;
      }
    }
    getUser();
    getUserComments();
    getUserPosts();
  }, [])

  return (
    <article className='profile__container'>
      <div className='profile__content'>
        <div className='profile__information'>
          {user ?
          <>
            <p>{user.name}</p>
            <p>@{user.username}</p>
          </>
          :
          <h1>User Does Not Exist</h1>
          }
        </div>
        <div className='profileList__container'>
          {
            posts.map((post)=> {
              return (
                <SinglePost
                  key={post.id}
                  post={post}
                  setPosts={setPosts}
                  posts={posts}
                />
              )
            })
          }
        </div>
      </div>
    </article>
  )
}

export default Profile;