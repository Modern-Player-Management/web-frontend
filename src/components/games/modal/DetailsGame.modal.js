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
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

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
    table: {
        minWidth: 650,
    },
});

class DetailsGameModal extends Component {

    render() {
        const {classes, game} = this.props;

        return (
            <div className={classes.root}>
                <h2 id="simple-modal-title">Details game</h2>

                <ListItemText
                    className={classes.text}
                    primary={game.name}
                    secondary={Utils.IsoToString(game.date)}
                />

                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Score</TableCell>
                                <TableCell align="right">Goal</TableCell>
                                <TableCell align="right">Saves</TableCell>
                                <TableCell align="right">Shots</TableCell>
                                <TableCell align="right">Assists</TableCell>
                                <TableCell align="right">Goals/Shots</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {game.playersStats.map((stat) => (
                                <TableRow key={stat.Player}>
                                    <TableCell component="th" scope="row">
                                        {stat.player}
                                    </TableCell>
                                    <TableCell align="right">{stat.score}</TableCell>
                                    <TableCell align="right">{stat.goals}</TableCell>
                                    <TableCell align="right">{stat.saves}</TableCell>
                                    <TableCell align="right">{stat.shots}</TableCell>
                                    <TableCell align="right">{stat.assists}</TableCell>
                                    <TableCell align="right">{stat.goalShots}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>


        );
    }
}


export default withStyles(useStyles)(DetailsGameModal);