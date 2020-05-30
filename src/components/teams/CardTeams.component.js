import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import AddPlayers from "./AddPlayers.component";
import List from "@material-ui/core/List";
import RemovePlayer from "./RemovePlayer.component";
import PersonIcon from '@material-ui/icons/Person';
import RemoveTeam from "./RemoveTeam.component";
import EditTeam from "./EditTeam.component";
import CardMedia from "@material-ui/core/CardMedia";
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import cx from 'clsx';
import TextInfoContent from '@mui-treasury/components/content/textInfo';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 343,
        borderRadius: 12,
        padding: 12,
        margin: 25,
    },
    media: {
        borderRadius: 6,
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    actions: {
        justifyContent: 'center'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));


export default function CardTeams(props) {
    const classes = useStyles();

    const mediaStyles = useFourThreeCardMediaStyles();
    const textCardContentStyles = useN04TextInfoContentStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (

        <Card className={cx(classes.root, shadowStyles.root)}>
            <CardMedia
                className={cx(classes.media, mediaStyles.root)}
                image={props.team.image}
                title={props.team.name}
            />
            <CardContent className={classes.content}>
                <TextInfoContent
                    classes={textCardContentStyles}
                    overline={props.team.manager.username}
                    heading={props.team.name}
                    body={
                        props.team.description
                    }
                />
            </CardContent>
            <CardActions className={classes.actions}>
                <Button size="small" color="primary" onClick={handleOpen}>
                    {props.team.players.length} <PersonIcon/>
                </Button>
                <RemoveTeam teamid={props.team.id}/>
                <EditTeam team={props.team}/>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                >
                    <PlayersList paper={classes.paper} team={props.team}/>
                </Modal>


            </CardActions>
        </Card>
    )
}

function PlayersList(props) {
    return (
        <div className={props.paper}>
            <h2 id="simple-modal-title">Players list</h2>
            <Typography variant="body2" color="textSecondary">
                <List>
                    {
                        props.team.players.length !== 0 ? props.team.players.map((player, index) => {
                            return (
                                <RemovePlayer playerid={player.id} playername={player.username} teamid={props.team.id}/>
                            )
                        }) : "There is no member..."
                    }
                </List>
            </Typography>
            <AddPlayers teamid={props.team.id}/>
        </div>
    )
}