import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function MainHeader() {
  return (
    <div className="main-header d-flex justify-content-between p-2 align-items-center">
      <div className="welcome">Welecome back Ayoub 👋</div>

      <div className="user_box">
        <DropdownButton id="dropdown-item-button" title={"a"}>
          <Dropdown.ItemText>Ayoub bd</Dropdown.ItemText>
          <Dropdown.Divider></Dropdown.Divider>
          <Dropdown.Item href="/profil" as="button">
            Profil
          </Dropdown.Item>
          <Dropdown.Item href="/help" as="button">
            Help
          </Dropdown.Item>
          <Dropdown.Item href="/logout" as="button">
            Logout
          </Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  );
}
