import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import GameAction from "./GameAction.component";

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
        };
    }

    render() {
        const {classes, games} = this.props;

        return (
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <TextInfoContent
                        heading="Events"
                    />
                    <List>

                        {
                            games && games.length !== 0  ? games.map((game, index) => {
                                return (
                                    <GameAction game={game} key={index}/>
                                )
                            }) : "There is no game..."
                        }

                    </List>
                    <Button variant="contained" color="primary">
                        Upload
                    </Button>
                </CardContent>
            </Card>
        )

    }
}


export default withStyles(useStyles)(GamesView);