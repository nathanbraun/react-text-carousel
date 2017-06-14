import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import Typist from "react-typist";
import assign from "lodash/assign";
import get from "lodash/get";
import PropTypes from 'prop-types';

class TextCarousel extends Component {

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

  handleTypingComplete = () => {
    // Need the delay since typist triggers typingComplete before that happens
    const cursorHideDelay = get(this.props.typistProps, 'cursor.hideWhenDoneDelay', 0);

    this.timer = setTimeout(() => {
      this.renderWord();
    }, this.props.interval + cursorHideDelay);
  }

  getCurrentPhrase = () => this.props.phrases[this.state.currentPhraseIndex];

  renderWord = () => {
    const domNode = this.refs.phraseContainer;
    const typistProps = assign({}, this.props.typistProps, {
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
