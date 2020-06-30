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
import EventService from "../../services/event.service";

export class EventAction extends Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }


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
        const {event} = this.props;

        const date = Moment(event.start);
        const dateComponent = date.utc().format('YYYY-MM-DD HH:mm:ss');

        return (
            <ListItem>
                <ListItemText
                    primary={event.name}
                    secondary={dateComponent}
                />

                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete"
                                onClick={this.handleDelete}>
                        <DeleteIcon/>
                    </IconButton>
                    <IconButton edge="end" aria-label="delete"
                                onClick={this.handlePlayer}>
                        <TimerIcon/>
                    </IconButton>

                    <IconButton edge="end" aria-label="delete"
                                onClick={this.handlePlayer}>
                        <EditIcon/>
                    </IconButton>
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
            </ListItem>
        )

    }
}


export default (EventAction);