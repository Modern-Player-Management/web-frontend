import React, {Component} from "react";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItem from "@material-ui/core/ListItem";
import VisibilityIcon from '@material-ui/icons/Visibility';
import GameService from "../../services/game.service";
import Modal from "@material-ui/core/Modal";
import DetailsGameModal from "./modal/DetailsGame.modal";
import {withStyles} from "@material-ui/core/styles";
import Utils from "../../utils/utils";

const useStyles = (theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});



class GameAction extends Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);

        this.state = {
            modal: false,
            modalType: null,
        };

        this.handleModalDetails = this.handleModalDetails.bind(this);
        this.handleModal = this.handleModal.bind(this);
    }

    handleModal = () => {
        this.setState({
            modal: !this.state.modal,
        })
    };

    handleModalDetails = () => {
        this.handleModal();
        this.setState({
            modalType: "details"
        })
    };


    handleDelete(e){
        e.preventDefault();

        GameService.removeGame(this.props.game.id).then(
            () => {
                window.location.reload();
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    message: resMessage
                });
            }
        );
    }

    render() {
        const {game,classes} = this.props;

        return (
            <ListItem>
                <ListItemText
                    primary={game.name}
                    secondary={Utils.IsoToString(game.date)}
                />

                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete"
                                onClick={this.handleDelete}>
                        <DeleteIcon/>
                    </IconButton>
                    <IconButton edge="end" aria-label="delete"
                                onClick={this.handleModalDetails}>
                        <VisibilityIcon/>
                    </IconButton>
                </ListItemSecondaryAction>


                <Modal
                    open={this.state.modal}
                    onClose={this.handleModal}
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                >

                    {
                        {
                            'details': <DetailsGameModal teamID={this.props.teamID} game={game}/>,
                        }[this.state.modalType]
                    }

                </Modal>


            </ListItem>
        )

    }
}

export default withStyles(useStyles)(GameAction);