import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePost from '../modules/CreatePost';
import SinglePost from '../modules/SinglePost';


const Home = () => {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/posts`).then((res) => {
			setPosts(res.data);
    })
  },[])

  return (
    <div className='container'>
      <div className='postList__container'>
        <CreatePost 
          setPosts={setPosts}
        />
        {
          posts.map((post)=> {
            return (
              <SinglePost
                key={post.id}
                id={post.id}
                username={post.username}
                title={post.title}
                body={post.body}
                navigate={navigate}
                setPosts={setPosts}
                posts={posts}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default Home;