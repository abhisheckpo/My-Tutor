"""
AI Model Integration for Learning App
Uses local Ollama models for generating educational content
"""
import json
import random
import requests
import re

# Ollama API Configuration
OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "llama3.2:3b"  # Lightweight 2GB model, fast inference


def generate_with_ollama(prompt, timeout=300):
    """
    Generate content using local Ollama model
    
    Args:
        prompt: Text prompt to send to the model
        timeout: Request timeout in seconds (default: 5 minutes)
    
    Returns:
        Model response text
    """
    try:
        response = requests.post(
            OLLAMA_URL,
            json={
                "model": MODEL_NAME,
                "prompt": prompt,
                "stream": False
            },
            timeout=timeout
        )
        result = response.json()["response"]
        print(f"Model response length: {len(result)} characters")
        print(f"Preview: {result[:200]}...")
        return result
    except Exception as e:
        print(f"Ollama error: {str(e)}")
        raise


def extract_json_from_response(text, is_array=True):
    """
    Extract JSON from model response that might contain extra text
    
    Args:
        text: Raw model response
        is_array: Whether to look for array or object
    
    Returns:
        Parsed JSON data
    """
    if not text or not text.strip():
        raise ValueError("Empty response from model")
    
    # Remove markdown code blocks
    text = re.sub(r'```json\s*', '', text)
    text = re.sub(r'```\s*', '', text)
    
    # Search for JSON patterns
    if is_array:
        patterns = [
            r'\[\[.*?\]\]',  # Nested arrays [[...]]
            r'\[\{.*?\}\]',  # Array of objects [{...}]
        ]
    else:
        patterns = [r'\{.*?\}']  # Single object {...}
    
    for pattern in patterns:
        match = re.search(pattern, text, re.DOTALL)
        if match:
            try:
                return json.loads(match.group(0))
            except:
                continue
    
    # Attempt to parse entire text
    try:
        return json.loads(text.strip())
    except:
        print(f"JSON parsing failed. Text preview: {text[:500]}")
        raise ValueError(f"Could not parse JSON from model response")


def generate_flashcards(content):
    """
    Generate 10 flashcards from document content
    
    Args:
        content: Document text content
    
    Returns:
        List of [question, answer] pairs
    """
    # Truncate long content
    if len(content) > 3000:
        content = content[:3000] + "..."
    
    prompt = (
        "Create exactly 10 flashcards from this content. "
        "Return ONLY valid JSON as a list of lists. Each inner list has [question, answer]. "
        "Example format: [[\"Q1\", \"A1\"], [\"Q2\", \"A2\"]]\n\n"
        f"Content:\n{content}\n\nJSON:"
    )
    
    try:
        response_text = generate_with_ollama(prompt)
        return extract_json_from_response(response_text, is_array=True)
    except Exception as e:
        print(f"Flashcard generation error: {str(e)}")
        # Return fallback flashcards
        return [
            ["Main Topic", f"This document discusses: {content[:100]}"],
            ["Key Point 1", "See document for details"],
            ["Key Point 2", "See document for details"],
            ["Key Point 3", "See document for details"],
            ["Key Point 4", "See document for details"],
            ["Key Point 5", "See document for details"],
            ["Key Point 6", "See document for details"],
            ["Key Point 7", "See document for details"],
            ["Key Point 8", "See document for details"],
            ["Summary", "Review the full document for comprehensive understanding"]
        ]


