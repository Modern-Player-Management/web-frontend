import React, {Component} from "react";

import {withStyles} from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import Utils from "../../../utils/utils";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItem from "@material-ui/core/ListItem";
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: '75%',
        outline: 0,
        padding: theme.spacing(2, 4, 3),
        boxShadow: theme.shadows[5],
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        padding: theme.spacing(2),
    },
});

class DetailsEventModal extends Component {

    render() {
        const {classes, event} = this.props;
        console.log(event);

        return (
            <div className={classes.root}>
                <h2 id="simple-modal-title">Details event</h2>

                <p>{event.name}</p>
                <p>{Utils.IsoToString(event.start)}</p>
                <p>{event.description}</p>
                <p>{event.type}</p>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <h3>Confirmation</h3>
                        <List>
                            {
                                event.participations && event.participations.length !== 0 ? event.participations.map((participation, index) => {
                                    return (
                                        <ListItem>
                                            <ListItemText
                                                primary={participation.username}
                                            />
                                            <ListItemSecondaryAction>
                                                {
                                                    participation.confirmed === false ? <CloseIcon/> : <CheckIcon/>
                                                }
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )
                                }) : "There is no participation..."
                            }
                        </List>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <h3>Absence / Delay</h3>
                        <List>
                            {
                                event.discrepancies && event.discrepancies.length !== 0 ? event.discrepancies.map((discrepancy, index) => {
                                    return (
                                        <ListItem>
                                            <ListItemText
                                                primary={discrepancy.username}
                                            />
                                            <ListItemSecondaryAction>
                                                {discrepancy.reason} {discrepancy.type} : {discrepancy.delayLength}
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )
                                }) : "There is no discrepancie..."
                            }
                        </List>
                    </Grid>
                </Grid>
            </div>


        );
    }
}


export default withStyles(useStyles)(DetailsEventModal);