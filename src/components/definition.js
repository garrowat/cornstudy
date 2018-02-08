import React from 'react';
import Badge from 'material-ui/Badge';
import Typography from 'material-ui/Typography/Typography';
import TextFIeld from 'material-ui/TextField';
import { Loading } from './loading';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    '@keyframes fadeIn': {
        from: {opacity: 0},
        to: {opacity: 1},
    },
    definition: {
        opacity: 0,
        animation: 'fadeIn ease-in 1',
        animationFillMode: 'forwards',
        animationDuration: '0.5s',
    },
}); 


class Definition extends React.Component {

    componentDidMount() {
        const { id, word, setDefinition } = this.props;
        setDefinition(id, word);
    }

    handleClick(id) {
        this.props.cycleDefinition(id);
    }

    render() {
        const {definitions, id, classes} = this.props;
        let selection = 
            definitions[id]
            ? definitions[id].selection
            : 0;

        return (
                !definitions[id] || !definitions[id].text || definitions[id].isLoading
                ? <Loading thickness={3} />
                : <Badge badgeContent={definitions[id].text.length} color="secondary" className={classes.badge}>
                    <Typography 
                        className={classes.definition}
                        onClick={(e) => this.handleClick(id)}
                    >
                        {definitions[id].text[selection]}
                    </Typography>
                </Badge>

        )
    }
}

export default withStyles(styles)(Definition);