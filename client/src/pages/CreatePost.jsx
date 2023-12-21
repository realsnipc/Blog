import { React, useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { Navigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CreatePost() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [redirect,setRedirect] = useState(false)
  const [error, setError] = useState('');
  const backendUrl = import.meta.env.VITE_SERVER || "http://localhost:7777";

// ReactQuill Modules 
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };
  

  // Create new post 
  async function createNewPost(ev) {
    ev.preventDefault();
    if(!title || !summary || !content){
      alert("Fill all contents")
    }else{
    const data= {title,summary,content}
    const reponse = await fetch(backendUrl + '/post', {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    });
    if (reponse.ok){
      setRedirect(true)
    }}
  }
  
async function redirectNotLogin(){
  const isLogged = await fetch(backendUrl + '/isLogged', {
    credentials: 'include',
  });
  if (await isLogged.json()==false){
    setRedirect(true)
  }
}
redirectNotLogin()


  if (redirect){
    return <Navigate to={'/'} />}

  return (
    <>
      <form className='flex flex-col gap-2'>
        <input type="title" className='border-4 p-1 rounded-xl font-work' placeholder='Title' value={title} onChange={(ev) => {
          setTitle(ev.target.value);
        }} />
        <input type="summary" className='border-4 p-1 rounded-xl font-work' placeholder='Summary' value={summary} onChange={(ev) => {
          setSummary(ev.target.value);
        }} />
        {/* <input type="file" className='border-4 p-1 rounded-xl font-work' onChange={(ev) => {
          setFile(ev.target.files);
        }} /> */}
        <ReactQuill theme="snow" value={content} onChange={setContent} modules={modules} />
        <button className='border-2 p-1 rounded-xl bg-[#333] text-[#e0dfdf] font-work mt-5' onClick={createNewPost} >Post</button>

      </form>
    </>
  );
}

export default CreatePost;