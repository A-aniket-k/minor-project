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
      setChatHistory(prevHistory => [
        ...prevHistory,
        { user: userQuery, bot: answer },
      ]);

      // Clear user input field after submitting
      setUserQuery('');
    } catch (error) {
      console.error('Error fetching response:', error.response || error.message);
      setChatHistory(prevHistory => [
        ...prevHistory,
        { user: userQuery, bot: 'Sorry, there was an error. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const chatHistoryRef = useRef(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTo(0, chatHistoryRef.current.scrollHeight);
    }
  }, [chatHistory]);

  return (
    <div className="flex flex-col h-screen bg-[#212121]">
      <div className="flex-grow overflow-y-auto p-4" ref={chatHistoryRef}>
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
