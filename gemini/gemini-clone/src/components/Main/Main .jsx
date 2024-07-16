import React, { useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import axios from "axios";

const Main = () => {
  const [answer, setAnswer] = useState("");
  const [ques, setQues] = useState("");
  const [show, setShow] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const parseMarkdown = (text) => {
    // Replace **bold** with <strong>bold</strong> (with lookaround assertion)
    text = text.replace(/\*\*(?=\S|\b)(.*?)(?=\S|\b)\*\*/g, '<strong>$1</strong>');
    // Replace newline with <br>
    text = text.replace(/\n/g, '<br/>');
    return text;
  };
  

  async function generateAnswer() {
    setShow(true);
    setQues("");
    setLoadingState(true)
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBnn4J6rt8L3_xAHkgw0nwhdTHkveP6y_8",
      method: "POST",
      data: { contents: [{ parts: [{ text: ques }] }] },
    });
    const markdownContent = response.data.candidates[0].content.parts[0].text;
    const htmlContent = parseMarkdown(markdownContent);
    setLoadingState(false)
    setAnswer(htmlContent);
  }
  const handleChange = (event) => {
    setQues(event.target.value);
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>
      <div className="main-container">
        {!show ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming trip</p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div className="card">
                <p>Briefly summarize this topic: urban planning</p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="Message Icon" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="Code Icon" />
              </div>
            </div>
          </>
        ) : (
          <>
            {loadingState ? (
              <div className="loader">
                <hr />
                <hr />
                <hr />
              </div>
            ) : (
              <>
              <img src={assets.gemini_icon} className="gemicon" />
              <div className="preformatted-answer" dangerouslySetInnerHTML={{ __html: answer }}></div>
              </>
            )}
          </>
        )}
      </div>
      <div className="main-bottom">
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter a prompt here"
            value={ques}
            onChange={handleChange}
          />
          <div>
            <img src={assets.gallery_icon} alt="Gallery Icon" />
            <img src={assets.mic_icon} alt="Mic Icon" />
            <img
              src={assets.send_icon}
              alt="Send Icon"
              onClick={generateAnswer}
            />
          </div>
        </div>
        <p className="bottom-info">
          Gemini may display inaccurate info, including about people, so
          double-check its responses. Your privacy and Gemini Apps
        </p>
      </div>
    </div>
  );
};

export default Main;
