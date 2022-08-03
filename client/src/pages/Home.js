import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/API';
import CreatePost from '../modules/CreatePost';
import CreatePostModule from '../modules/CreatePostModule';
import SinglePost from '../modules/SinglePost';


const Home = () => {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate();

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
                likes={post.Likes}
                date={post.updatedAt}
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