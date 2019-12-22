import React from "react";
import homeLogo from "../images/homeLogo.png";

class CarouselWrapper extends React.Component {
  state = {
    currentIndex: 0,
    arrayOfLogo: [homeLogo, homeLogo] //  Since these are same logo in this array, react show warning. Fix: add unique image
  };

  componentDidMount() {
    setInterval(
      function() {
        this.handleManageCurrentIndex();
      }.bind(this),
      6000
    );
  }

  handleManageCurrentIndex = function() {
    if (this.state.currentIndex === this.state.arrayOfLogo.length - 1) {
      this.setState({
        currentIndex: 0
      });
    } else {
      this.setState({
        currentIndex: this.state.currentIndex + 1
      });
    }
  }.bind(this);

  handleRouteToImage = function(payload) {
    this.setState({
      currentIndex: payload
    });
  }.bind(this);

  handleRoutePrevImage = function() {
    if (this.state.currentIndex === 0) {
      this.setState({
        currentIndex: this.state.arrayOfLogo.length - 1
      });
    } else {
      this.setState({
        currentIndex: this.state.currentIndex - 1
      });
    }
  }.bind(this);

  handleRouteNextImage = function() {
    if (this.state.currentIndex === this.state.arrayOfLogo.length - 1) {
      this.setState({
        currentIndex: 0
      });
    } else {
      this.setState({
        currentIndex: this.state.currentIndex + 1
      });
    }
  }.bind(this);

  render() {
    let renderDotIndicators = this.state.arrayOfLogo.map(
      function(value, index) {
        return (
          <li
            key={value}
            style={{
              color: this.state.currentIndex === index ? "#bbb" : "#717171",
              listStyle: "none"
            }}
            onClick={function() {
              this.handleRouteToImage(index);
            }.bind(this, index)}
          >
            •
          </li>
        );
      }.bind(this)
    );

    return (
      <div className="carousel_container">
        <div className="carousel_items">
          <div className="arrow_container" onClick={this.handleRoutePrevImage}>
            <i
              className="left_arrow"
              style={{ height: "10px", width: "10px" }}
            ></i>
          </div>
          <img
            style={{ width: "75%", height: "332px" }}
            src={this.state.arrayOfLogo[this.state.currentIndex]}
            alt="logo"
          />
          <div className="arrow_container" onClick={this.handleRouteNextImage}>
            <i
              className="right_arrow"
              style={{ height: "10px", width: "10px" }}
            ></i>
          </div>
        </div>
        <div className="dot_indicators_container">{renderDotIndicators}</div>
      </div>
    );
  }
}

export default CarouselWrapper;
