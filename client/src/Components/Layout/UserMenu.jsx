import React from "react";
import { NavLink } from "react-router-dom";

export const UserMenu = () => {
  return (
    <div>
      <div className="text-center"></div>
      <div className="list-group">
        <NavLink
          to="/dashboard/user"
          style={{ textDecoration: "none", color: "black" }}
        >
          <h4>Dashboard</h4>
        </NavLink>

        <NavLink
          to="/dashboard/user/profile"
          className="list-group-item list-group-item-action"
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/order"
          className="list-group-item list-group-item-action"
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
};
