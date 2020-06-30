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

export class GameAction extends Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }


    handleDelete(e){
        e.preventDefault();

        console.log(this.props)
    }

    render() {
        const {game} = this.props;

        const date = Moment(game.start);
        const dateComponent = date.utc().format('YYYY-MM-DD HH:mm:ss');

        return (
            <ListItem>
                <ListItemText
                    primary={game.name}
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


export default (GameAction);