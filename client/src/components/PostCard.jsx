import React from 'react';
import {format} from 'date-fns'
import {Link} from 'react-router-dom'

function Post({ title, summary, createdAt,author,_id }) {
  const authorName = author.username
  return (
    <>
    <Link to={`/post/${_id}`}>
      <div className="entry flex-wrap animated tdFadeIn">
        <div className="text_entry">
          <h2 className='font-work'>{title}</h2>
          <p>{summary}</p>
          <p className='mt-3'><span className='font-semibold '>{authorName}</span> - {format(new Date(createdAt),'MMM d, yyyy')}</p>

        </div>
      </div>
      </Link>
    </>
  );
}

export default Post;