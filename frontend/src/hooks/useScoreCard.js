import { createContext, useContext, useState } from 'react';

const ADD_MESSAGE_COLOR = '#3d84b8';
const REGULAR_MESSAGE_COLOR = '#2b2e4a';
const ERROR_MESSAGE_COLOR = '#fb3640';

const ScoreCardContext = createContext({
  messages: [],
  queryMessages: [],
  addCardMessage: () => {},
  addRegularMessage: () => {},
  addErrorMessage: () => {},
  clearMessage: () => {},
  addCardMessagePlus: () =>{},
  addRegularMessagePlus: ()=>{},
});

const makeMessage = (message, color) => {
  return { message, color };
};

const ScoreCardProvider = (props) => {
  const [messages, setMessages] = useState([]);
  const [queryMessages, setQueryMessages] = useState([]);
  
  const clearMessage = (message)=>{
    setMessages(prev => {return [makeMessage(message,REGULAR_MESSAGE_COLOR)]});
    setQueryMessages(prev => {return [makeMessage(message,REGULAR_MESSAGE_COLOR)]});
  }

  const addCardMessage = (message) => {
    setMessages([...messages, makeMessage(message, ADD_MESSAGE_COLOR)]);
  };

  const addCardMessagePlus = (message,userInfo) => {
    setMessages([...messages, makeMessage(message, ADD_MESSAGE_COLOR),userInfo]);
  };
  
  const addRegularMessagePlus = (ms) =>{
    setQueryMessages([ms]);
  }
  
  const addRegularMessage = (...ms) => {
    setMessages([
      ...messages,
      ...ms.map((m) => makeMessage(m, REGULAR_MESSAGE_COLOR)),
    ]);
  };

  const addErrorMessage = (message, sel) => {
    if(sel == 0)
      setMessages([...messages, makeMessage(message, ERROR_MESSAGE_COLOR)]);
    else
      setQueryMessages([makeMessage(message, ERROR_MESSAGE_COLOR)]);
  };

  return (
    <ScoreCardContext.Provider
      value={{
        messages,
        queryMessages,
        addCardMessage,
        addRegularMessage,
        addErrorMessage,
        clearMessage,
        addCardMessagePlus,
        addRegularMessagePlus,
      }}
      {...props}
    />
  );
};

function useScoreCard() {
  return useContext(ScoreCardContext);
}

export { ScoreCardProvider, useScoreCard };
