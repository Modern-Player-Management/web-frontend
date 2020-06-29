import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import React, {Component} from "react";
import CardActions from "@material-ui/core/CardActions";
import RemoveTeam from "./RemoveTeam.component";
import EditTeam from "./EditTeam.component";
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import PlayerList from "./PlayerList.component";
import {withStyles} from "@material-ui/core/styles";
import UserService from "../../services/user.service";

const useStyles = (theme) => ({
    root: {
        maxWidth: 343,
        borderRadius: 12,
        padding: 12,
        margin: 25,
        width: '100%',
        boxShadow: 'rgba(34, 35, 58, 0.2) 0px 14px 80px',
        transition: 'all 0.3s ease 0s',
        position: 'relative'
    },
    media: {
        borderRadius: 6,
        maxWidth: 200
    },
    actions: {
        justifyContent: 'center',
        position: 'absolute',
        bottom: '7px',
        left: '20%',

    },
    content: {
        paddingBottom: 45,
    }
});


class CardTeams extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: "",
            name: "",
            image: "",
        };
    }

    componentDidMount() {

        UserService.getImageTeam(this.props.team.image).then(
            response => {
                this.setState({
                    image: "data:image/png;base64," + response,
                });
            }
        );
    }

    render() {
        const {classes, team} = this.props;
        console.log(this.state.image!== "");
        return (

            <Card className={classes.root}>

                {
                    this.state.image !== "" && <img className={classes.media} src={this.state.image} alt={team.name}/>
                }

                <CardContent className={classes.content}>
                    <TextInfoContent
                        overline={team.manager.username}
                        heading={team.name}
                        body={
                            team.description
                        }
                    />
                </CardContent>
                <CardActions className={classes.actions}>
                    <PlayerList team={team}/>
                    <RemoveTeam teamid={team.id}/>
                    <EditTeam team={team}/>
                </CardActions>
            </Card>
        )
    }
}

export default withStyles(useStyles)(CardTeams);