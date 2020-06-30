import React, {Component} from "react";
import UserService from "../../services/user.service";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItem from "@material-ui/core/ListItem";
import EditIcon from '@material-ui/icons/Edit';
import List from "@material-ui/core/List";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Switch from "@material-ui/core/Switch";
import Moment from 'moment';
import TimerIcon from '@material-ui/icons/Timer';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ResponsiveContainerGrid from "../../utils/ResponsiveContainer.component";

const useStyles = (theme) => ({
    card: {
        borderRadius: 12,
        boxShadow: 'rgba(34, 35, 58, 0.2) 0px 14px 80px',
        transition: 'all 0.3s ease 0s',
        width: '45%',
        margin: '20px',
    },
    media: {
        borderRadius: 6,
        maxWidth: 200
    },
    input: {
        display: 'none',
    },
    text: {
        margin: '25px',
    },
});


export class TeamView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teamID: this.props.match.params.teamID,
            data: "",
        };
    }

    componentDidMount() {
        UserService.getTeam(this.state.teamID).then(
            response => {
                this.setState({
                    data: response.data,
                });
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
        const {data} = this.state;

        console.log(data);

        return (
            <>
                {
                    this.state.data !== "" &&

                    <>
                        <ListItemText
                            className={classes.text}
                            primary={data.name + " Managed by " + data.manager.username}
                            secondary={data.description}
                        />

                        <ResponsiveContainerGrid>
                            <Card className={classes.card}>
                                <CardContent className={classes.content}>
                                    <TextInfoContent
                                        heading="Events"
                                    />
                                    <List>

                                        {
                                            data.events.length !== 0 ? data.events.map((event, index) => {

                                                const date = Moment(event.start);
                                                const dateComponent = date.utc().format('YYYY-MM-DD HH:mm:ss');
                                                console.log(dateComponent);

                                                return (
                                                    <>
                                                        <ListItem>
                                                            <ListItemText
                                                                primary={event.name}
                                                                secondary={dateComponent}
                                                            />

                                                            <ListItemSecondaryAction>
                                                                <IconButton edge="end" aria-label="delete"
                                                                            onClick={this.handlePlayer}>
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
                                                    </>
                                                )
                                            }) : "There is no event..."
                                        }

                                    </List>
                                    <Button variant="contained" color="primary">
                                        Create
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className={classes.card}>
                                <CardContent className={classes.content}>
                                    <TextInfoContent
                                        heading="Games"
                                    />
                                    <List>

                                        {
                                            data.games.length !== 0 ? data.games.map((game, index) => {

                                                const date = Moment(game.start);
                                                const dateComponent = date.utc().format('YYYY-MM-DD HH:mm:ss');
                                                console.log(dateComponent);

                                                return (
                                                    <>
                                                        <ListItem>
                                                            <ListItemText
                                                                primary={game.name}
                                                                secondary={dateComponent}
                                                            />

                                                            <ListItemSecondaryAction>
                                                                <IconButton edge="end" aria-label="delete"
                                                                            onClick={this.handlePlayer}>
                                                                    <DeleteIcon/>
                                                                </IconButton>
                                                                <IconButton edge="end" aria-label="delete"
                                                                            onClick={this.handlePlayer}>
                                                                    <VisibilityIcon/>
                                                                </IconButton>
                                                            </ListItemSecondaryAction>
                                                        </ListItem>
                                                    </>
                                                )
                                            }) : "There is no event..."
                                        }

                                    </List>
                                    <Button variant="contained" color="primary">
                                        Create
                                    </Button>
                                </CardContent>
                            </Card>
                        </ResponsiveContainerGrid>
                    </>

                }
            </>
        )

    }
}


export default withStyles(useStyles)(TeamView);