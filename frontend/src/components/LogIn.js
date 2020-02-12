import React from 'react';
import { connect } from 'react-redux';
import { enterName } from "../actions/usersAction";
import "./LogIn.css"

class App extends React.Component {
  state = {
    name: ''
  }

  componentDidMount() {
    console.log("LogIn")
  }

  enterName = (name) => {
    this.props.enterName(name)
    this.props.history.push("/chat");
  }

  render() {
    return (
      <div className="login-wrap">
        <div>
          Представьтесь:
        </div>
        <input
          type="text"
          placeholder={'Ваше имя...'}
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
        />
        <button onClick={() => this.enterName(this.state.name)}>Войти в чат</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  enterName: (name) => dispatch(enterName(name))
})

export default connect(
  null,
  mapDispatchToProps
)(App)
