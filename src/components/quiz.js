import React from 'react';
import Definition from './definition.js';
import Word from './word.js';
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
        paddingBottom: theme.spacing.unit * 3,
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

    getQuizLines = (
        words, 
        classes, 
        isLoading, 
        setDefinition, 
        definitions, 
        cycleDefinition, 
        toggleEditing,
        setWord,
        quizLength,
        isShuffled
    ) => {
        return (
            <TableWithLoading 
            className={classes.table} 
            isLoading={isLoading} 
            type='circular' 
            loadingThickness={10}
            >
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
                    {words.map((word) => {
                        return (
                            <TableRow key={word.id}>
                                <TableCell>
                                    <Word
                                    id={word.id}
                                    word={word.word}
                                    setWord={setWord}
                                    isEditing={word.isEditing}
                                    wasFocused={word.wasFocused}
                                    setDefinition={setDefinition}
                                    toggleEditing={toggleEditing}
                                    isShuffled={isShuffled}
                                    />
                                </TableCell>
                                <TableCellWithLoading numeric className={classes.definition}>
                                    <Definition 
                                    id={word.id}
                                    definitions={definitions}
                                    word={word.word}
                                    setDefinition={setDefinition}
                                    cycleDefinition={cycleDefinition}
                                    isShuffled={isShuffled}
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
        const { 
            classes, 
            words, 
            definitions, 
            toggleEditing,
            isLoading, 
            setDefinition, 
            cycleDefinition,
            setWord,
            quizLength,
            isShuffled,
        } = this.props;

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
                    ? this.getQuizLines(
                        words, 
                        classes, 
                        isLoading, 
                        setDefinition, 
                        definitions, 
                        cycleDefinition,
                        toggleEditing,
                        setWord,
                        quizLength,
                        isShuffled
                    )
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