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
import rafaelPrompt from '../data/PromptData.js'
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'

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
  "Ceritakan tentang pengalaman kerja Anda di bidang teknologi.",
  "Apa tantangan terbesar yang pernah Anda hadapi dalam proyek pengembangan perangkat lunak?",
  "Bagaimana cara Anda menangani deadline yang ketat dalam proyek?",
  "Pernahkah Anda bekerja dalam tim lintas fungsi? Ceritakan pengalaman Anda.",
  "Teknologi apa yang paling Anda kuasai dan bagaimana Anda menggunakannya?",
  "Bagaimana pendekatan Anda dalam memecahkan masalah teknis yang kompleks?",
  "Ceritakan pengalaman Anda bekerja dengan sistem berbasis cloud.",
  "Bagaimana Anda menjaga komunikasi yang efektif dalam tim remote?",
  "Pernahkah Anda gagal dalam suatu proyek? Apa yang Anda pelajari?",
  "Mengapa Anda tertarik dengan posisi ini dan bagaimana Anda bisa memberikan nilai tambah?"
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

const prompt = rafaelPrompt(query);

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
      <h1 className="display-3 fw-bold primary">Rafael-AI</h1>
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
              <img className="chiechat me-3" src={chiechat} alt="" />
              <div className="text-light lead">
                {chat.isTyping ? (
                  <ThreeDot color="#dddddd" size="small" text="" />
                ) : (
                  <div className="typing-animation">
                    <Markdown
                      rehypePlugins={[rehypeRaw]}
                      remarkPlugins={[remarkGfm]}
                      remarkRehypeOptions={{ passThrough: ['link'] }}
                      >{chat.answer}</Markdown>
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
    {"Rafael is tired!"}
  </DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      He answered too many questions! Let him take a break.
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button className="get-started-btn-fill" onClick={handleDialogClose} autoFocus>
      Okay
    </Button>
  </DialogActions>
</Dialog>
    </>

  );
};
