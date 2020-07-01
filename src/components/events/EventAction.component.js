import React, {Component} from "react";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItem from "@material-ui/core/ListItem";
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Switch from "@material-ui/core/Switch";
import TimerIcon from '@material-ui/icons/Timer';
import EventService from "../../services/event.service"
import Modal from "@material-ui/core/Modal";
import {withStyles} from "@material-ui/core/styles";
import EditEventModal from "./modal/EditEvent.modal";
import DetailsEventModal from "./modal/DetailsEvent.modal";
import Utils from "../../utils/utils";
import TeamService from "../../services/team.service";

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
            modalType: null,
            confirmation: null,
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleModalEdit = this.handleModalEdit.bind(this);
        this.handleModalDetails = this.handleModalDetails.bind(this);
        this.handleConfirmation = this.handleConfirmation.bind(this);
    }

    handleModal = () => {
        this.setState({
            modal: !this.state.modal,
        })
    };

    handleConfirmation = (event) => {
        this.setState({
            confirmation: event.target.checked
        })
        console.log(this.state.confirmation);
        EventService.confirmPresence(this.props.teamID, !this.state.confirmation)

    };

    handleModalEdit = () => {
        this.handleModal();
        this.setState({
            modalType: "edit"
        })
    };

    handleModalDetails = () => {
        this.handleModal();
        this.setState({
            modalType: "details"
        })
    };


    handleDelete(e) {
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

        console.log(event);

        return (
            <ListItem>
                <ListItemText
                    primary={event.name}
                    secondary={Utils.IsoToString(event.date)}
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
                                        onClick={this.handleModalEdit}>
                                <EditIcon/>
                            </IconButton>
                        </>
                    }
                    <IconButton edge="end" aria-label="details"
                                onClick={this.handleModalDetails}>
                        <VisibilityIcon/>
                    </IconButton>
                    <IconButton edge="end" aria-label="delete"
                                onClick={this.handlePlayer}>
                        <Switch
                            checked={this.state.confirmation}
                            onChange={this.handleConfirmation}
                            name="confirmation"
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

                    {
                        {
                            'edit': <EditEventModal teamID={this.props.teamID} event={event}/>,
                            'details': <DetailsEventModal teamID={this.props.teamID} event={event}/>,
                        }[this.state.modalType]
                    }

                </Modal>
            </ListItem>

        )

    }
}


export default withStyles(useStyles)(EventAction);