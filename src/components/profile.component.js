import React, { Component } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
        content: ""
    };
  }

    componentDidMount() {

        UserService.getPlayer(AuthService.getCurrentUser()).then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }


  render() {
    const { content } = this.state;

    console.log(content)

    return (
      <div className="container">
        <header className="jumbotron">
sdgdsq
        </header>
      </div>
    );
  }
}
