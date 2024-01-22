import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function PostPageSkeleton() {
  return (
    <>
      <div className="justify-center flex mb-10">
        <Skeleton width={"50vw"} height={"1.7rem"} />
      </div>
      <div className="mb-4">
      <Skeleton count={5} width={"100%"} height={"20px"} /></div>
      <Skeleton count={7} width={"100%"} height={"20px"} />

      <div className="mt-4">
      <Skeleton count={10} width={"100%"} height={"20px"} /></div>
    </>
  );
}
