import React from 'react';
import Typography from 'material-ui/Typography/Typography';
import TextFIeld from 'material-ui/TextField';
import { Loading } from './loading';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    menu: {
        width: 200,
    },
});


class Definition extends React.Component {

    componentDidMount() {
        const { id, word, setDefinition } = this.props;
        setDefinition(id, word);
    }

    render() {
        const {definitions, id} = this.props;
        let selection = 
            definitions[id]
            ? definitions[id].selection
            : 0;

        return (
                !definitions[id] || !definitions[id].text || definitions[id].isLoading
                ? <Loading thickness={3} />
                : <Typography>{definitions[id].text[selection]}</Typography>

        )
    }
}

export default withStyles(styles)(Definition);