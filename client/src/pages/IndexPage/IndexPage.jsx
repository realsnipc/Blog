import React, { useEffect, useState } from 'react';
import Post from '../../components/Post';
import 'animate.css';

export default function IndexPage() {
    const backendUrl = import.meta.env.VITE_SERVER || "http://localhost:7777";
    const [posts,setPosts]= useState([]);
    useEffect(() => {
        const response = fetch(backendUrl + "/post").then((response) => response.json().then((data) => setPosts(data)));
    }, []);

    return (
        <>
        <div className='animate__animated animate__fadeInDown animate-slower'>
        {posts.length > 0 && posts.map(post=>(<Post {...post}/>))}
        {console.clear()}</div>
        </>
    );
}