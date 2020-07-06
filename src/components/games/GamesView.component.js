import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import GameAction from "./GameAction.component";
import UserService from "../../services/user.service";
import teamService from "../../services/team.service";
import GameService from "../../services/game.service";

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


export class GamesView extends Component {
    constructor(props) {
        super(props);

        this.state = {

            events: "",
            file: "",
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onFormSubmit(e) {
        e.preventDefault()
        GameService.addGame(this.props.teamID, {file: this.state.file}).then(
            () => {
            window.location.reload();
        })
    }

    onChange(e) {
        this.setState({file: e.target.files[0]})
    }

    render() {
        const {classes, games} = this.props;

        return (
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <TextInfoContent
                        heading="Games"
                    />
                    <List>

                        {
                            games && games.length !== 0 ? games.map((game, index) => {
                                return (
                                    <GameAction game={game} key={index}/>
                                )
                            }) : "There is no game..."
                        }

                    </List>
                    <form onSubmit={this.onFormSubmit}>
                        <input type="file" id="icon-button-file" onChange={this.onChange}/>
                        <Button variant="contained" color="primary" type="submit">Upload</Button>
                    </form>
                </CardContent>
            </Card>
        )

    }
}


export default withStyles(useStyles)(GamesView);