import React from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PlayerListModal from "./modal/PlayerList.modal";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));


export default function PlayerList(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (

        <div>
            <Button size="small" color="primary" onClick={handleOpen}>
                {props.team.players.length} <PersonIcon/>
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
            >
                <PlayerListModal team={props.team}/>
            </Modal>
        </div>
    )
}