import React from "react";
import "../css/Message.css";
function Message({isSuccess}) {
  return (
    <div className="message-container">
      <div className={`message ${isSuccess ? "success" : "failure"} `}>
        {isSuccess ?<p>
          Your application is Successfully Submited.You can view your
          application status in Dashboard
        </p> : <p>something went wrong. Please try again later</p> }
      </div>
    </div>
  );
}

export default Message;
