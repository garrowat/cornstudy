import React from 'react';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography/Typography';
import { Loading } from './loading';
import { withStyles } from 'material-ui/styles';
import { find } from 'lodash';

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
        const definition = find(definitions, {id});
        console.log(definition);
        const selection = 
            definition  
            ? definition.selection
            : 0;
        

        return (
                !definition || !definition.text || definition.isLoading
                ? <Loading thickness={3} />
                : <Tooltip title={`${selection + 1}/${definition.text.length}`} placement="right" open style={{"backgroundColor": "blue"}}>
                    <Typography 
                        className={classes.definition}
                        onClick={() => this.handleClick(id)}
                    >
                        {definition.text[selection]}
                    </Typography>
                </Tooltip>

        )
    }
}

export default withStyles(styles)(Definition);