import React from "react";
import Lottie from "lottie-react";
import avatar from "../lottie/avatar.json";
import { Button } from "primereact/button";
import { MdFlashOn } from "react-icons/md";

const NoChat = ({ onAutoPrompt, samplePrompts, textIndex }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center ">
      <div className="col-sm-8 col-lg-4">
        <Lottie animationData={avatar} loop autoplay />
      </div>
      <h4 className="text-light my-4">
        Ask me a question or start a conversation!
      </h4>
      <Button
        icon={<MdFlashOn />}
        className="get-started-btn-fill btn col-lg-5 col-sm-8 mt-2"
        onClick={onAutoPrompt}
      >
        Quick Prompt
    </Button>
    </div>
  );
};

export default NoChat;

