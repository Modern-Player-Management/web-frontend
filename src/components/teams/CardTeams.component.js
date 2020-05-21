import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import AddMembers from "./AddMembers.component";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '26.5vh',
        margin: '8px',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


export default function CardTeams(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Card className={classes.root}>
            <CardHeader
                title={props.team.name}
                subheader={props.team.manager.username}
            />
            {/*             <CardMedia
                className={classes.media}
                image="/static/images/cards/paella.jpg"
                title={props.team.name}
            /> */}
            <CardContent>
                desc
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={handleOpen}>
                    {props.team.memberships.length }
                    {props.team.memberships.length ? " Members" : " Member"}
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <MembersList paper={classes.paper} teams={props.team}/>
                </Modal>

                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    )
}

function MembersList(props) {
    return (
        <div className={props.paper}>
            <h2 id="simple-modal-title">Members list</h2>
            <Typography variant="body2" color="textSecondary" component="p">
                {
                    props.teams.memberships.length !== 0 ? props.teams.memberships.map((member, index) => {
                        return (
                            member.username
                        )
                    }) : "There is no member..."
                }
            </Typography>
            <AddMembers teamid={props.teams.id}/>
        </div>
    )
}