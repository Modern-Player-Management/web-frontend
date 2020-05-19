import React from "react";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

function createStyleSheet(param) {
    return undefined;
}

const styleSheet = createStyleSheet(theme => ({
    root: {
        [theme.breakpoints.up("sm")]: {
            "min-height": 500
        }
    }
}));

function ResponsiveContainerGrid(props) {
    const classes = props.classes;
    const { children } = props;
    return (
        <Grid
            className={classes.root}
            container
            direction="row"
            justify="center"
            align="center"
        >
            {children}
        </Grid>
    );
}

export default withStyles(styleSheet)(ResponsiveContainerGrid);