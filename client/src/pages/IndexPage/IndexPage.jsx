import React, { useEffect, useState } from 'react';
import Post from '../../components/Post';

export default function IndexPage() {
    const backendUrl = import.meta.env.VITE_SERVER || "http://localhost:7777";
    const [posts,setPosts]= useState([]);
    useEffect(() => {
        const response = fetch(backendUrl + "/post").then((response) => response.json().then((data) => setPosts(data)));
    }, []);

    return (
        <>
        {posts.length > 0 && posts.map(post=>(<Post {...post}/>))}
        {console.clear()}
        </>
    );
}

// export default IndexPage;