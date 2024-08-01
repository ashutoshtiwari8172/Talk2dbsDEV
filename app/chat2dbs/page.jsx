"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLast, ChevronFirst } from "lucide-react";
import { marked } from 'marked';
import hljs from 'highlight.js';
import Image from 'next/image';
import bot from '../../public/images/bot.png'
import bot2 from '../../public/images/image.png'
import dynamic from 'next/dynamic';
const useSessionCheck = dynamic(() => import('../components/hooks/useSessionCheck'), { ssr: false });
const useAutoLogout = dynamic(() => import('../components/hooks/useAutoLogout'), { ssr: false });

const Page = () => {
  useSessionCheck();
    useAutoLogout();
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [databaseId, setDatabaseId] = useState(null);
  const [databaseName, setDatabaseName] = useState(null);
  const [selectedModel, setSelectedModel] = useState('gpt_4o_mini_llm');
  const [startingPrompt, setStartingPrompt] = useState('');
  const [expanded, setExpanded] = useState(true);
  const [expandedtwo, setExpandedtwo] = useState(true);
  const [userGroups, setUserGroups] = useState([]);
  const chatContainerRef = useRef(null);

  const router = useRouter();

  const handleToggle = (model) => {
    setSelectedModel(selectedModel === model ? null : model);
  };

  const modelNames = {
    
    Groq_llm: 'LAMMA',
    gpt_4_llm: 'GPT-4',
    gpt_4o_llm: 'GPT-4o',
    gpt_4o_mini_llm:'GPT-4o-mini'
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setDatabaseId(urlParams.get('id'));
    setDatabaseName(urlParams.get('name'));
    setUserGroups(JSON.parse(localStorage.getItem('user_groups') || '[]'));
    fetchConversations();
  }, []);

  useEffect(() => {
    if (conversationId) {
      loadConversation(conversationId);
    }
  }, [conversationId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchConversations = async () => {
    const token = localStorage.getItem('token');
    const selectedDbId = localStorage.getItem('selectedDatabaseId');

    console.log('Id', selectedDbId);

    const response = await fetch('https://dev.tok2dbs.com/chatbot/api/list_conversations/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify({
        database_id: selectedDbId
      })
    });

    if (response.ok) {
      const fetchedConversations = await response.json();
      setConversations(fetchedConversations.reverse());
    } else {
      console.error('Failed to fetch conversations');
    }
  };

  const selectConversation = async (id) => {
    setConversationId(id);
    setSelectedModel('gpt_4o_mini_llm');
    setStartingPrompt('');
    await loadConversation(id);
  };

  const loadConversation = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://dev.tok2dbs.com/chatbot/api/get_conversation/${id}/`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (response.ok) {
      const conversation = await response.json();
      setMessages([]);
      conversation.user_messages.forEach((msg, index) => {
        addMessageToChat(msg, true);
        if (conversation.ai_responses[index]) {
          addMessageToChat(conversation.ai_responses[index], false);
        }
      });
    } else {
      console.error('Failed to fetch conversation');
    }
  };

  const addMessageToChat = (message, isUser = false) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: message, isUser },
    ]);
  };

  const sendMessage = async (userMessage) => {
    const token = localStorage.getItem('token');
    const response = await fetch('https://dev.tok2dbs.com/chatbot/api/ask/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        message: userMessage,
        database_id: databaseId,
        conversation_id: conversationId,
        model: selectedModel,
        starting_prompt: startingPrompt,
      }),
    });

    if (response.headers.get('Content-Type').includes('image/png')) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      addMessageToChat({ type: 'image', content: url }, false);
    } else {
      const data = await response.json();
      setConversationId(data.conversation_id);
      addMessageToChat(data.response, false);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('https://dev.tok2dbs.com/users/logout/', {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (response.ok) {
      localStorage.removeItem('token');
      alert('Successfully logged out.');
      router.push('/');
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };

  const handleSendMessage = async () => {
    if (userInput.trim()) {
      addMessageToChat(userInput, true);
      setUserInput('');
      await sendMessage(userInput);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 md:flex-row">
      <nav className={`h-full flex flex-col bg-gray-100 text-gray-950 p-5 transition-width duration-300 ${expanded ? "w-64" : "w-20"}`}>
        <div className="flex justify-between items-center">
          <Link href="/" legacyBehavior>
            <a className={`text-2xl font-bold text-center text-blue-900 ${!expanded && "hidden"}`} target='_blank'>tok2dbs</a>
          </Link>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <a href='/connect2dbs' className="mt-5 justify-center ml-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className={`h-[20px] mt-5 ${expanded ? "ml-20" : "ml-0"}`}><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
        </a>

        <button
          className="flex justify-center my-5 border border-blue-900 text-blue-900 px-4 py-2 rounded hover:border-blue-600 hover:text-blue-600 focus:outline-none focus:border-blue-600 focus:text-blue-600"
          onClick={() => { setConversationId(null); setMessages([]); }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" className="h-5 w-5 shrink-0 ">
            <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.69,147.32,64l24-24L216,84.69Z"></path>
          </svg>
          {expanded && <span className="ml-2">New Chat</span>}
        </button>

        <button
          className="flex justify-center mb-5 border border-blue-900 text-blue-900 px-4 py-2 rounded hover:border-blue-600 hover:text-blue-600 focus:outline-none focus:border-blue-600 focus:text-blue-600"
          onClick={handleLogout}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className ="h-5 w-5 shrink-0"><path fill="currentColor" fillRule="evenodd" d="M6 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4a1 1 0 1 1 0 2H6a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h4a1 1 0 1 1 0 2zm9.293 3.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L17.586 13H11a1 1 0 1 1 0-2h6.586l-2.293-2.293a1 1 0 0 1 0-1.414" clipRule="evenodd"></path></svg> 
          {expanded && <span className='ml-2'>Logout</span>}
        </button>
 
        <div className="mb-5 max-h-screen overflow-y-auto">
          {conversations.length === 0 ? (
            <div>No chats yet.</div>
          ) : (
            conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`mb-3 text-gray-950 px-4 py-2 rounded cursor-pointer hover:bg-gray-100 focus:outline-none ${!expanded && "hidden"}`}
                onClick={() => selectConversation(conversation.id)}
              >
                {expanded ? `${conversation.conversation_name || `Chat ${conversation.id}`}` : <span className="truncate">{conversation.id}</span>}
              </div>
            ))
          )}
        </div>
      </nav>

      <div className="flex flex-col flex-grow">
        <div className="bg-white text-blue-900 p-4 text-center text-xl">
          Chat with <span id="chat-database-name">{databaseName}</span>
          {userGroups.includes('developers') && (
            <div>
              <textarea
                value={startingPrompt}
                onChange={(e) => setStartingPrompt(e.target.value)}
                placeholder="Type your starting prompt here..."
                className="w-full md:w-[600px] p-2 border border-blue-900 rounded mb-2 text-sm"
              />
            </div>
          )}
        </div>
        <div ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto bg-white flex justify-center  text-right" style={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}>
          <div className="flex flex-col space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`max-w-3xl w-full flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!message.isUser && (
                <Image src={bot2} alt="Bot Avatar" className="w-8 h-8 m-3 self-start rounded-full" />
              )}
              <div
                className={`message p-3 rounded-lg ${
                  message.isUser ? 'bg-gray-100 text-gray-800' : ' text-gray-800'
                } text-left`}
              >
                {message.content.type === 'image' ? (
                  <img src={message.content.content} alt="AI response" className="max-w-full" />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: marked(message.content) }} />
                )}
              </div>
            </div>
            ))}
          </div>
        </div>

        <div className="px-3  justify-center border-gray-300 bg-white flex">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="w-full md:w-[600px] p-2 border border-blue-900 rounded-full text-sm"
          />
          <button
            onClick={handleSendMessage}
            className="ml-3 px-4 py-2 border border-blue-900 text-blue-900 rounded-full hover:border-blue-600 hover:text-blue-600 focus:outline-none focus:border-blue-600 focus:text-blue-600"
          >
            Submit
          </button>
        </div>
        <div className='bg-white text-xs text-gray-600 text-center'>
        <span >tok2dbs can make mistakes. Check important info</span>
        </div>
      </div>


      <nav className={`h-full flex flex-col bg-gray-100 text-gray-950 p-5 transition-width duration-300 ${expandedtwo ? "w-64" : "w-20"}`}>
  <div className="flex items-start">
    <button
      className="flex flex-col items-center mr-4"
      onClick={() => setExpandedtwo((curr) => !curr)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 256 256"
        className="mb-1"
      >
        <path d="M230.91,172A8,8,0,0,1,228,182.91l-96,56a8,8,0,0,1-8.06,0l-96-56A8,8,0,0,1,36,169.09l92,53.65,92-53.65A8,8,0,0,1,230.91,172ZM220,121.09l-92,53.65L36,121.09A8,8,0,0,0,28,134.91l96,56a8,8,0,0,0,8.06,0l96-56A8,8,0,1,0,220,121.09ZM24,80a8,8,0,0,1,4-6.91l96-56a8,8,0,0,1,8.06,0l96,56a8,8,0,0,1,0,13.82l-96,56a8,8,0,0,1-8.06,0l-96-56A8,8,0,0,1,24,80Zm23.88,0L128,126.74,208.12,80,128,33.26Z"></path>
      </svg>
      <span className="text-xs">Select Model</span>
    </button>

    <div className={`flex-grow ${expandedtwo ? 'block' : 'hidden'}`}>
      {expandedtwo && (
        <h2 className="text-lg font-bold mb-2">Select Model</h2>
      )}
      <div className="max-h-[calc(100vh-150px)] overflow-y-auto">
        {[ 'Groq_llm',  'gpt_4_llm', 'gpt_4o_llm','gpt_4o_mini_llm'].map((model) => (
          <div
            key={model}
            className={`mb-2 text-gray-950 px-2 py-1 rounded cursor-pointer hover:bg-gray-200 focus:outline-none ${
              selectedModel === model ? "bg-blue-200" : ""
            }`}
            onClick={() => setSelectedModel(model)}
          >
            <label className="flex items-center cursor-pointer w-full">
              <div className="relative mr-2">
                <div
                  className={`block w-8 h-5 rounded-full ${
                    selectedModel === model ? "bg-blue-600" : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`dot absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition ${
                    selectedModel === model ? "transform translate-x-3" : ""
                  }`}
                ></div>
              </div>
              <span className="text-sm">{modelNames[model]}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  </div>
</nav>
    </div>
  );
};
export default Page;