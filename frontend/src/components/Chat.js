import React, { useState, useEffect } from 'react';
import { clearHistory, refreshMessages } from "../actions/chatAction";
import { useDispatch, useSelector } from "react-redux"
import "./Chat.css"

let ws

export function Chat(props) {
    const [myMessage, setMessage] = useState('');
    const userName = useSelector(state => state.userData.name);
    const messages = useSelector(state => state.chatData.chatMessages);
    const dispatch = useDispatch();

    useEffect(() => {
        ws = new WebSocket("ws://localhost:8000")

        return () => {
            dispatch(clearHistory())
            serverMessage(`${userName} отключился`)
            ws.close()
        }
    }, [])

    useEffect(() => {

        ws.onopen = () => {
            console.log("connected")
            serverMessage(`${userName} подключился`)
        }

        ws.onmessage = (evt) => {
            const message = JSON.parse(evt.data)
            let newMessages = [...messages]
            newMessages.push(message)
            dispatch(refreshMessages(newMessages))
        }

        ws.onclose = () => {
            console.log('disconnected')
        }
    })

    const serverMessage = (messageText) => {
        ws.send(JSON.stringify({ owner: "server", text: messageText, date: new Date().toISOString() }))
    }

    const changeName = () => {
        props.history.push("/");
    }

    const submitMessage = () => {
        const message = { owner: userName, text: myMessage, date: new Date().toISOString() }

        let newMessages = [...messages]
        newMessages.push(message)

        dispatch(refreshMessages(newMessages))
        ws.send(JSON.stringify(message))
        setMessage('')
    }

    return (
        <div className="chat-wrap">
            <div className="user-panel">
                <button className="logout-button" onClick={changeName}>Сменить имя</button>
                <div className="chat-username">{userName}</div>
            </div>
            <div className="chat-window">
                <div className="chat-messages-wrap">
                    {messages.map((message, key) => {
                        switch (message.owner) {
                            case userName:
                                return <div key={key} className='chat-messages your-chat-messages'>
                                    <div className="message-text">{message.text}</div>
                                </div>
                            case 'server':
                                return <div key={key} className='chat-messages server-messages'>
                                    <div className="message-text">{message.text}</div>
                                </div>
                            default:
                                return <div key={key} className='chat-messages not-your-chat-messages'>
                                    <div className="message-owner">{`${message.owner}:`}</div>
                                    <div className="message-text">{message.text}</div>
                                </div>
                        }
                    })}
                </div>
                <input className="chat-input" placeholder='Сообщение' value={myMessage} type="text" onChange={(e) => setMessage(e.target.value)} />
                <button className="send-message-button" type="submit" onClick={submitMessage}>Отправить сообщение</button>
            </div>
        </div>
    );
}
