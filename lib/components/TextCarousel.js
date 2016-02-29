import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import Typist from "react-typist";

class TextCarousel extends Component {

  static propTypes = {
    phrases: PropTypes.arrayOf(PropTypes.string).isRequired,
    interval: PropTypes.number,
    typistProps: PropTypes.object
  }

  static defaultProps = {
    interval: 3000,
    typistProps: {}
  }

  timer = null;

  state = {
    currentPhrase: 0
  }

  componentDidMount = () => {
    this.renderWord();
    this.setupTimer();

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.removeTimer();
      } else {
        this.setupTimer();
      }
    });
  };

  componentWillUnmount = () => {
    this.removeTimer();
  }

  setNextPhrase = () => {
    let nextPhrase = 0;
    if (this.state.currentPhrase < this.props.phrases.length - 1) {
      nextPhrase = this.state.currentPhrase += 1;
    }
    this.setState({
      currentPhrase: nextPhrase,
    });
    this.renderWord();
  }

  setupTimer = () => {
    this.timer = window.setInterval(() => {
      this.setNextPhrase();
    }, this.props.interval);
  }

  removeTimer = () => {
    window.clearInterval(this.timer);
  }

  getCurrentPhrase = () => this.props.phrases[this.state.currentPhrase];

  renderWord = () => {
    const domNode = this.refs.phraseContainer;
    ReactDOM.unmountComponentAtNode(domNode);
    ReactDOM.render(
      <Typist {...this.props.typistProps}>{this.getCurrentPhrase()}</Typist>,
      domNode
    );
  }

  render = () => {
    return (
      <span className={`textCarouselContainer ${this.props.className || ""}`} ref="phraseContainer" />
    );
  }

}

export default TextCarousel;
