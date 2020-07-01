import React, {Component} from "react";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItem from "@material-ui/core/ListItem";
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Switch from "@material-ui/core/Switch";
import Moment from 'moment';
import TimerIcon from '@material-ui/icons/Timer';
import EventService from "../../services/event.service"
import Modal from "@material-ui/core/Modal";
import {withStyles} from "@material-ui/core/styles";
import EditEventModal from "./modal/EditEvent.modal";

const useStyles = (theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

class EventAction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleModal = this.handleModal.bind(this);
    }

    handleModal = () => {
        this.setState({modal: !this.state.modal})
    };



    handleDelete(e){
        e.preventDefault();

        EventService.removeEvent(this.props.event.id).then(
            () => {
                window.location.reload();
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    message: resMessage
                });
            }
        );
    }

    render() {
        const {event, classes} = this.props;

        const date = Moment(event.start);
        const dateComponent = date.utc().format('YYYY-MM-DD HH:mm:ss');

        return (
            <ListItem>
                <ListItemText
                    primary={event.name}
                    secondary={dateComponent}
                />
                <ListItemSecondaryAction>
                    {
                        this.props.isManager === true &&
                        <>
                            <IconButton edge="end" aria-label="delete"
                                        onClick={this.handleDelete}>
                                <DeleteIcon/>
                            </IconButton>
                            <IconButton edge="end" aria-label="delete"
                                        onClick={this.handlePlayer}>
                                <TimerIcon/>
                            </IconButton>

                            <IconButton edge="end" aria-label="edit"
                                        onClick={this.handleModal}>
                                <EditIcon/>
                            </IconButton>
                        </>
                    }
                    <IconButton edge="end" aria-label="delete"
                                onClick={this.handlePlayer}>
                        <VisibilityIcon/>
                    </IconButton>
                    <IconButton edge="end" aria-label="delete"
                                onClick={this.handlePlayer}>
                        <Switch
                            name="checkedA"
                            inputProps={{'aria-label': 'secondary checkbox'}}
                        />
                    </IconButton>
                </ListItemSecondaryAction>


                <Modal
                    open={this.state.modal}
                    onClose={this.handleModal}
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                >
                    <EditEventModal teamID={this.props.teamID} event={event}/>

                </Modal>
            </ListItem>

        )

    }
}


export default withStyles(useStyles)(EventAction);