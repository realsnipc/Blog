import React, { useState, useContext } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';
import 'animate.css';

function PostPage() {
  const params = useParams();
  const [postInfo, setPostInfo] = useState();
  const backendUrl = import.meta.env.VITE_SERVER || "http://localhost:7777";
  const [redirect, setRedirect] = useState(false);
  const [Logged, setLogged] = useState();
  const { setUserInfo, userInfo } = useContext(UserContext);



  React.useEffect(() => {
    const getPostData = async () => {
      const response = await fetch(backendUrl + `/post/${params.id}`);
      const fetchedInfo = await response.json();
      setPostInfo(fetchedInfo);

      if(userInfo){
        setLogged(true)
      }
    };
    getPostData();

  }, []);


  async function deletePost() {

    await fetch(backendUrl + '/post/' + params.id, {
      method: 'DELETE',
      credentials: 'include'
    });
    setRedirect(true);
  }



  if (redirect) {
    return <Navigate to={'/'} />;
  }
  if (!postInfo) {
    return <div>Loading...</div>;
  }


  return (
    <>
<div className='animate__animated animate__fadeInDown animate-slower'>
      <div id="head">
        <h1 className='text-3xl mt-7 mb-7 font-inter text-center'>{postInfo.title}</h1>


        {Logged &&  userInfo.id==postInfo.author._id && 
          <span className="flex gap-3 justify-center mb-2">
            <div id="edit_container" className='flex items-center justify-center'>
              <Link to={`/edit/${postInfo._id}`} className='border-black border p-2 rounded-md' href="">Edit</Link>
            </div>

            <div id="delete_container" className='flex items-center justify-center'>
              <Link onClick={deletePost} className='border-black border p-2 rounded-md' href="">Delete</Link>
            </div>
          </span>}

      </div>
      <div id="imgDiv" className='flex justify-center flex-col'>
      </div>


      <div id="content">

        <div dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
      </div>
      </div>
    </>
  );
}

export default PostPage;