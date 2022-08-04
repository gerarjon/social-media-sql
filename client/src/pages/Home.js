import React from 'react';
import { useEffect, useState } from 'react';
import API from '../utils/API';
import CreatePostModule from '../modules/CreatePostModule';
import SinglePost from '../modules/SinglePost';


const Home = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getAllPosts = async () =>{
      try {
        const { data } = await API.getPosts();
        setPosts(data);
      } catch (err) {
        throw err;
      }
    }
    getAllPosts();
  },[])

  return (
    <div className='container'>
      <div className='postList__container'>
        <CreatePostModule 
          setPosts={setPosts}
        />
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
  )
}

export default Home;