import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import Typist from "react-typist";

class TextCarousel extends Component {
  static propTypes = {
    phrases: PropTypes.arrayOf(PropTypes.string).isRequired,
    interval: PropTypes.number,
    typistProps: PropTypes.object,
  }

  static defaultProps = {
    interval: 3000,
    typistProps: {},
  }

  state = {
    currentPhraseIndex: 0
  }

  componentDidMount = () => {
    this.renderWord();
  };

  componentWillUnmount = () => {
    clearTimeout(this.timer);
  }

  setNextPhrase = () => {
    const { phrases } = this.props;
    const { currentPhraseIndex } = this.state;

    this.setState({
      currentPhraseIndex: (currentPhraseIndex + 1) % phrases.length,
    });
  }

  // TODO: add hideWhenDoneDelay time to the interval
  handleTypingComplete = () => {
    this.timer = setTimeout(() => {
      this.renderWord();
    }, this.props.interval);
  }

  getCurrentPhrase = () => this.props.phrases[this.state.currentPhraseIndex];

  renderWord = () => {
    const domNode = this.refs.phraseContainer;
    const typistProps = Object.assign({}, this.props.typistProps, {
      onTypingDone: this.handleTypingComplete,
    });

    ReactDOM.unmountComponentAtNode(domNode);
    ReactDOM.render(
      <Typist {...typistProps}>{this.getCurrentPhrase()}</Typist>,
      domNode
    );

    this.setNextPhrase();
  }

  render = () => {
    const customClass = this.props.className || "";

    return (
      <span className={`textCarouselContainer ${customClass}}`} ref="phraseContainer" />
    );
  }
}

export default TextCarousel;
