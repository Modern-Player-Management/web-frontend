import React from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import EditTeamModal from "./modal/EditTeam.modal";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));


export default function EditTeam(props) {
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
            <Button size="small" color="primary" edge="end" aria-label="delete" onClick={handleOpen}>
                <EditIcon/>
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
            >
                <EditTeamModal paper={props.paper} team={props.team}/>
            </Modal>
        </div>
    )
}