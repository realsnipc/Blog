import React, {useContext,useEffect,useState} from 'react';
import { UserContext } from '../UserContext';
import { Navigate, useParams } from 'react-router-dom';
import Post from '../components/PostCard';

export default function UserPage() {

    const [redirect,setRedirect] = useState(false)
    const [posts,setPosts] = useState([])
    const backendUrl = import.meta.env.VITE_SERVER || "http://localhost:7777";
    const { userInfo } = useContext(UserContext);
    useEffect(()=>{
        async function redirectNotLogin(){
            const isLogged = await fetch(backendUrl + '/isLogged', {
              credentials: 'include',
            });
            if (await isLogged.json()==false){
              setRedirect(true)
            }
          }
          redirectNotLogin()

            async function fetchPosts(){
                const getPosts= await fetch(`${backendUrl}/user/${userInfo.id}/posts`,{
                  credentials:"include"
                })
                const userposts= await getPosts.json()
                setPosts(userposts)
              }
              fetchPosts()

    },[])



  
  
    if (redirect || !userInfo){
      return <Navigate to={'/'} />}
    
  return (
    <>
    <h1 className='font-work text-3xl font-bold mb-10'>Your Posts</h1>
    {
      posts.map((post)=>(
      <Post key={post._id} {...post}/>
      ))
    }
    </>
  )
}
