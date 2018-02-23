import React from 'react';
import Quiz from '../components/quiz';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';
import Hidden from 'material-ui/Hidden';

const baseUrl = `https://api.wordnik.com/v4/word.json/`;
const apiKey = process.env.REACT_APP_API_KEY;
const defUrl = `/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=${apiKey}`;
const randomListUrl = `https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=7&maxDictionaryCount=-1&useCanonical=true&minLength=5&maxLength=-1&limit=10&api_key=${apiKey}`;

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 2.5,
    paddingBottom: theme.spacing.unit * 3,
  },
});

class Index extends React.Component {
  constructor() {
    super();

    this.state = {
      quizLength: 10,
      words:[],
      originalDefinitions: [],
      isLoading: false,
      error: '',
    };
  }

  generateQuiz = () => {
    this.setState({ isLoading: true, words: [], definitions: [] })
    let id = 0;

    fetch(randomListUrl)
    // First we fetch the words
      .then( (response) => {
        if (response.ok) return response.json();
        throw new Error("Something went wrong.");
      })
      .then( (entries) => {
        let words = entries.reduce( (result, entry) => {
          const isEditing = false;
          const wasFocused = false;
          const word = entry.word;
          result.push({id, word, isEditing, wasFocused});
          id += 1;
          return result;
        },[])
        this.setState({ words, isLoading: false, });        
      })
      .catch(error => console.log(error));
  }

  shuffleDefinitions = () => {
    this.setState({ definitions: [...this.state.definitions].sort(() => (Math.random() - 0.5)) })
    console.log(this.state.definitions);
  }

  cycleDefinition = (id) => {
    const definitions = [...this.state.definitions];
    console.log(definitions[id].selection);
    definitions[id].selection < definitions[id].text.length - 1
      ? definitions[id].selection += 1
      : definitions[id].selection = 0;
    this.setState({definitions})
  }

  unshuffleDefinitions = (wordDefinitions) => {
    this.setState( { definitions: this.state.originalDefinitions } )
  }

  setQuizLength = (newLength) => {
    if (newLength < 1 || newLength > 100 || isNaN(newLength)) {
      newLength = 1;
    }

    let curListLength = this.state.words.length;
    let difference = Math.abs(curListLength - newLength);

    let newWords = 
      curListLength >= newLength 
      ? [...this.state.words].slice(0,curListLength - difference) 
      : [...this.state.words].fill('',curListLength, curListLength + difference)

    this.setState({ quizLength: Number(newLength), words: newWords });
  }

  toggleEditing = (id) => {
    const words = [...this.state.words] || [];
    const word = words[id];
    word.wasFocused = false;
    word.isEditing = !word.isEditing;
    words[id] = word || '';
    this.setState({ words });
  }

  setWord = (id, word) => {
    let words = [...this.state.words] || [];
    words[id].wasFocused = true;
    words[id].word = word || '';
    this.setState({ words });
  }

  setDefinition = (id, word) => {
    const selection = 0;
    // initialize this definition
    let definitions = [...this.state.definitions] || [];
    definitions[id] = {id, isLoading: true, selection};
    this.setState({ definitions });

    fetch(baseUrl + word + defUrl)
      .then( (response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Word not found');
      })
      .then( (entries) => {
        let definitions = [...this.state.definitions];

        const text = 
          entries !== [] 
          ? entries.map(entry => entry.text)
          : 'Word not found';

        definitions[id] = { id, text, isLoading: false, selection};
        this.setState({ definitions });
      })
      .catch(function(error) {
        definitions[id] = {...this.state.definitions, error};
        console.log('Error fetching definition: ' + error.message);
      })
  }

  clearDefinition = (i) => {
    let definitions = [...this.state.definitions] || [];
    definitions[i] = '';
    this.setState({ definitions });
  }

  fieldChange = (i,e) => {
    const changeType = e.target.name;
    const newValue = e.target.value;

    switch (changeType) {
      case 'words':
        let words = [...this.state.words];
        words[i] = newValue;
        this.setState({ words });
        break;

      case 'quizLength':
        const quizLength = e.target.value;
        this.setState({ quizLength });
        break;

      default:
        console.log('Woops! Event error!');
    }
  }

  render() {
    const { classes } = this.props;
    const { words, definitions, isLoading } = this.state;

    return (
      <div className={classes.root}>
          <Hidden smDown>
            <Typography variant="display4">
              CornStudy
            </Typography>
          </Hidden>
          <Hidden mdUp>
            <Typography variant="display3">
              CornStudy
            </Typography>
          </Hidden>
          <Quiz 
            classes={classes}
            words={words}
            definitions={definitions}
            isLoading={isLoading}
            toggleEditing={this.toggleEditing}
            generateQuiz={this.generateQuiz}
            setWord={this.setWord}
            setDefinition={this.setDefinition}
            shuffleDefinitions={this.shuffleDefinitions}
            cycleDefinition={this.cycleDefinition}
            unshuffleDefinitions={this.unshuffleDefinitions}
          />
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
