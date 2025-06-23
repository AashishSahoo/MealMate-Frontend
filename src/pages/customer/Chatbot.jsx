import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Button,
  Paper,
  InputBase,
  IconButton,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActionArea,
  Avatar,
} from "@mui/material";
import Face2Icon from "@mui/icons-material/Face2";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import TelegramIcon from "@mui/icons-material/Telegram";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Icon } from "@iconify/react";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const cards = [
  { id: 1, description: "🍽️ What's today's special food item?" },
  { id: 2, description: "📈 Show me trending restaurants." },
  { id: 3, description: "✨ I want to try something new today!" },
  { id: 4, description: "👩‍💻 Kindly Help me with an order issue." },
  { id: 5, description: "🔍 Recommend healthy meal options." },
];

export default function Chatbot() {
  const [selectedCard, setSelectedCard] = useState(-1);
  const [messages, setMessages] = useState([]);
  const [dataForAi, setDataForAi] = useState({});
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const email = userInfo.email || null;
  const token = userInfo.token || null;

  const fetchDataForAI = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(`${BASE_URL}/chatbot/data/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response?.data?.resultCode === 0) {
        setDataForAi(response.data.resultData);
      }
      setMessages((prev) => {
        const hasWelcome = prev.some(
          (msg) => msg.isInitial && msg.content.includes("Welcome!")
        );
        if (!hasWelcome) {
          return [
            ...prev,
            {
              type: "ai",
              content: "Welcome! I'm Cano, How can I assist you today? 🚀",
              isInitial: true,
            },
          ];
        }
        return prev;
      });
    } catch (error) {
      setError({
        message: "Failed to initialize chat. Please try again.",
        retryFn: fetchDataForAI,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAIMessage = async (message) => {
    try {
      setIsLoading(true);
      setError(null);
      setMessages((prev) => [...prev, { type: "user", content: message }]);
      const response = await axios.post(
        `${BASE_URL}/chatbot/ask`,
        { message, userData: { dataForAi } },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content:
            response.data?.resultData ||
            "I couldn't process that request. Please try again.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "error",
          content: "Failed to get response",
          retryMessage: message,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    if (!hasInteracted) setHasInteracted(true);
    handleAIMessage(inputMessage.trim());
    setInputMessage("");
  };

  useEffect(() => {
    fetchDataForAI();
  }, []);

  return (
    <Box sx={{ minHeight: "88vh", display: "flex", flexDirection: "column" }}>
      <Container
        width="80%"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          py: 2,
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <SmartToyIcon sx={{ fontSize: 60, color: "#6C63FF" }} />
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            AI Assistant Cano
          </Typography>
          <Typography color="text.secondary">
            Get instant recommendations and support for all your dining needs
          </Typography>
        </Box>

        {error && (
          <Paper
            sx={{
              p: 2,
              mb: 2,
              gap: 2,

              display: "flex",
              alignItems: "center",
              // justifyContent: "space-between",
              backgroundColor: "#EE695D",
            }}
          >
            {" "}
            <Icon icon="tabler:face-id-error" width="27" height="27" />{" "}
            <Typography sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
              {error.message}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={error.retryFn}
              sx={{ ml: 2 }}
            >
              Retry
            </Button>
          </Paper>
        )}

        {/* Messages */}
        <Box sx={{ flex: 1, overflowY: "auto", mb: 2 }}>
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                mb: 2,
                display: "flex",
                justifyContent: msg.type === "user" ? "flex-end" : "flex-start",
                alignItems: "flex-end",
              }}
            >
              {msg.type === "ai" && (
                <Avatar sx={{ bgcolor: "#6C63FF", mr: 1 }}>
                  <SmartToyIcon />
                </Avatar>
              )}

              <Paper
                sx={{
                  p: 2,
                  maxWidth: "80%",
                  backgroundColor: msg.type === "user" ? "#E8E8FD" : "#F9F9F9",
                  borderRadius:
                    msg.type === "user"
                      ? "18px 18px 4px 18px"
                      : "18px 18px 18px 4px",
                }}
              >
                {msg.type === "error" ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography color="error">{msg.content}</Typography>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => handleAIMessage(msg.retryMessage)}
                      sx={{ ml: 1 }}
                    >
                      Retry
                    </Button>
                  </Box>
                ) : (
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => (
                        <Typography variant="body1" sx={{ m: 0 }} {...props} />
                      ),
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                )}
              </Paper>
              {msg.type === "user" && (
                <Avatar sx={{ bgcolor: "#4B4C7D", ml: 1 }}>
                  <Icon icon="icon-park-solid:me" width="24" height="24" />
                </Avatar>
              )}
            </Box>
          ))}
          {isLoading && (
            <Box
              sx={{
                mb: 2,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Avatar sx={{ bgcolor: "#6C63FF" }}>
                <SmartToyIcon />
              </Avatar>
              <Paper
                sx={{
                  p: 1,
                  backgroundColor: "#F9F9F9",
                  borderRadius: "18px 18px 18px 4px",
                }}
              >
                <Icon
                  icon="svg-spinners:blocks-shuffle-3"
                  width="30"
                  height="30"
                  color="#6C63FF"
                />
              </Paper>
            </Box>
          )}
        </Box>

        {/* Quick Suggestions */}
        {!hasInteracted && (
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: "500" }}
            >
              Quick Suggestions
            </Typography>
            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              }}
            >
              {cards.map((card, index) => (
                <Card
                  key={card.id}
                  variant="outlined"
                  sx={{
                    borderRadius: "1rem",
                    backgroundColor: "#F9F9F9",
                    borderColor: "#E0E0E0",
                    transition: "0.3s",
                    opacity: isLoading ? 0.7 : 1,
                    pointerEvents: isLoading ? "none" : "auto",
                    "&:hover": { boxShadow: 3 },
                  }}
                >
                  <CardActionArea
                    onClick={() => {
                      setSelectedCard(index);
                      if (!hasInteracted) setHasInteracted(true);
                      handleAIMessage(card.description);
                    }}
                    disabled={isLoading}
                  >
                    <CardContent>
                      <Typography>{card.description}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Box>
          </Box>
        )}

        {/* Chat Input */}
        <Box>
          <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: 1,
              display: "flex",
              alignItems: "center",
              boxShadow: 3,
              borderRadius: "24px",
              backgroundColor: "#F9F9F9",
            }}
          >
            <IconButton sx={{ color: "#6C63FF", mr: 1 }} disabled={isLoading}>
              <EmojiObjectsIcon />
            </IconButton>

            <InputBase
              fullWidth
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="What's on your mind..."
              disabled={isLoading}
              sx={{ mx: 1 }}
            />

            <IconButton
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              sx={{
                p: 1.5,
                backgroundColor: "#6C63FF",
                color: "white",
                "&:hover": { backgroundColor: "#5A54E5" },
              }}
            >
              {isLoading ? (
                <Icon
                  icon="svg-spinners:tadpole"
                  width="28"
                  height="28"
                  color="#6C63FF"
                />
              ) : (
                <TelegramIcon />
              )}
            </IconButton>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
