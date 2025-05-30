import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { IoIosSend } from "react-icons/io";
import Markdown from 'react-markdown';
import { ThreeDot } from "react-loading-indicators";
import { FaUserCircle } from "react-icons/fa";
import chiechat from '../img/chiechat.png';
import NoChat from "./NoChat";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const AboutMe = () => {
  const API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY;
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [filteredPrompts, setFilteredPrompts] = useState([]);
  const chatbotRef = useRef(null);
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDelaying, setIsDelaying] = useState(false);
  const words = "Ask me a question or start a conversation!";
  const [textIndex, setTextIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
    sessionStorage.removeItem("chatHistory");
    sessionStorage.clear();
    setChatHistory([]); 
    setDialogOpen(false); 
  };
  const samplePrompts = [
    "Apa spesialisasi Anda sebagai developer?",
    "Apa itu MCP dan bagaimana Anda menggunakannya?",
    "Bagaimana pengalaman Anda dengan React.js?",
    "Sudah pernah menggunakan LangChain?",
    "Apa proyek otomasi paling menarik yang Anda buat?",
    "Bagaimana Anda mengintegrasikan AI dalam aplikasi?",
    "Pengalaman Anda menggunakan Streamlit?",
    "Apa pendekatan Anda terhadap UI/UX?",
    "Teknologi backend favorit Anda?",
    "Database apa yang sering Anda gunakan?"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(prevIndex => (prevIndex + 1) % samplePrompts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isDelaying) {
      const interval = setInterval(() => {
        setText(words.substring(0, currentIndex + 1));
        setCurrentIndex(prevIndex => {
          if (prevIndex === words.length) {
            setIsDelaying(true);
            setTimeout(() => {
              setIsDelaying(false);
              setCurrentIndex(0);
            }, 2000);
          }
          return prevIndex === words.length ? prevIndex : prevIndex + 1;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [currentIndex, isDelaying]);

  useEffect(() => {
    const stored = sessionStorage.getItem("chatHistory");
    if (stored) setChatHistory(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (chatbotRef.current) {
      chatbotRef.current.scrollTop = chatbotRef.current.scrollHeight;
    }
    sessionStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  const search = (event) => {
    let _filtered = [];
    if (!event.query.trim().length) {
      _filtered = [...samplePrompts];
    } else {
      _filtered = samplePrompts.filter((prompt) =>
        prompt.toLowerCase().includes(event.query.toLowerCase())
      );
    }
    setFilteredPrompts(_filtered);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!query) return;
  setLoading(true);
  console.log(API_KEY)

const prompt = `You are Rafael Richie, fullstack developer with 3 years of beginner to mid experience in both frontend and backend development. You specialize in building modern web applications, LLM chatbots, and RPA (robotic process automation) systems. You have worked on projects integrating React.js, Node.js, Flask (Python), and Streamlit, often incorporating LLMs such as Ollama and LangChain to create intelligent systems. Your focus is on building clean UIs using Bootstrap or TailwindCSS and deploying robust backend APIs with authentication and database integrations using Oracle, MySQL, and ChromaDB. You have also built tools using MCP (Model Context Protocol), and integrated AI agents with persistent memory. You are passionate about automating workflows, building user-focused tools, and using AI to simplify business logic and system interaction. You should answer like a friendly, helpful, skilled engineer who is passionate about automation, AI, and user experience. Keep your answers practical and based on your professional experiences. Question: ${query};`

  const newChat = { prompt: query, answer: "", isTyping: true };
  setChatHistory((prev) => [...prev, newChat]);
  setQuery("");

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemma-3n-e4b-it:free",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = response.data.choices?.[0]?.message?.content || "";

    setTimeout(() => {
      setChatHistory((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          answer: result,
          isTyping: false,
        };
        return updated;
      });
    }, 500);

  } catch (error) {
    if (error.response?.status === 429) {
      setDialogOpen(true);
    } else {
      console.error("Error:", error);
    }
  } finally {
    setLoading(false);
  }
};


  const handleAutoPrompt = () => {
    const prompt = samplePrompts[textIndex];
    setQuery(prompt);

    // Otomatis submit
    setTimeout(() => {
      document.getElementById("submitBtn")?.click();
    }, 100);
  };

  return (
    <>
        <div className="pt-5 vh-100">
      <h1 className="display-3 fw-bold primary">Ask Me</h1>
      <hr />

      <div className="chatbotfield" ref={chatbotRef}>
        {chatHistory.length === 0 && !loading && (
          <NoChat
            samplePrompts={samplePrompts}
            textIndex={textIndex}
            onAutoPrompt={handleAutoPrompt}
          />
        )}

        {chatHistory.map((chat, index) => (
          <div key={index} className="mb-4 px-3">
            <div className="d-flex justify-content-end align-items-center my-5 col-12">
              <div className="chatBubble">
                {chat.prompt}
              </div>
              <div className='d-flex align-items-center'>
                <FaUserCircle className='text-white ms-2 px35' />
              </div>
            </div>

            <div className="d-flex justify-content-start align-items-start col-12">
              <img className="chiechat" src={chiechat} alt="" />
              <div className="text-light lead">
                {chat.isTyping ? (
                  <ThreeDot color="#dddddd" size="small" text="" />
                ) : (
                  <div className="typing-animation">
                    <Markdown>{chat.answer}</Markdown>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="d-flex col-10 mx-auto justify-content-center mt-4">
        <div className="formInput p-fluid col-10">
          <AutoComplete
            value={query}
            suggestions={filteredPrompts}
            completeMethod={search}
            onChange={(e) => setQuery(e.value)}
            placeholder="Tanyakan sesuatu..."
            className="w-100"
            style={{ height: '85%' }}
          />
        </div>
        <div className="buttonInput col-lg-1 col-sm-3">
          <Button
            id="submitBtn"
            type="submit"
            className="get-started-btn-fill py-2 ms-1 col-12 d-flex justify-content-center align-items-center"
            disabled={loading}
          >
            <IoIosSend className="px30" />
          </Button>
        </div>
      </form>
    </div>
    <Dialog
  open={dialogOpen}
  onClose={handleDialogClose}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">
    {"Terlalu Banyak Permintaan"}
  </DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      Anda telah mengirim terlalu banyak permintaan dalam waktu singkat. Harap tunggu sebentar sebelum mencoba lagi.
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button className="get-started-btn-fill" onClick={handleDialogClose} autoFocus>
      Mengerti
    </Button>
  </DialogActions>
</Dialog>
    </>

  );
};
