import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
// import { clearHistory, refreshMessages } from "../actions/chatAction";
import "./Chat.css"

let ws

function Chat(props) {
    const [myMessage, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);

    useEffect(() => {
        ws = new WebSocket("ws://localhost:8000")

        ws.onopen = () => {
            ws.send(JSON.stringify({ owner: "server", text: `${props.userName} подключился`, date: new Date().toISOString() }))
        }

        ws.onmessage = (evt) => {
            console.log("onmessage",props.userName)
            const message = JSON.parse(evt.data)
            // let newMessages = [...allMessages]
            // newMessages.push(message)
            setAllMessages((prev) => { return [...prev, message] })
        }

        ws.onclose = () => {
            console.log('disconnected')
        }

        return () => {
            console.log("unmount")
            // props.clearHistory()
            ws.close()
        }
    }, [])

    const changeName = () => {
        props.history.push("/");
    }

    const submitMessage = () => {
        const message = { owner: props.userName, text: myMessage, date: new Date().toISOString() }

        // let newMessages = [...allMessages]
        // newMessages.push(message)

        setAllMessages((prev) => { return [...prev, message] })
        ws.send(JSON.stringify(message))
        setMessage('')
    }

    return (
        <div className="chat-wrap">
            <div className="user-panel">
                <button className="logout-button" onClick={changeName}>Сменить имя</button>
                <div className="chat-username">{props.userName}</div>
            </div>
            <div className="chat-window">
                <div className="chat-messages-wrap">
                    {allMessages.map((message, key) => {
                        switch (message.owner) {
                            case props.userName:
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

const mapStateToProps = ({ userData, chatData }) => ({
    userName: userData.name,
    messages: chatData.chatMessages
})

const mapDispatchToProps = ({
    // refreshMessages,
    // clearHistory
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat)
