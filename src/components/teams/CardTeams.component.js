import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import React, {Component} from "react";
import CardActions from "@material-ui/core/CardActions";
import RemoveTeam from "./RemoveTeam.component";
import EditTeam from "./EditTeam.component";
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import PlayerList from "./PlayerList.component";
import {withStyles} from "@material-ui/core/styles";
import TeamService from "../../services/team.service";
import UserService from "../../services/user.service";
import Button from "@material-ui/core/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
import teamService from "../../services/team.service";

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
    input: {
        display: 'none',
    },
    actions: {
        justifyContent: 'center',
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
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    onFormSubmit(e) {
        e.preventDefault() // Stop form submit
        UserService.fileUpload(this.state.file).then(
            response => teamService.updateTeam(this.props.team.id, {image: response.data.id}
            ).then(
                response => window.location.reload()
            ));
    }

    onChange(e) {
        this.setState({file: e.target.files[0]})
    }

    componentDidMount() {

        TeamService.getImageTeam(this.props.team.image).then(
            response => {
                this.setState({
                    image: "data:image/png;base64," + response,
                });
            }
        );
    }

    render() {
        const {classes, team} = this.props;
        return (
            <Card className={classes.root}>

                {
                    this.state.image !== "" && <img className={classes.media} src={this.state.image} alt={team.name}/>
                }
                <form onSubmit={this.onFormSubmit}>
                    <input type="file" id="icon-button-file" onChange={this.onChange}/>
                    <Button variant="contained" color="primary" type="submit">Upload</Button>
                </form>

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
                    {
                        team.isCurrentUserManager &&
                        <>
                            <RemoveTeam teamid={team.id}/>
                            <EditTeam team={team}/>
                        </>

                    }

                    <div>
                        <Button size="small" color="primary" edge="end" aria-label="delete" href={`/team/${team.id}`}>
                            <VisibilityIcon/>
                        </Button>
                    </div>
                </CardActions>
            </Card>
        )
    }
}

export default withStyles(useStyles)(CardTeams);