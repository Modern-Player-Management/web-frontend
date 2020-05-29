import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import Modal from "@material-ui/core/Modal";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AddTeamsModal from "./modal/AddTeams.modal";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '26.5vh',
        margin: '8px',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    button: {
        position: 'absolute',
        bottom: 0,
        margin: 30,
        right: 0,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));


export default function AddTeams(props) {
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
            <div className={classes.button} onClick={handleOpen}>
                <Fab color="primary" aria-label="add">
                    <AddIcon/>
                </Fab>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
            >
                <AddTeamsModal/>
            </Modal>
        </div>
    )
}