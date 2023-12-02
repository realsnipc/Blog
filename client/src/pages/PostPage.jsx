import React from 'react'
import { useParams } from 'react-router-dom';

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
    <div id="imgDiv" className='flex justify-center flex-col'>
        <img src={backendUrl+postInfo.cover} alt="" className='rounded-md h-max w-screen'/>
        <h1 className='text-3xl mt-7 mb-7 font-work text-center font-semiboldbold'>{postInfo.title}</h1>
        <div dangerouslySetInnerHTML={{__html:postInfo.content}}></div>
        

    </div>
    <div id="head">
    </div>
    <div id="content">

    </div>
    </>
  )
}

export default PostPage