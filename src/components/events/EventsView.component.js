import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import EventAction from "./EventAction.component";
import Modal from "@material-ui/core/Modal";
import AddEventsModal from "./modal/AddEvents.modal";

const useStyles = (theme) => ({
    card: {
        borderRadius: 12,
        boxShadow: 'rgba(34, 35, 58, 0.2) 0px 14px 80px',
        transition: 'all 0.3s ease 0s',
        width: '45%',
        margin: '20px',
    },
    media: {
        borderRadius: 6,
        maxWidth: 200
    },
    input: {
        display: 'none',
    },
    text: {
        margin: '25px',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export class EventsView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: "",
            modal: false,
        };

        this.handleModal = this.handleModal.bind(this);
    }

    handleModal = () => {
        this.setState({modal: !this.state.modal})
    };

    render() {
        const {classes, events} = this.props;

        return (
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <TextInfoContent
                        heading="Events"
                    />
                    <List>

                        {
                            events && events.length !== 0 ? events.map((event, index) => {
                                return (
                                    <EventAction isManager={this.props.isManager} teamID={this.props.teamID} event={event} key={index}/>
                                )
                            }) : "There is no event..."
                        }

                    </List>

                    {
                        this.props.isManager === true &&
                            <>
                        <Button variant="contained" color="primary" onClick={this.handleModal}>
                            Create
                        </Button>


                        <Modal
                        open={this.state.modal}
                        onClose={this.handleModal}
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        >
                            <AddEventsModal teamID={this.props.teamID}/>

                        </Modal>
                        </>
                    }

                </CardContent>
            </Card>
        )

    }
}


export default withStyles(useStyles)(EventsView);