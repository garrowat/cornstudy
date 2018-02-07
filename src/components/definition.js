import React from 'react';
import Typography from 'material-ui/Typography/Typography';
import { Loading } from './loading';



export default class Definition extends React.Component {

    componentDidMount() {
        const { id, word, setDefinition } = this.props;
        setDefinition(id, word);
    }

    render() {
        const {definitions, id} = this.props;
        return (
            <div>
                {
                    !definitions[id] || definitions[id].isLoading
                    ? <Loading thickness={3} />
                    : <Typography>{definitions[id].text}</Typography>
                }
            </div>
        )
    }
}