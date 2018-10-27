import React, { Component } from 'react';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'


const styles = theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.grey[500], 0.3),
        '&:hover': {
            backgroundColor: fade(theme.palette.grey[600], 0.4),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 300,
            },
        },
    },
});


class SearchInput extends Component {



    render() {
        const { classes } = this.props;

        return (
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
            </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }} />
            </div>
        );
    }
}

const StyledSearchInput = withStyles(styles)(SearchInput)

export { StyledSearchInput as SearchInput };

