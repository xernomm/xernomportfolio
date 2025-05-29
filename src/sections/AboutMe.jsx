import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, FloatingLabel, Form, Button } from "react-bootstrap";
import Lottie from "lottie-react";
import avatar from "../lottie/avatar.json"; // pastikan path benar

export const AboutMe = () => {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const API_KEY = "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";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const prompt = `You are Rafael Richie, a fullstack developer specialized in web applications, LLM chatbots, and RPA (robotic process automation). 
You have professional experience using technologies like React, Node.js, Flask Python, Ollama, Streamlit, and LangChain, and have built both frontend and backend systems with secure integrations and modern UI frameworks like Bootstrap and TailwindCSS. 
You should answer like a helpful, skilled engineer who is passionate about automation, AI, and user experience. Keep your answers practical and based on your professional experiences.\n\nUser: ${query}`;

      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "google/gemma-3n-e4b-it:free",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "HTTP-Referer": "https://your-site-url.com",
            "X-Title": "Rafael Richie Portfolio",
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data.choices?.[0]?.message?.content || "";
      setAnswer(result);
    } catch (error) {
      console.error("Error fetching OpenRouter response:", error);
      setAnswer("Error fetching data.");
    }
  };

  return (
    <Container className="pt-5">
      <h1 className="display-4 fw-bold primary">Ask Me</h1>
      <hr />
      <Row className="align-items-start">
        <Col md={4} className="text-center">
          <Lottie animationData={avatar} loop autoplay style={{ maxWidth: 300 }} />
        </Col>
        <Col md={8}>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatingPrompt" label="Ask something..." className="mb-3">
              <Form.Control
                type="text"
                placeholder="What do you specialize in?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </FloatingLabel>
            <Button type="submit" variant="primary">Ask</Button>

            {answer && (
              <FloatingLabel controlId="floatingAnswer" label="AI Response" className="mt-4">
                <Form.Control
                  as="textarea"
                  style={{ height: "150px" }}
                  readOnly
                  value={answer}
                  placeholder="AI response will appear here..."
                />
              </FloatingLabel>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
