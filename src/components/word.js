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
    componentDidUpdate() {
        if (!this.props.wasFocused && this.props.isEditing) {this.handleFocus()};
    }

    handleFocus = () => {
        this.wordInput.select()
    }

    handleClick(e,id) {
        this.props.toggleEditing(id);
        this.props.isEditing && this.props.setDefinition(id, this.props.word);
        e.preventDefault();
    }

    handleChange(e, id) {
        const word = e.target.value;
        this.props.setWord(id, word);
    }

    render() {
        const {
            word, 
            classes, 
            id, 
            isEditing
        } = this.props;

        const wordMode = !word || isEditing === true
        ? <form onSubmit={(e) => this.handleClick(e,id)}>
            <TextField 
            inputRef={e => this.wordInput = e}
            autoFocus={true}
            type="search"
            margin="normal"
            value={word}
            onBlur={(e) => this.handleClick(e,id)}
            onChange={(e) => this.handleChange(e,id)}
            />
        </form>
        : <Typography 
        className={classes.word}
        onClick={(e) => this.handleClick(e,id)}
        >
            {word}
        </Typography>

        return (
            <div>{wordMode}</div>
        )
    }
}

export default withStyles(styles)(Word);