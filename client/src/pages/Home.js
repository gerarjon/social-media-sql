import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import SinglePost from '../modules/SinglePost';


const Home = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001/api/posts").then((res) => {
			setPosts(res.data);
    })
  },[])

  return (
    <div className='container'>
      <div className='postList__container'>
        {
          posts.map((post)=> {
            return (
              <SinglePost
                key={post.id}
                id={post.id}
                username={post.username}
                title={post.title}
                body={post.body}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default Home;