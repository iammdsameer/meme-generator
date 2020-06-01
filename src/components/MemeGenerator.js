import React, { Component } from "react";
import "./MemeGenerator.css";

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImage: "https://i.imgflip.com/9vct.jpg",
      memeResults: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.fireNewMeme = this.fireNewMeme.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        this.setState({
          memeResults: memes,
        });
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  fireNewMeme() {
    this.setState({
      randomImage: this.state.memeResults[Math.floor(Math.random() * 100)].url,
    });
  }

  render() {
    return (
      <div className="container main-div">
        <div className="row">
          <div className="col form-div">
            <form>
              <input
                className="form-control mb-3"
                type="text"
                name="topText"
                value={this.state.topText}
                placeholder="Top Text Here"
                onChange={this.handleChange}
              />
              <input
                className="form-control mb-3"
                type="text"
                name="bottomText"
                value={this.state.bottomText}
                placeholder="Bottom Text Here"
                onChange={this.handleChange}
              />
            </form>
            <button className="btn btn-primary" onClick={this.fireNewMeme}>
              Blah, Find Another!
            </button>
          </div>
          <div className="col">
            <img src={this.state.randomImage} alt="random-meme" width="600" />
            <h1 className="top">{this.state.topText}</h1>
            <h1 className="bottom">{this.state.bottomText}</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
