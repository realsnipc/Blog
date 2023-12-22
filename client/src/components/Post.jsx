import React from 'react';
import {format} from 'date-fns'
import {Link} from 'react-router-dom'

function Post({ title, summary, createdAt,author,_id }) {
  const authorName = author.username
  // const backendUrl = import.meta.env.VITE_SERVER || "http://localhost:7777";
  return (
    <>
    <Link to={`/post/${_id}`}>
      <div className="entry flex-wrap">
        <div className="text_entry">
          <h2 className='font-inter'>{title}</h2>
          <p>{summary}</p>
          <p className='mt-3'><span className='font-semibold '>{authorName}</span> - {format(new Date(createdAt),'MMM d, yyyy')}</p>

        </div>
      </div>
      </Link>
    </>
  );
}

export default Post;