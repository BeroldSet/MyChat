import React from 'react';
import { connect } from 'react-redux'

class Chat extends React.Component {

  componentDidMount() {
    console.log("Chat",this.props.userName)
  }
  
  render() {
  return (
    <div className="App">
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
