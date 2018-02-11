import React from 'react';
import Typography from 'material-ui/Typography/Typography';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    '@keyframes fadeIn': {
        from: {opacity: 0},
        to: {opacity: 1},
    },
    word: {
        opacity: 0,
        animation: 'fadeIn ease-in 1',
        animationFillMode: 'forwards',
        animationDuration: '0.5s',
    },
}); 


class Word extends React.Component {

    handleClick(id) {
        this.props.toggleEditing(id);
    }

    handleChange(e, id) {
        const word = e.target.value;
        console.log(word);
        this.props.setWord(id, word);
    }

    render() {
        const {word, classes, id, isEditing} = this.props;

        const wordMode = !word || isEditing === true
        ? <form>
                <TextField 
            type="search"
            margin="normal"
            value={word}
            onBlur={() => this.handleClick(id)}
            onChange={(e) => this.handleChange(e, id)}
            />
        </form>
        : <Typography 
        className={classes.word}
        onClick={() => this.handleClick(id)}
        >
            {word}
        </Typography>

        return (
            <div>{wordMode}</div>
        )
    }
}

export default withStyles(styles)(Word);