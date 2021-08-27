import { Component } from "react";

import DetailsItem from "../detailsItem";

import "./index.css";

class AdminIUPage extends Component {
  state = {
    todo: [],
    selectedData: [],
    nameSearch: "",
    totalLengthData: 0,
    numberPage: 1,
    allChecked: false,
    perPage: 10,
    pageCount: 5,
  };
  componentDidMount() {
    this.getData();
  }

  onIncrementCount = () => {
    const { todo, perPage, pageCount, numberPage } = this.state;
    let selectedPage = [];
    if (numberPage + 1 >= pageCount) {
      console.log(numberPage + 1);
      this.setState({ numberPage: pageCount });
      selectedPage = todo.slice(pageCount - 1 * perPage);
    } else {
      console.log(numberPage + 1);
      this.setState({ numberPage: numberPage + 1 });
      selectedPage = todo.slice(
        numberPage * perPage,
        (numberPage + 1) * perPage
      );
    }
    this.setState({ selectedData: selectedPage });
  };

  onDecrementCount = () => {
    const { todo, perPage, numberPage, pageCount } = this.state;
    let selectedPage = [];
    if (numberPage <= 1) {
      console.log(numberPage - 1);
      this.setState({ numberPage: 1 });
      selectedPage = todo.slice(
        (numberPage - 1) * perPage,
        numberPage * perPage
      );
    } else if (numberPage - 1 >= pageCount) {
      this.setState({ numberPage: pageCount });
      selectedPage = todo.slice(pageCount - 1 * perPage);
    } else {
      console.log(numberPage - 1);
      this.setState({ numberPage: numberPage - 1 });
      selectedPage = todo.slice(
        (numberPage - 1) * perPage,
        numberPage * perPage
      );
    }
    this.setState({ selectedData: selectedPage });
  };

  buttonFunction = () => {
    const { pageCount } = this.state;
    let numbers = [];
    for (var i; i <= pageCount; i++) {
      numbers.push(i);
      console.log(numbers);
    }
  };

  getData = async () => {
    const url =
      " https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    const data = await response.json();
    const updatedData = data.map((result) => ({
      checked: false,
      ...result,
    }));

    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      todo: updatedData,
      selectedData: updatedData.slice(0, 10),
    });
  };

  deleteT = (id) => {
    const { todo } = this.state;
    const updatedTodo = todo.filter((eachTodo) => eachTodo.id !== id);

    this.setState({
      todo: updatedTodo,
    });
  };

  deleteTodo = (checked) => {
    const { todo } = this.state;
    const updatedTodo = todo.filter((eachTodo) => eachTodo.checked !== true);

    this.setState({
      todo: updatedTodo,
    });
  };

  changeChecked = (value, id) => {
    const { todo } = this.state;
    const newTodo = [];
    for (const i of todo) {
      if (i.id === id) {
        const valueDict = i;
        valueDict.checked = !value;
        newTodo.push(valueDict);
        console.log(valueDict);
      } else {
        newTodo.push(i);
      }
    }
    this.setState({
      todo: newTodo,
    });
  };

  changeInputValues = (id, name, email, role) => {
    const { todo } = this.state;
    const newTodo = [];
    for (const i of todo) {
      if (i.id === id) {
        const valueDict = i;
        valueDict.name = name;
        valueDict.email = email;
        valueDict.role = role;
        newTodo.push(valueDict);
        console.log(valueDict);
      } else {
        newTodo.push(i);
      }
    }
    this.setState({
      todo: newTodo,
    });
  };

  changeCheckedAll = () => {
    const { todo, allChecked } = this.state;
    const newTodo = [];
    for (const i of todo) {
      const valueDict = i;
      valueDict.checked = !allChecked;
      newTodo.push(valueDict);
      console.log(valueDict);
    }
    this.setState({
      todo: newTodo,
      allChecked: !allChecked,
    });
  };

  searchName = (event) => {
    this.setState({ nameSearch: event.target.value }, this.getData);
  };

  render() {
    const {
      todo,
      selectedData,
      numberPage,
      pageCount,
      nameSearch,
    } = this.state;
    console.log(pageCount);
    const indicator1 = "<";
    const indicator2 = ">";
    let searchResults = selectedData;
    if (nameSearch !== "") {
      searchResults = todo.filter(
        (each) =>
          each.name.toLowerCase().includes(nameSearch.toLowerCase()) ||
          each.email
            .toLowerCase()
            .includes(this.state.nameSearch.toLowerCase()) ||
          each.role.toLowerCase().includes(nameSearch.toLowerCase())
      );
    } else {
      searchResults = selectedData;
    }

    return (
      <div className="cont">
        <div className="cont-1">
          <input
            type="search"
            placeholder="Search by name or mail or role"
            onChange={this.searchName}
            className="search-input"
          />
          <div className="cont2">
            <input
              type="checkbox"
              className="check-box"
              id="all"
              onChange={this.changeCheckedAll}
            />
            <label className="label-check">
              <p className="head-name">Name</p>
              <p className="head-same">Email</p>
              <p className="head-role">Role</p>
            </label>
            <p className="head-same">Edit</p>
            <p className="head-same">Delete</p>
          </div>

          <ul className="un-list">
            {searchResults.map((eachTodo) => (
              <DetailsItem
                key={eachTodo.id}
                id={eachTodo.id}
                details={eachTodo}
                deleteT={this.deleteT}
                changeChecked={this.changeChecked}
                changeInputValues={this.changeInputValues}
              />
            ))}
          </ul>
          {nameSearch === "" && (
            <div className="indicator-con">
              <button
                type="button"
                className="indicator-button"
                onClick={this.onDecrementCount}
              >
                {indicator1}
              </button>
              <p className="head-pages">{`${numberPage} of ${pageCount}`}</p>
              <button
                type="button"
                className="indicator-button2"
                onClick={this.onIncrementCount}
              >
                {indicator2}
              </button>
            </div>
          )}
          <button
            className="delete-button-all"
            type="button"
            onClick={this.deleteTodo}
          >
            Delete Selected
          </button>
        </div>
      </div>
    );
  }
}

export default AdminIUPage;
