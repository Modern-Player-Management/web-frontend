import React from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import EditTeamModal from "./modal/EditTeam.modal";


export default function EditTeam(props) {

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
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <EditTeamModal paper={props.paper} team={props.team}/>
            </Modal>
        </div>
    )
}