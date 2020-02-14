import React from 'react';
import { connect } from 'react-redux'
import { getMessages } from "../actions/chatAction";
import "./Chat.css"

class Chat extends React.Component {
    state = {
        message: ''
    }

    ws = new WebSocket("ws://localhost:8000")

    componentDidMount() {
        this.props.getMessages()
        this.ws.onopen = () => {
            console.log('connected')
        }

        this.ws.onmessage = () => {
            this.props.getMessages()
        }

        this.ws.onclose = () => {
            console.log('disconnected')
        }
    }

    changeName = () => {
        this.props.history.push("/");
    }

    submitMessage = () => {
        const message = { owner: this.props.userName, text: this.state.message }
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
                            const isMyMessage = this.props.userName === message.owner
                            return <div key={key} className={`chat-messages ${isMyMessage ? "your-chat-messages" : "not-your-chat-messages"}`}>
                                {!isMyMessage && <div className="message-owner">{`${message.owner}:`}</div>}
                                <div className="message-text">{message.text}</div>
                            </div>
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

const mapDispatchToProps = dispatch => ({
    getMessages: () => dispatch(getMessages()),
    // refreshMessages: (newMessages) => dispatch(refreshMessages(newMessages))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat)
