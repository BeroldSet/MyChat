import React from 'react';
import { connect } from 'react-redux';
import { enterName } from "../actions/usersAction";
import "./LogIn.css"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.nameInput = React.createRef();
  }

  onSubmit = (event) => {
    this.props.enterName(this.nameInput.current.value)
    this.props.history.push("/chat");
    event.preventDefault();
  }

  render() {
    return (
      <form className="login-wrap" onSubmit={this.onSubmit}>
        <div className="login-greeting">
          Представьтесь:
          </div>
        <input className="login-input" placeholder='Ваше имя...' type="text" ref={this.nameInput} />
        <input className="login-button" type="submit" value="Войти в чат" />
      </form>
    );
  }
}

const mapDispatchToProps = ({
  enterName
});

export default connect(
  null,
  mapDispatchToProps
)(App)
