

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [userQuery, setUserQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to send query to backend
  const handleUserQuery = async () => {
    if (!userQuery.trim()) return; // Avoid empty queries

    setLoading(true);
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      // Send the query to the backend
      const response = await axios.post(`${API_URL}/query`, {
        query: userQuery,
      });

      const { answer } = response.data;

      // Update chat history with both user query and bot response
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { user: userQuery, bot: answer },
      ]);

      // Clear user input field after submitting
      setUserQuery('');
    } catch (error) {
      console.error('Error fetching response:', error.response || error.message);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { user: userQuery, bot: 'Sorry, there was an error. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle button click to simulate a query based on button text
  const handleButtonClick = (query) => {
    setUserQuery(query);
    handleUserQuery();
  };

  const chatHistoryRef = useRef(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTo(0, chatHistoryRef.current.scrollHeight);
    }
  }, [chatHistory]);

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="flex flex-col items-center py-10 space-y-4 pt-20">
        <h1 className="text-2xl font-bold text-white">
          {Array.from("What can I help with?").map((char, index) => (
            <span
              key={index}
              className="inline-block animate-letter"
              style={{ animationDelay: `${index * 0.05}s` }} // Staggered animation delay
            >
              {char === " " ? "\u00A0" : char} {/* Ensures spaces are rendered */}
            </span>
          ))}
        </h1>
        <div className="flex space-x-4">
          <div className="flex space-x-4">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
              onClick={() => handleButtonClick('Create image')}
            >
              Create image
            </button>   
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              onClick={() => handleButtonClick('Analyze images')}
            >
              Analyze images
            </button>
            <button
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg"
              onClick={() => handleButtonClick('Summarize text')}
            >
              Summarize text
            </button>
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded-lg"
              onClick={() => handleButtonClick('Brainstorm')}
            >
              Brainstorm
            </button>
            <button
              className="px-4 py-2 bg-gray-600 text-white rounded-lg"
              onClick={() => handleButtonClick('More options')}
            >
              More
            </button>
          </div>
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-grow overflow-y-auto p-4 pt-16" ref={chatHistoryRef}>
        <div className="space-y-4">
          {chatHistory.map((chat, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white p-3 rounded-br-none rounded-lg max-w-xs w-fit shadow-md">
                  {chat.user}
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-gray-300 text-gray-800 p-3 rounded-bl-none rounded-lg max-w-xs w-fit shadow-md">
                  {chat.bot}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Section */}
      <div className="p-4 border-t border-gray-200 bg-[#2f2f2f]">
        <div className="flex space-x-3">
          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleUserQuery();
              }
            }}
            placeholder="Ask a question..."
            className="flex-grow p-3 border text-gray-100 rounded-lg focus:outline-none bg-[#212121]"
          />
          <button
            onClick={handleUserQuery}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Ask'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;



