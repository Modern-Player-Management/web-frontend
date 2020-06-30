import React, {Component} from "react";

import Form from "react-validation/build/form";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import CheckButton from "react-validation/build/button";
import {withStyles} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DateFnsUtils from "@date-io/date-fns";

import {DateTimePicker,MuiPickersUtilsProvider} from "@material-ui/pickers";
import Moment from "moment";
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


function DatetoIso(date){
    return Moment(date).utc().toISOString();
}

class AddEventsModal extends Component {
    constructor(props) {
        super(props);
        this.handleEvent = this.handleEvent.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.handleDateStartChange = this.handleDateStartChange.bind(this);
        this.handleDateEndChange = this.handleDateEndChange.bind(this);

        this.state = {
            name: "",
            description: "",
            start: "",
            end: "",
            type: null,
        };
    }

    handleDateStartChange(e){
        this.setState({
            start: DatetoIso(e),
        });
    }

    handleDateEndChange(e){
        this.setState({
            end: DatetoIso(e),
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeType(e){
        this.setState({
            type: e.target.value
        });
    }

    handleEvent(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        console.log(this.state);

        if (this.checkBtn.context._errors.length === 0) {

            EventService.createEvent(this.props.teamID, this.state.name, this.state.description, this.state.start, this.state.end, this.state.type).then(
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
                <h2 id="simple-modal-title">Add event</h2>
                <Form
                    className={classes.root}
                    noValidate
                    autoComplete="off"
                    onSubmit={this.handleEvent}
                    ref={c => {
                        this.form = c;
                    }}
                >

                    <TextField
                        id="standard-basic"
                        type="text"
                        label="Name"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChangeName}
                    />
                    <TextField
                        id="standard-basic"
                        type="text"
                        label="Description"
                        name="description"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                    />

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker value={this.state.start} onChange={this.handleDateStartChange}/>
                        <DateTimePicker value={this.state.end} onChange={this.handleDateEndChange}/>
                    </MuiPickersUtilsProvider>

                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.type}
                        onChange={this.onChangeType}
                    >
                        <MenuItem value={0}>Ten</MenuItem>
                        <MenuItem value={1}>Twenty</MenuItem>
                        <MenuItem value={2}>Thirty</MenuItem>
                    </Select>

                    {this.state.message && (
                        <Alert className={classes.alert} severity="error">{this.state.message}</Alert>
                    )}

                    <Button
                        width="auto"
                        type="submit"
                        variant="contained"
                        color="primary"
                    > Create </Button>

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


export default withStyles(useStyles)(AddEventsModal);