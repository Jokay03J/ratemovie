import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  titleAs: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children?: any;
}

const Card: React.FC<CardProps> = ({ title, titleAs, ...props }) => {
  let titleElement: JSX.Element;
  switch (titleAs) {
    case "h1":
      titleElement = <h1 className="card--title">{title}</h1>;
      break;

    case "h2":
      titleElement = <h2 className="card--title">{title}</h2>;
      break;

    case "h3":
      titleElement = <h3 className="card--title">{title}</h3>;
      break;

    case "h4":
      titleElement = <h4 className="card--title">{title}</h4>;
      break;

    case "h5":
      titleElement = <h5 className="card--title">{title}</h5>;
      break;

    case "h6":
      titleElement = <h6 className="card--title">{title}</h6>;
      break;

    default:
      titleElement = <h1 className="card--title">{title}</h1>;
      break;
  }

  return (
    <div className={`card ${props.className ? props.className : ""}`}>
      {title && titleElement}
      {props.children}
    </div>
  );
};

export default Card;
