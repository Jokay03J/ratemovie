import React from "react";
import { Link } from "react-router-dom";

interface NavbarItem {
  href: string;
  title: string;
}

interface NavbarProps {
  items: NavbarItem[];
  title: string;
}

export default function Navbar(props: NavbarProps) {
  return (
    <nav className="navbar--red text--white mb-4">
      <div className="container">
        <h2 className="site--title">{props.title}</h2>
        <label className="navbar--mobile--btn" htmlFor="navbar--input">
          Menu
        </label>
        <input
          type="checkbox"
          name="navbar--input"
          id="navbar--input"
          className="navbar--mobile--checked"
        />
        <ul className="items">
          {props.items.map((item, index) => (
            <Link to={item.href} className="item" key={index}>
              {item.title}
            </Link>
          ))}
        </ul>
      </div>
    </nav>
  );
}
