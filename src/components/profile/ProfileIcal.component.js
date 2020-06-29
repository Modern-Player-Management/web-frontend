import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import UserService from "../../services/user.service";

const useStyles = (theme) => ({
    root: {
        width: '50%',
        borderRadius: 12,
        padding: 12,
        marginTop: 25,
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: 'rgba(34, 35, 58, 0.2) 0px 14px 80px',
        transition: 'all 0.3s ease 0s',
    },
    alert: {
        boxSizing: 'border-box',
    },
    actions: {
        justifyContent: 'center'
    },
    textfield: {
        margin: 10,
        width: '68%',
    },
    button: {
        width: '45%',
        margin: 10,
    }
});


class ProfileIcal extends Component {
    constructor(props) {
        super(props);
        this.handleIcal = this.handleIcal.bind(this);

        this.state = {
            ical: "",
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.ical !== this.props.ical) {
            this.setState({
                ical: this.props.ical
            });
        }
    }

    handleIcal(e) {
        e.preventDefault();

        UserService.updateIcal(this.state.ical).then(
            () => {
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    loading: false,
                    message: resMessage
                });
            }
        );
    }


    render() {
        const {classes} = this.props;
        return (
            <Button
                className={classes.button}
                type="submit"
                variant="contained"
                onClick={this.handleIcal}
                color="primary">Get ical</Button>
        )
    }
}


export default withStyles(useStyles)(ProfileIcal);