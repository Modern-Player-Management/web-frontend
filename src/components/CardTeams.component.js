import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        margin: '8px',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));


export default function CardTeams(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
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
                    <Typography variant="body2" color="textSecondary" component="p">
                        {
                            props.team.members.length !== 0 ? props.team.members.map((member, index) => {
                                return (
                                    member.username
                                )
                            }) : "There is no member..."
                        }
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
        </Button>
                <Button size="small" color="primary">
                    Learn More
        </Button>
            </CardActions>
        </Card>
    )
}