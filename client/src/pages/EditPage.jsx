import { React, useState,useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams ,Navigate } from 'react-router-dom';

function EditPage() {
  let [title, setTitle] = useState('');
  let [summary, setSummary] = useState('');
  let [content, setContent] = useState('');
  let [redirect, setRedirect] = useState(false);
  let { id } = useParams();
  let backend = import.meta.env.VITE_SERVER || "http://localhost:7777";


  useEffect(() => { 
    fetch(backend+'/post/'+id).then(res=>{
      res.json().then(Info=>{
        setTitle(Info.title);
        setSummary(Info.summary);
        setContent(Info.content);
      })
    })
  }, [])
  
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };
  if (redirect) {
    return <Navigate to={'/post/'+id} />;
  }

  async function updatePost(ev) {
    ev.preventDefault()
    await fetch(backend+'/post/'+id,{
      method: 'PUT',
      body: JSON.stringify({title:title,summary:summary,content:content}),
      credentials: 'include',
      headers:{
        'Content-Type':'application/json'
      }
    });
    setRedirect(true);
  }
  return (
    <>
      <form className='flex flex-col gap-2'>
        <input type="title" className='border-4 p-1 rounded-xl font-work' placeholder='Title' value={title} onChange={(ev) => {
          setTitle(ev.target.value);
        }} />
        <input type="summary" className='border-4 p-1 rounded-xl font-work' placeholder='Summary' value={summary} onChange={(ev) => {
          setSummary(ev.target.value);
        }} />
        <ReactQuill theme="snow" value={content} onChange={setContent} modules={modules} />
        <button className='border-2 p-1 rounded-xl bg-[#333] text-[#e0dfdf] font-work mt-5' onClick={updatePost} >Post</button>

      </form>
    </>
  );
}

export default EditPage;