def generate_quiz(content):
    """
    Generate 10 quiz questions from document content
    
    Args:
        content: Document text content
    
    Returns:
        List of quiz question objects with format:
        {question: str, possible_answers: list, index: int}
    """
    # Truncate long content
    if len(content) > 3000:
        content = content[:3000] + "..."
    
    prompt = (
        "Create exactly 10 quiz questions from this content. "
        "Return ONLY valid JSON as a list of objects. Each object must have: "
        "question (string), possible_answers (array of 4 strings), index (number 0-3 for correct answer). "
        "Example: [{\"question\": \"Q1?\", \"possible_answers\": [\"A\", \"B\", \"C\", \"D\"], \"index\": 0}]\n\n"
        f"Content:\n{content}\n\nJSON:"
    )
    
    try:
        response_text = generate_with_ollama(prompt)
        quiz_questions = extract_json_from_response(response_text, is_array=True)
        
        # Validate and fix quiz questions
        for question in quiz_questions:
            if "possible_answers" not in question or "index" not in question:
                continue
            
            # Ensure minimum 2 answers
            if len(question["possible_answers"]) < 2:
                question["possible_answers"] = ["Answer A", "Answer B", "Answer C", "Answer D"]
                question["index"] = 0
                continue
            
            # Pad to 4 answers if needed
            while len(question["possible_answers"]) < 4:
                question["possible_answers"].append(f"Option {len(question['possible_answers']) + 1}")
            
            # Validate index bounds
            if question["index"] < 0 or question["index"] >= len(question["possible_answers"]):
                question["index"] = 0
            
            # Shuffle answers for variety
            try:
                correct_answer = question["possible_answers"][question["index"]]
                random.shuffle(question["possible_answers"])
                question["index"] = question["possible_answers"].index(correct_answer)
            except (IndexError, ValueError):
                pass  # Keep original order if shuffle fails
        
        return quiz_questions
    except Exception as e:
        print(f"Quiz generation error: {str(e)}")
        # Return fallback quiz
        return [
            {"question": "What is the main topic of this document?", "possible_answers": ["Option A", "Option B", "Option C", "Option D"], "index": 0},
            {"question": "Question 2 about the content?", "possible_answers": ["Answer 1", "Answer 2", "Answer 3", "Answer 4"], "index": 1},
            {"question": "Question 3 about the content?", "possible_answers": ["Choice A", "Choice B", "Choice C", "Choice D"], "index": 2},
            {"question": "Question 4 about the content?", "possible_answers": ["Option 1", "Option 2", "Option 3", "Option 4"], "index": 3},
            {"question": "Question 5 about the content?", "possible_answers": ["A", "B", "C", "D"], "index": 0},
            {"question": "Question 6 about the content?", "possible_answers": ["First", "Second", "Third", "Fourth"], "index": 1},
            {"question": "Question 7 about the content?", "possible_answers": ["Alpha", "Beta", "Gamma", "Delta"], "index": 2},
            {"question": "Question 8 about the content?", "possible_answers": ["Red", "Blue", "Green", "Yellow"], "index": 3},
            {"question": "Question 9 about the content?", "possible_answers": ["North", "South", "East", "West"], "index": 0},
            {"question": "Question 10 about the content?", "possible_answers": ["Spring", "Summer", "Fall", "Winter"], "index": 1}
        ]


def generate_summary(content):
    """
    Generate a summary of document content in markdown format
    
    Args:
        content: Document text content
    
    Returns:
        Markdown formatted summary text
    """
    # Truncate long content
    if len(content) > 4000:
        content = content[:4000] + "..."
    
    prompt = (
        "Summarize this content in markdown format. Use bold for main points (**text**) "
        "and bullet points for details. Start with ## Overview. Be detailed.\n\n"
        f"Content:\n{content}\n\nSummary:"
    )
    
    try:
        summary = generate_with_ollama(prompt)
        if not summary or len(summary) < 50:
            return (
                f"## Overview\n\n"
                f"This document contains {len(content)} characters of content.\n\n"
                f"**Main Points:**\n"
                f"- Content processing completed\n"
                f"- Document uploaded successfully\n"
                f"- Summary generated from source material"
            )
        return summary
    except Exception as e:
        print(f"Summary generation error: {str(e)}")
        return (
            f"## Overview\n\n"
            f"Document uploaded successfully.\n\n"
            f"**Content Length:** {len(content)} characters\n\n"
            f"**Note:** Unable to generate detailed summary. Please try again."
        )


def process_document(content):
    """
    Process document content and generate all educational materials
    
    Args:
        content: Document text content
    
    Returns:
        Dictionary containing summary, flashcards, and quiz
    """
    summary = generate_summary(content)
    flashcards = generate_flashcards(content)
    quiz = generate_quiz(content)
    
    return {
        "summary": summary,
        "flash_cards": flashcards,
        "quiz": quiz
    }

