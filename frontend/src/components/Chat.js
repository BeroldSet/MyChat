import React from 'react';
import { connect } from 'react-redux'
import "./Chat.css"

const messages = [
    {
        owner: "Andy",
        text: "Hi"
    },
    {
        owner: "Anon",
        text: "yeap"
    },
    {
        owner: "John",
        text: "Hi Andy"
    },
    {
        owner: "Gary",
        text: "hello guys"
    },
]

class Chat extends React.Component {

    componentDidMount() {
        console.log("Chat", this.props.userName)
    }

    changeName = () => {
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="chat-wrap">
                <div className="user-panel">
                    <button onClick={() => this.changeName()}>Сменить имя</button>
                    <div>{this.props.userName}</div>
                </div>
                <div className="chat-window">
                    <div className="chat-messages-wrap">
                        {messages.map((message) => {
                            const isMyMessage = this.props.userName === message.owner
                            return <div className={`chat-messages ${isMyMessage ? "your-chat-messages" : "not-your-chat-messages"}` }>
                                {!isMyMessage && <div className="message-owner">{`${message.owner}:`}</div>}
                                <div className="message-text">{message.text}</div>
                            </div>
                        })}
                    </div>
                    <input
                        type="text"
                        placeholder={'Сообщение'}
                    />
                    <button>Отправить</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ userData }) => ({
    userName: userData.name
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat)
