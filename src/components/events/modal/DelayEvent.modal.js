import React, {Component} from "react";

import {withStyles} from "@material-ui/core/styles";
import EventService from '../../../services/event.service';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Form from "react-validation/build/form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CheckButton from "react-validation/build/button";
const useStyles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: "100%",
        },
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        outline: 0,
        maxWidth: '75%',
    },
});

class DelayEventModal extends Component {
    constructor(props) {
        super(props);
        this.onChangeReason = this.onChangeReason.bind(this);
        this.onChangeLength = this.onChangeLength.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.handleDelay = this.handleDelay.bind(this);

        this.state = {
            reason: "",
            length: "",
            type:"",
        };
    }

    handleDelay(e){
        e.preventDefault();


        this.form.validateAll();

        console.log(this);

        if (this.checkBtn.context._errors.length === 0) {

            EventService.addDiscrepancy(this.props.event.id,
                this.state.type,
                this.state.reason,
                this.state.length,
            ).then(
                () => {
                    window.location.reload();
                });

        } else {
            this.setState({
                loading: false
            });
        }
    }


    onChangeReason(e) {
        this.setState({
            reason: e.target.value
        });
    }

    onChangeLength(e){
        this.setState({
            length: Number(e.target.value),
        });
    }

    onChangeType(e){
        this.setState({
            type: e.target.value
        });
    }


    render() {
        const {classes} = this.props;

        return (
            <div className={classes.paper}>
                <h2 id="simple-modal-title">Add delay / absences</h2>

                <Form
                    className={classes.root}
                    noValidate
                    autoComplete="off"
                    onSubmit={this.handleDelay}
                    ref={c => {
                        this.form = c;
                    }}
                >

                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.type}
                        onChange={this.onChangeType}
                    >
                        <MenuItem value={0}>Absence</MenuItem>
                        <MenuItem value={1}>Delay</MenuItem>
                    </Select>

                    <TextField
                        id="standard-basic"
                        type="text"
                        label="Reason"
                        name="reason"
                        defaultValue={this.state.reason}
                        onChange={this.onChangeReason}
                    />
                    <TextField
                        id="standard-number"
                        type="number"
                        label="Length"
                        name="length"
                        defaultValue={this.state.length}
                        onChange={this.onChangeLength}
                    />

                    <Button
                        width="auto"
                        type="submit"
                        variant="contained"
                        color="primary"
                    > Create / Update </Button>

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


export default withStyles(useStyles)(DelayEventModal);