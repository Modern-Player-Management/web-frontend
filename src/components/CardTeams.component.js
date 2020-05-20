import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        margin: '8px',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));


export default function CardTeams(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                title={props.team.name}
                subheader={props.team.manager.username}
            />
            <CardMedia
                className={classes.media}
                image="/static/images/cards/paella.jpg"
                title={props.team.name}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {
                        props.team.members.length !== 0 ?  props.team.members.map((member, index) => {
                            return (
                                member.username
                            )
                        }):"There is no member..."
                    }
                </Typography>
            </CardContent>
        </Card>
    )
}