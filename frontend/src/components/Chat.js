import React from 'react';
import { connect } from 'react-redux'
import { clearHistory, refreshMessages } from "../actions/chatAction";
import "./Chat.css"

class Chat extends React.Component {
    state = {
        message: ''
    }

    ws = new WebSocket("ws://localhost:8000")

    componentDidMount() {
        this.ws.onopen = () => {
            console.log('connected')
            this.ws.send(JSON.stringify({ owner: "server", text: `${this.props.userName} подключился`, date: new Date() }))
        }

        this.ws.onmessage = (evt) => {
            const message = JSON.parse(evt.data)
            let newMessages = [...this.props.messages]
            newMessages.push(message)
            this.props.refreshMessages(newMessages)
        }

        this.ws.onclose = () => {
            console.log('disconnected')
        }
    }

    changeName = () => {
        this.ws.close()
        this.props.clearHistory()
        this.props.history.push("/");
    }

    submitMessage = () => {
        const message = { owner: this.props.userName, text: this.state.message, date: new Date() }

        let newMessages = [...this.props.messages]
        newMessages.push(message)

        this.props.refreshMessages(newMessages)
        this.ws.send(JSON.stringify(message))
    }

    render() {
        return (
            <div className="chat-wrap">
                <div className="user-panel">
                    <button onClick={this.changeName}>Сменить имя</button>
                    <div>{this.props.userName}</div>
                </div>
                <div className="chat-window">
                    <div className="chat-messages-wrap">
                        {this.props.messages.map((message, key) => {
                            switch (message.owner) {
                                case this.props.userName:
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
                    <input
                        type="text"
                        placeholder={'Сообщение'}
                        value={this.state.value}
                        onChange={(e) => this.setState({ message: e.target.value })}
                    />
                    <button onClick={this.submitMessage}>Отправить</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ userData, chatData }) => ({
    userName: userData.name,
    messages: chatData.chatMessages
})

const mapDispatchToProps = ({
    refreshMessages,
    clearHistory
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat)
