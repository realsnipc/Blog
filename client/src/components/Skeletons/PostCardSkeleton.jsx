import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function PostCardSkeleton() {
  return (
    <>
      <Skeleton height={"25px"} />
      <Skeleton count="3" height={"20px"} />
      <Skeleton width={"190px"} height={"18px"} className="mb-5" />
    </>
  );
}

export default PostCardSkeleton;
