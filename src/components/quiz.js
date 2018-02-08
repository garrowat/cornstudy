import React from 'react';
import Definition from './definition.js'
import Button from 'material-ui/Button';
import { withLoading } from './loading.js';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

const styles = theme => ({
    root: {
        textAlign: 'center',
        margin: 'auto',
    },
    quiz: {
        margin: 'auto',
        maxWidth: 700,
    },
    table: {
        maxWidth: 600,
        margin: 'auto',
    },
    quizbutton: {
        margin: theme.spacing.unit * 4,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    definition: {
        maxWidth: 100,
        transition: 'all 3s ease-in',
    },
});

class Quiz extends React.Component {

    getQuizLines = (data, classes, isLoading, setDefinition, definitions) => {
        return (
            <TableWithLoading className={classes.table} isLoading={isLoading} loadingThickness={10}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subheading">
                                Word
                            </Typography >
                        </TableCell>
                        <TableCell numeric>
                            <Typography variant="subheading">
                                Definition
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((word, id) => {
                        return (
                            <TableRow key={word.id}>
                                <TableCell><Typography>{word.word}</Typography></TableCell>
                                <TableCellWithLoading numeric className={classes.definition}>
                                    <Definition 
                                        id={word.id}
                                        definitions={definitions}
                                        word={word.word}
                                        setDefinition={setDefinition}
                                    />
                                </TableCellWithLoading>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </TableWithLoading>
        )
    };

    render () {
        const { classes, words, definitions, isLoading, setDefinition } = this.props;
        let id = -1;
        const data = [...Array(words.length)].map( (val, index) => {
            id += 1;
            console.log(data);
            return {id, word: words[index]};
        });

        return (
            <Paper className={classes.quiz}>
                <Button color="primary" variant="raised" className={classes.quizbutton} onClick={() => this.props.generateQuiz()}>
                    Generate Quiz
                </Button>
                <Button color="secondary" variant="raised" className={classes.quizbutton} onClick={() => this.props.shuffleDefinitions()}>
                    Shuffle Definitions
                </Button>
                {
                    words.length > 0 || isLoading === true
                    ? this.getQuizLines(data, classes, isLoading, setDefinition, definitions)
                    : <div className={classes.root}>
                        <Typography variant="caption">
                            Press Generate Quiz
                        </Typography>
                    </div>
                }
            </Paper>
        )
    }
}

const TableWithLoading = withLoading(Table);
const TableCellWithLoading = withLoading(TableCell);

export default withStyles(styles)(Quiz);