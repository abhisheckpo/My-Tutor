import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, Tooltip, Typography } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styled from "styled-components";

const { Title } = Typography;

const api_server = "http://127.0.0.1:8000";

const ExportButton = ({ data, selected }) => {
  const handleExport = async () => {
    try {
      const response = await fetch(`${api_server}/export`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, selected }),
      });

      if (!response.ok) {
        throw new Error("Failed to export");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = selected === 0 ? "Summary.docx" : selected === 1 ? "Flashcards.docx" : "Quiz.docx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("There was an error exporting the document!", error);
    }
  };

  return (
    <Button
      onClick={handleExport}
      className="button-default"
      style={{ marginTop: "20px", marginBottom: "20px", color: "#ffffff", backgroundColor: "#1f1f1f", borderColor: "#3a3a3a" }}
    >
      Export {selected === 0 ? "Summary" : selected === 1 ? "Flashcards" : "Quiz"}
    </Button>
  );
};

const FlashCards = ({ response }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [side, setSide] = useState(0);
  const [flashCards, setFlashCards] = useState("Flashcards");

  useEffect(() => {
    if (response != null) setFlashCards(response.flash_cards);
  }, [response]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      event.preventDefault();
      if (event.key === "ArrowLeft") {
        setCurrentCard((prev) => {
          if (prev === 0) {
            return prev;
          }
          setSide(0);
          return prev - 1;
        });
      } else if (event.key === "ArrowRight") {
        setCurrentCard((prev) => {
          if (prev === flashCards.length - 1) {
            return prev;
          }
          setSide(0);
          return prev + 1;
        });
      } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        setSide((prev) => prev ^ 1);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [flashCards]);

  return (
    <div style={{ padding: "20px", backgroundColor: "#121212", minHeight: "100vh", color: "#ffffff" }}>
      <div>
        <Title level={2} style={{ color: "#ffffff" }}>
          Flashcards
        </Title>
        <ExportButton data={flashCards} selected={1} />
      </div>
      <Row justify="space-between" align="middle" style={{ marginTop: "20px" }}>
        <Tooltip title="Left Arrow" color={"#007BFF"}>
          <Button
            onClick={() => {
              setCurrentCard((prev) => prev - 1);
              setSide(0);
            }}
            disabled={currentCard === 0}
            style={{
              borderRadius: "50%",
              backgroundColor: currentCard === 0 ? "#3a3a3a" : "#1f1f1f",
              color: currentCard === 0 ? "#888888" : "#007BFF",
              height: "50px",
              width: "50px",
              marginRight: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
              borderColor: "#3a3a3a",
            }}
          >
            <ChevronLeft size={24} strokeWidth={3} />
          </Button>
        </Tooltip>
        <Col style={{ position: "relative" }}>
          <h3
            style={{
              fontSize: "18px",
              zIndex: 200,
              position: "absolute",
              top: "5%",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              color: "#ffffff",
            }}
          >
            {currentCard + 1} / {flashCards.length}
          </h3>
          <Card
            bordered={false}
            style={{
              width: 500,
              height: 600,
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "transform 0.5s ease, box-shadow 0.5s ease",
              transform: side ? "rotateY(180deg)" : "rotateY(0deg)",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)",
              backgroundColor: "#1f1f1f",
              color: "#ffffff",
            }}
            onClick={() => setSide((prev) => prev ^ 1)}
          >
            <h2
              style={{
                color: "#007BFF",
                transform: side ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {flashCards[currentCard][side]}
            </h2>
          </Card>
        </Col>
        <Tooltip title="Right Arrow" color={"#007BFF"}>
          <Button
            onClick={() => {
              setCurrentCard((prev) => prev + 1);
              setSide(0);
            }}
            disabled={currentCard === flashCards.length - 1}
            style={{
              borderRadius: "50%",
              backgroundColor: currentCard === flashCards.length - 1 ? "#3a3a3a" : "#1f1f1f",
              color: currentCard === flashCards.length - 1 ? "#888888" : "#007BFF",
              height: "50px",
              width: "50px",
              marginLeft: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
              borderColor: "#3a3a3a",
            }}
          >
            <ChevronRight size={24} strokeWidth={3} />
          </Button>
        </Tooltip>
      </Row>
    </div>
  );
};

export default FlashCards;
