import React from 'react'
import { Link, useParams } from 'react-router-dom';

function PostPage() {
    const params= useParams()
    const [postInfo,setPostInfo] = React.useState(null)
    const backendUrl = import.meta.env.VITE_SERVER || "http://localhost:7777";

    React.useEffect(() => {
        const getPostData= async  ()=>{
        const response=await fetch(backendUrl+`/post/${params.id}`)
        const fetchedInfo= await response.json()
        setPostInfo(fetchedInfo)}
        getPostData()

    }, [])

    if (!postInfo){
        return <div>Loading...</div>
    }
    
  return (
    <>

    <div id="head">
    <h1 className='text-3xl mt-7 mb-7 font-work text-center font-semiboldbold'>{postInfo.title}</h1>
    <div id="edit_container" className='flex items-center justify-center'>
      <Link to={`/edit/${postInfo._id}`}className='border-white border p-3 rounded-md'href="">Edit</Link>
    </div>
    </div>
    <div id="imgDiv" className='flex justify-center flex-col'>

<img src={backendUrl+postInfo.cover} alt="" className='rounded-md h-max w-screen'/>
</div>


    <div id="content">

    <div dangerouslySetInnerHTML={{__html:postInfo.content}}></div>
    </div>
    </>
  )
}

export default PostPage