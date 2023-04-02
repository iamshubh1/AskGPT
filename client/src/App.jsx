import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";
import ReactScrollableFeed from "react-scrollable-feed";

const USER = "USER";
const AI = "AI";
function App() {
  const inputRef = useRef();
  const [qna, setQna] = useState([
    {from:AI,value:["Hey there , I am AskGPT", " How can i assist you today ?"]},
  ]);
  const [loading, setLoading] = useState(false);

  const updateQNA = (from, value) => {
    setQna((qna) => [...qna, { from, value }]);
  };

  const handleSend = () => {
    const question = inputRef.current.value;
    updateQNA(USER, question);

    inputRef.current.value="";

    setLoading(true);
    axios
      .post("https://askgpt-atwj.onrender.com/", {
        question,
      })
      .then((response) => {
        updateQNA(AI, response.data.answer);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderContent = (qna) => {
    const value = qna.value;

    if (Array.isArray(value)) {
      return value.map((v) => <p className="message-text">{v}</p>);
    }

    return <p className="message-text">{value}</p>;
  };
  

  return (
    <main class="container">
      
      <div class="chats">
       <ReactScrollableFeed>
       {qna.map((qna) => {
          if (qna.from === USER) {
            return (
              <div class="send chat">
                <img
                  src="https://i.ibb.co/CQkST85/1.jpg"
                  alt=""
                  class="avtar"
                />
                <p>{renderContent(qna)}</p>
              </div>
            );
          }
          return (
            <div class="recieve chat">
              <img
                src="https://i.ibb.co/CKqfPq6/4.png"
                alt=""
                class="avtar"
              />
              <p >{renderContent(qna)}</p>
            </div>
          );
        })}

        {loading && (
          <div class="recieve chat">
            <img
              src="https://i.ibb.co/CKqfPq6/4.png"
              alt=""
              class="avtar"
            />
            <h1 class="typed">Thinking ............................................................................................................................................................................................................................................................................................</h1>
          </div>
        )}
       </ReactScrollableFeed>
       
      </div>
       
      
      <div class="chat-input">
        <input
          type="text"
          ref={inputRef}
          class="form-control col"
          placeholder="Type here to ask..."
        />
        <button disabled={loading} class="btn btn-danger" onClick={handleSend}>
          Send
        </button>
      </div>
    </main>
  );
}

export default App;
