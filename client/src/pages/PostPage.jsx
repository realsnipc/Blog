import React, { useState, useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Button } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@nextui-org/react";

function PostPage() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const params = useParams();
  const [postInfo, setPostInfo] = useState();
  const backendUrl = import.meta.env.VITE_SERVER || "http://localhost:7777";
  const [redirect, setRedirect] = useState(false);
  const [Logged, setLogged] = useState();
  const { userInfo } = useContext(UserContext);

  React.useEffect(() => {
    const getPostData = async () => {
      const response = await fetch(backendUrl + `/post/${params.id}`);
      const fetchedInfo = await response.json();
      setPostInfo(fetchedInfo);

      if (userInfo) {
        setLogged(true);
      }
    };
    getPostData();
  }, []);

  async function deletePost() {
    await fetch(backendUrl + "/post/" + params.id, {
      method: "DELETE",
      credentials: "include",
    });
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  if (!postInfo) {
    return <div className="animated tdFadeOut">Loading...</div>;
  }

  return (
    <>
      <div className="animated tdFadeIn font-work">
        <div id="head animated tdFadeIn">
          <h1 className="text-3xl mt-7 mb-7 font-work text-center">
            {postInfo.title}
          </h1>

          {Logged && userInfo.id == postInfo.author._id && (
            <span className="flex gap-3 justify-center mb-2">

                <Link to={`/edit/${postInfo._id}`}>
                <Button color="default">
                  Edit
                </Button>
                </Link>

              <Button color="default" onPress={onOpen}>
                Delete
              </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent  className="font-work">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Confirm Delete</ModalHeader>
              <ModalBody className="pb-1">
                <p> 
                 Are you sure to delete this post. This will send your posts to a mysterious place.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={deletePost} >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
            </span>
          )}
        </div>
        <div id="imgDiv" className="flex justify-center flex-col"></div>

        <div id="content">
          <div
            dangerouslySetInnerHTML={{ __html: postInfo.content }}
            className="font-work"
          ></div>
        </div>
      </div>
    </>
  );
}

export default PostPage;
