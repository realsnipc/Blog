import React from 'react'
import { RiTwitterXLine } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";

export default function Footer() {
  return (
    <>
    <footer className="text-gray-600 font-work">
  <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">

    <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
      <a href="https://github.com/realsnipc" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">@snipc</a>
    </p>
    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start gap-2 ">
      <a href='https://x.com/realsnipc'><RiTwitterXLine /></a> 
      <a href="https://github.com/realsnipc"><FaGithub /></a>     
    </span>
  </div>
</footer>
    </>
  )
}
