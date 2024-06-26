"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const page = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [databaseId, setDatabaseId] = useState(null);
  const [databaseName, setDatabaseName] = useState(null);
  const chatContainerRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setDatabaseId(urlParams.get('id'));
    setDatabaseName(urlParams.get('name'));
  }, []);

  useEffect(() => {
    fetchConversations();
    if (conversationId) {
      loadConversation(conversationId);
    }
  }, [conversationId]);

  useEffect(() => {
    // Scroll to the bottom of the chat container whenever messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessageToChat = (message, isUser = false) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: message, isUser },
    ]);
  };

  const sendMessage = async (userMessage) => {
    const token = localStorage.getItem('token');

    const response = await fetch('http://35.238.123.118/chatbot/api/ask/', {
    // const response = await fetch('https://web.tok2dbs.com/chatbot/api/ask/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        message: userMessage,
        database_id: databaseId,
        conversation_id: conversationId,
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

  const fetchConversations = async () => {
    const token = localStorage.getItem('token');
    const selectedDatabaseId = localStorage.getItem('selectedDatabaseId');

    if (!selectedDatabaseId) {
      console.error('No selectedDatabaseId found in localStorage');
      return;
    }

    const response = await fetch(`http://35.238.123.118/chatbot/api/list_conversations/?database_id=${selectedDatabaseId}`,{
    // const response = await fetch(`https://web.tok2dbs.com/chatbot/api/list_conversations/?database_id=${selectedDatabaseId}`,{
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    if (response.ok) {
      const fetchedConversations = await response.json();
      setConversations(fetchedConversations);
    } else {
      console.error('Failed to fetch conversations');
    }
  };

  const selectConversation = async (id) => {
    setConversationId(id);
    await loadConversation(id);
  };

  const loadConversation = async (id) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://35.238.123.118/chatbot/api/get_conversation/${id}/`,{
    // const response = await fetch(`https://web.tok2dbs.com/chatbot/api/get_conversation/${id}/`,{
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    if (response.ok) {
      const conversation = await response.json();
      setMessages([]);

      for (let i = 0; i < conversation.user_messages.length; i++) {
        addMessageToChat(conversation.user_messages[i], true);
        if (conversation.ai_responses[i]) {
          addMessageToChat(conversation.ai_responses[i], false);
        }
      }
    } else {
      console.error('Failed to fetch conversation');
    }
  };

  const createNewChat = async () => {
    setConversationId(null);
    setMessages([]);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    const response = await fetch('http://35.238.123.118/users/logout/', {
    // const response = await fetch('https://web.tok2dbs.com/users/logout/', {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (response.ok) {
      localStorage.removeItem('token');
      alert('Successfully logged out.');
      window.location.href = '/';
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
      <div className="w-full md:w-64  bg-gray-50 text-gray-950 flex flex-col p-5 max-h-screen overflow-y-auto">
        <Link href="/" legacyBehavior>
          <a className="text-2xl font-bold text-center text-blue-900" target='_blank'>tok2dbs</a>
        </Link>
      
        <a href='/connect2dbs'>
        
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className='h-[20px] mt-5 ml-20 '><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
        
        </a>
        

        <button
          className="my-5 flex items-right   text-gray-950 px-4 py-2 rounded hover:bg-gray-100 "
          onClick={createNewChat}
        >
          <i className="fas fa-plus mr-5"></i> New Chat
          
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="icon-xl-heavy ml-10"><path d="M15.673 3.913a3.121 3.121 0 1 1 4.414 4.414l-5.937 5.937a5 5 0 0 1-2.828 1.415l-2.18.31a1 1 0 0 1-1.132-1.13l.311-2.18A5 5 0 0 1 9.736 9.85zm3 1.414a1.12 1.12 0 0 0-1.586 0l-5.937 5.937a3 3 0 0 0-.849 1.697l-.123.86.86-.122a3 3 0 0 0 1.698-.849l5.937-5.937a1.12 1.12 0 0 0 0-1.586M11 4A1 1 0 0 1 10 5c-.998 0-1.702.008-2.253.06-.54.052-.862.141-1.109.267a3 3 0 0 0-1.311 1.311c-.134.263-.226.611-.276 1.216C5.001 8.471 5 9.264 5 10.4v3.2c0 1.137 0 1.929.051 2.546.05.605.142.953.276 1.216a3 3 0 0 0 1.311 1.311c.263.134.611.226 1.216.276.617.05 1.41.051 2.546.051h3.2c1.137 0 1.929 0 2.546-.051.605-.05.953-.142 1.216-.276a3 3 0 0 0 1.311-1.311c.126-.247.215-.569.266-1.108.053-.552.06-1.256.06-2.255a1 1 0 1 1 2 .002c0 .978-.006 1.78-.069 2.442-.064.673-.192 1.27-.475 1.827a5 5 0 0 1-2.185 2.185c-.592.302-1.232.428-1.961.487C15.6 21 14.727 21 13.643 21h-3.286c-1.084 0-1.958 0-2.666-.058-.728-.06-1.369-.185-1.96-.487a5 5 0 0 1-2.186-2.185c-.302-.592-.428-1.233-.487-1.961C3 15.6 3 14.727 3 13.643v-3.286c0-1.084 0-1.958.058-2.666.06-.729.185-1.369.487-1.961A5 5 0 0 1 5.73 3.545c.556-.284 1.154-.411 1.827-.475C8.22 3.007 9.021 3 10 3A1 1 0 0 1 11 4"></path></svg>
        </button>
        <button
          className="flex items-center mb-5 border border-blue-900 text-blue-900 px-4 py-2 rounded hover:border-blue-600 hover:text-blue-600 focus:outline-none focus:border-blue-600 focus:text-blue-600"
          onClick={handleLogout}
        >
          <i className="fas fa-sign-out-alt mr-2"></i> Logout
        </button>
        
        <div className="mb-5 ">
          {conversations.length === 0 ? (
            <div>No chats yet.</div>
          ) : (
            conversations.map((conversation) => (
              <div
                key={conversation.id}
                className="mb-3   text-gray-950 px-4 py-2 rounded cursor-pointer hover:bg-gray-100  focus:outline-none  focus:text-blue-600 " 
                onClick={() => selectConversation(conversation.id)}
              >
                Chat with ID: {conversation.id}
              </div>
            ))
          )}
        </div>
        
       
      </div>
      <div className="flex flex-col flex-grow">
        <div className="bg-white text-blue-900 border p-4 text-center text-xl">
          Chat with <span id="chat-database-name">{databaseName}</span>
        </div>
        <div ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto bg-white flex justify-center">
          <div className="flex flex-col space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-3xl w-full flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`message p-3 rounded-lg ${message.isUser ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-800'} text-center`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 border-t justify-center border-gray-300 bg-white flex">
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
      </div>
    </div>
  );
};

export default page;
