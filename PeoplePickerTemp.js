import axios from "axios";
import React from "react";
import "./styles.css";

const url = "https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001";

export class Card extends React.Component {
  render() {
    return (
      <div
        style={{ border: "5px solid black", margin: "10px", padding: "10px" }}
      >
        <img src={this.props.data.imageUrl} alt="ProfilePicture" />
        <h2>
          {this.props.data.firstName} {this.props.data.lastName}
        </h2>
        <h3> {this.props.data.email} </h3>
        <h4>{this.props.data.contactNumber}</h4>
      </div>
    );
  }
}

export class CardList extends React.Component {
  render() {
    return (
      <div>
        {this.props.data.map((e) => (
          <Card key={e.id} data={e} />
        ))}
      </div>
    );
  }
}

export class ContactSearch extends React.Component {
  onChange = this.onChange.bind(this);
  onChange(e) {
    this.props.onSearch(e.target.value);
  }

  render() {
    return (
      <div>
        <h1>Search Contact Number</h1>
        <input onChange={this.onChange} />
      </div>
    );
  }
}

export default class App extends React.Component {
  state = {
    allData: [],
    currData: []
  };

  onSearch = this.onSearch.bind(this);
  onSearch(str) {
    console.log(str);
    let temp = [];
    this.state.allData.forEach((e) => {
      if (e.contactNumber.toString().includes(str)) {
        //console.log(e);
        temp.push(e);
      }
    });
    this.setState({
      currData: temp
    });
  }

  componentDidMount() {
    axios.get(url).then((res) => {
      //console.log(res.data);
      this.setState({
        allData: res.data,
        currData: res.data
      });
    });
  }

  render() {
    return (
      <div className="App">
        <ContactSearch onSearch={this.onSearch} />
        <CardList data={this.state.currData} />
      </div>
    );
  }
}
