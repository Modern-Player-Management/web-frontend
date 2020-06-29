import React, {Component} from "react";
import UserService from "../../services/user.service";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Typography} from "@material-ui/core";
import TextInfoContent from '@mui-treasury/components/content/textInfo';

const useStyles = (theme) => ({
    root: {
        maxWidth: 343,
        borderRadius: 12,
        padding: 12,
        margin: 25,
        width: '100%',
        boxShadow: 'rgba(34, 35, 58, 0.2) 0px 14px 80px',
        transition: 'all 0.3s ease 0s',
        position: 'relative'
    },
    media: {
        borderRadius: 6,
        maxWidth: 200
    },
    input: {
        display: 'none',
    },
    actions: {
        justifyContent: 'center',
        position: 'absolute',
        bottom: '7px',
        left: '12%',
    },
    content: {
        paddingBottom: 45,
    }
});


export class TeamView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teamID: this.props.match.params.teamID,
            data: "",
        };
    }

    componentDidMount() {
        UserService.getTeam(this.state.teamID).then(
            response => {
                this.setState({
                    data: response.data,
                });
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


    }

    render() {
        const {classes} = this.props;
        const {data} = this.state;

        console.log(data);

        return (
            <>
            {
                this.state.data !== "" &&

                <>
                        <Typography variant='h5' className={classes.text}>
                            {data.name}
                        </Typography>
                        <Card className={classes.root}>

                            <CardContent className={classes.content}>
                                <TextInfoContent
                                    overline={data.manager.username}
                                    heading={data.name}
                                    body={
                                        data.description
                                    }
                                />
                            </CardContent>
                        </Card>
                </>

            }
            </>
        )

    }
}


export default withStyles(useStyles)(TeamView);