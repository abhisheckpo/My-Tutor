import React, { useState, useEffect } from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Col, Row, Button } from "antd";
import styled from "styled-components";

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
        console.error('There was an error exporting the summary!', error);
    }
  };

  return (
    <StyledButton
      onClick={handleExport}
    >
      Export {selected === 0 ? "Summary" : selected === 1 ? "Flashcards" : "Quiz"}
    </StyledButton>
  );
};

const Summarization = ({ response }) => {
  const [summary, setSummary] = useState("Summary");

  useEffect(() => {
    if (response != null) {
      setSummary(response.summary);
    }
    console.log(response.quiz);
  }, [response]);

  const newData = summary.replace("** ", "** /n");

  return (
    <StyledRow justify="center" align="middle">
      <StyledCol span={18}>
        <ExportButton data={summary} selected={0} />
        <StyledTitle>Summary:</StyledTitle>
        <ReactMarkdown
          children={newData}
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ node, ...props }) => (
              <h2
                style={{
                  color: "var(--main-blue)",
                  fontSize: "24px",
                  marginBottom: "10px",
                }}
                {...props}
              />
            ),
            ul: ({ node, ...props }) => (
              <ul
                style={{
                  listStyleType: "disc",
                  marginBottom: "20px",
                  paddingLeft: "20px",
                }}
                {...props}
              />
            ),
            li: ({ node, ...props }) => (
              <li style={{ marginBottom: "10px" }} {...props} />
            ),
            strong: ({ node, ...props }) => (
              <strong style={{ fontWeight: "bold" }} {...props} />
            ),
          }}
        />
      </StyledCol>
    </StyledRow>
  );
};

const StyledButton = styled(Button)`
  margin-top: 20px;
  margin-bottom: 20px;
  color: #ffffff;
  background-color: #1e90ff;
  border-color: #1e90ff;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #1c7ccc;
  }

  &:active {
    background-color: #1a6ab5;
    transform: scale(0.95);
  }
`;

const StyledRow = styled(Row)`
  min-height: 100vh;
  background-color: #1a1a1a;
  display: flex;
  align-items: center;
`;

const StyledCol = styled(Col)`
  text-align: left;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.6;
  margin-bottom: 30px;
  padding: 40px 120px;
  border-radius: 20px;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.4);
  background-color: #2c2c2c;
  color: #f5f5f5;
  position: relative;

  ul {
    list-style-type: disc;
    margin-bottom: 20px;
    padding-left: 20px;
  }

  ol {
    list-style-type: disc;
    margin-bottom: 20px;
    padding-left: 20px;
  }

  li {
    margin-bottom: 6px;
  }

  strong {
    font-weight: bold;
    font-size: 26px;
    color: #1e90ff;
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 600;
    color: #f5f5f5;
  }
`;

const StyledTitle = styled.h1`
  color: #1e90ff;
  font-size: 28px;
  margin-bottom: 20px;
`;

export default Summarization;
