import React from "react";
// import { get } from "./utils";
import "./App.css";

const URL = "https://pokeapi.co/api/v2/pokemon";

export function getData(url) {
  return fetch(url || URL)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
}

class App extends React.PureComponent {
  state = {
    list: [],
    count: 0,
    offset: 0,
    next: "",
    previoust: "",
  };
  componentDidMount() {
    getData(this.state.next).then((res) => {
      this.setState({
        list: res.results,
        count: res.count,
        offset: res.offset,
        next: res.next || "",
        previous: res.previous || "",
      });
      console.log(res);
    });
  }
  render() {
    const { list } = this.state;
    return (
      <div className="container">
        {list.map((item, index) => (
          <div key={index} className="pokemon-list">
            <label>{item.name}</label>
          </div>
        ))}
        <div className="buttons">
          <button
            onClick={this.getPrevious.bind(this)}
            disabled={!this.state.previous}
          >
            Previous
          </button>
          <button onClick={this.getNext.bind(this)} disabled={!this.state.next}>
            Next
          </button>
        </div>
      </div>
    );
  }

  getNext() {
    getData(this.state.next).then((res) => {
      this.setState({
        list: res.results,
        count: res.count,
        offset: res.offset,
        next: res.next || "",
        previous: res.previous || "",
      });
      console.log(res);
    });
  }
  getPrevious() {
    getData(this.state.previous).then((res) => {
      this.setState({
        list: res.results,
        count: res.count,
        offset: res.offset,
        next: res.next || "",
        previous: res.previous || "",
      });
      console.log(res);
    });
  }
}

export default App;
