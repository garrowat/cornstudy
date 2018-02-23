import React from 'react';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography/Typography';
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
        cursor: 'pointer',
    },
}); 


class Definition extends React.Component {

    componentDidMount() {
        const { id, word, setDefinition } = this.props;
        setDefinition(id, word);
    }

    handleClick = (id) => {
        this.props.cycleDefinition(id);
    }

    render() {
        const {definitions, id, classes} = this.props;
        const selection = 
            definitions[id]
            ? definitions[id].selection
            : 0;

        return (
                !definitions[id] || !definitions[id].text || definitions[id].isLoading
                ? <Loading thickness={3} />
                : <Tooltip title={definitions[id].text.length} placement="right" open style={{"backgroundColor": "blue"}}>
                    <Typography 
                        className={classes.definition}
                        onClick={() => this.handleClick(id)}
                    >
                        {definitions[id].text[selection]}
                    </Typography>
                </Tooltip>

        )
    }
}

export default withStyles(styles)(Definition);