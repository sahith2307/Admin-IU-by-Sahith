import { Component } from "react";
import Popup from "reactjs-popup";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import "./index.css";

class DetailsItem extends Component {
  state = { nameInput: "", emailInput: "", roleInput: "", errorMsg: "" };

  changeName = (event) => {
    this.setState({ nameInput: event.target.value });
  };

  changeEmail = (event) => {
    this.setState({ emailInput: event.target.value });
  };

  changeRole = (event) => {
    this.setState({ roleInput: event.target.value });
  };

  onDelete = () => {
    const { deleteT, id } = this.props;
    deleteT(id);
  };

  onSubmitChanges = () => {
    const { changeInputValues, id } = this.props;
    const { nameInput, emailInput, roleInput } = this.state;
    if (nameInput === "" || emailInput === "" || roleInput === "") {
      this.setState({ errorMsg: "don't leave any empty" });
    } else {
      changeInputValues(id, nameInput, emailInput, roleInput);
    }
  };

  changeCheckedOn = () => {
    const { changeChecked, details, id } = this.props;
    const { checked } = details;
    changeChecked(checked, id);
  };
  render() {
    const { details, id } = this.props;
    const { errorMsg } = this.state;
    const { checked, name, role, email } = details;
    return (
      <li className="list">
        <div className="cont-l">
          <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={this.changeCheckedOn}
            className="check-box-item"
          />
          <label className="label-check" htmlFor={id}>
            <p className="details">{name}</p>
            <p className="details">{email}</p>
            <p className="details">{role}</p>
          </label>
          <Popup
            trigger={
              <button type="button" className="button-icon ">
                <BsPencilSquare className="icon-edit" />
              </button>
            }
            modal
          >
            <div className="pop-cont">
              <h1 className="id-pop">{`ID:   ${id}`}</h1>
              <span className="same-pop">Name</span>
              <input
                type="input"
                className="input-pop"
                onChange={this.changeName}
              />
              <br />
              <span className="same-pop">Email</span>
              <input
                type="input"
                className="input-pop"
                onChange={this.changeEmail}
              />
              <br />
              <span className="same-pop">Role</span>
              <input
                type="input"
                className="input-pop"
                onChange={this.changeRole}
              />
              <br />
              <p>{errorMsg}</p>
              <button
                type="button"
                className="button-pop"
                onClick={this.onSubmitChanges}
              >
                Save Changes
              </button>
            </div>
          </Popup>
          <BsFillTrashFill className="icon-delete" onClick={this.onDelete} />
        </div>
      </li>
    );
  }
}

export default DetailsItem;
