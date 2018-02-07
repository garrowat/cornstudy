import React from 'react';
import Quiz from '../components/quiz';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';

const baseUrl = `https://api.wordnik.com:80/v4/word.json/`;
const apiKey = process.env.REACT_APP_API_KEY;
const defUrl = `/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=${apiKey}`;
const randomListUrl = `https://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=7&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=10&api_key=${apiKey}`;

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 2.5,
    paddingBottom: theme.spacing.unit * 5,
  },
});

class Index extends React.Component {
  constructor() {
    super();

    this.state = {
      quizLength: 1,
      words:[],
      definitions:[],
      originalDefinitions: [],
      isLoading: false,
      error: '',
    };
  }

  generateQuiz = () => {
    this.setState({ isLoading: true, words: [], definitions: [] })

    fetch(randomListUrl)
    // First we fetch the words
      .then( (response) => {
        if (response.ok) return response.json();
        throw new Error("Something went wrong.");
      })
      .then( (entries) => {
        let words = entries.reduce( (result, entry) => {
          result.push(entry.word);
          return result;
        },[])
        return words;
      })
      .then( (words) => {
        this.setState({ words: words, isLoading: false, })
      })
      .catch(error => console.log(error));
  }

  shuffleDefinitions = () => {
    this.setState( { definitions: [...this.state.definitions].sort(() => (Math.random() - 0.5)) } )
    console.log(this.state.definitions);
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

    let newWords = curListLength >= newLength ?
    [...this.state.words].slice(0,curListLength - difference) :
    [...this.state.words].fill('',curListLength, curListLength + difference)

    this.setState({ quizLength: Number(newLength), words: newWords })
  }

  setWord = (i,word) => {
    let words = [...this.state.words] || [];
    words[i] = word || '';
    this.setState({ words });
  }

  setDefinition = (id, word) => {
    let definitions = [...this.state.definitions] || [];
    definitions[id] = {id: id, isLoading: true};
    this.setState({ definitions })
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
          ? entries[0].text
          : 'Word not found';
        definitions[id] = { id, text, isLoading: false };
        this.setState({ definitions });
      })
      .catch(function(error) {
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
    const { words } = this.state;

    return (
      <div className={classes.root}>
          <Typography variant="display4">
            CornStudy
          </Typography>
          <Quiz 
            classes={classes}
            words={words}
            definitions={this.state.definitions}
            isLoading={this.state.isLoading}
            generateQuiz={this.generateQuiz}
            setDefinition={this.setDefinition}
            shuffleDefinitions={this.shuffleDefinitions}
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
