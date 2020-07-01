import React, {Component} from "react";

import Form from "react-validation/build/form";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import CheckButton from "react-validation/build/button";
import {withStyles} from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";

import {DateTimePicker,MuiPickersUtilsProvider} from "@material-ui/pickers";

import Utils from "../../../utils/utils";
import EventService from "../../../services/event.service";


const useStyles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: "100%",
        },
    },
    alert: {
        boxSizing: 'border-box',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        outline: 0,
        maxWidth: '75%',
    },
});

class EditEventModal extends Component {
    constructor(props) {
        super(props);
        this.handleTeams = this.handleTeams.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.handleDateStartChange = this.handleDateStartChange.bind(this);
        this.handleDateEndChange = this.handleDateEndChange.bind(this);

        this.state = {
            content: "",
            name: props.event.name,
            description: props.event.description,
            eventID: props.event.id,
            start: props.event.start,
            end: props.event.end,
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    handleDateStartChange(e){
        this.setState({
            start: Utils.DatetoIso(e),
        });
    }

    handleDateEndChange(e){
        this.setState({
            end: Utils.DatetoIso(e),
        });
    }


    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    handleTeams(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {

            EventService.editEvent(this.state.eventID, this.state.name, this.state.description, this.state.start, this.state.end, this.state.type).then(
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
                        loading: false,
                        message: resMessage
                    });
                }
            );
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.paper}>
                <h2 id="simple-modal-title">Edit event</h2>
                <Form
                    className={classes.root}
                    noValidate
                    autoComplete="off"
                    onSubmit={this.handleTeams}
                    ref={c => {
                        this.form = c;
                    }}
                >

                    <TextField
                        type="text"
                        label="Name"
                        name="name"
                        defaultValue={this.state.name}
                        onChange={this.onChangeName}
                    />
                    <TextField
                        type="text"
                        label="Description"
                        name="description"
                        defaultValue={this.state.description}
                        onChange={this.onChangeDescription}
                    />

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker value={this.state.start} onChange={this.handleDateStartChange}/>
                        <DateTimePicker value={this.state.end} onChange={this.handleDateEndChange}/>
                    </MuiPickersUtilsProvider>

                    {this.state.message && (
                        <Alert className={classes.alert} severity="error">{this.state.message}</Alert>
                    )}

                    <Button
                        width="auto"
                        type="submit"
                        variant="contained"
                        color="primary"
                    > Modify </Button>

                    <CheckButton
                        style={{display: "none"}}
                        ref={c => {
                            this.checkBtn = c;
                        }}
                    />
                </Form>
            </div>
        );
    }
}


export default withStyles(useStyles)(EditEventModal);