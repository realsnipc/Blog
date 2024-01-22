import React, { useEffect, useState } from "react";
import Post from "../components/PostCard";
import PostCardSkeleton from "../components/Skeletons/PostCardSkeleton";

export default function IndexPage() {
  const backendUrl = import.meta.env.VITE_SERVER || "http://localhost:7777";
  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    ;(async () => {
      const response = await fetch(backendUrl + "/post");
      const jsonResponse= await response.json();
      setPosts(jsonResponse);
      setIsLoaded(true);
    })();

  }, []);

  if (!isLoaded) {
    return <>
    <PostCardSkeleton/>
    <PostCardSkeleton/>
    <PostCardSkeleton/>
    <PostCardSkeleton/>
    <PostCardSkeleton/>
    <PostCardSkeleton/>
    <PostCardSkeleton/>
    <PostCardSkeleton/>
    
    </>
  }
  return (
    <>
      <div className="animated tdFadeIn">
        {posts.length != 0 &&
        posts.map((post) => (
          <Post key={post._id} {...post} />
        ))}
      </div>
    </>
  );
}
