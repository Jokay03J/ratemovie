import React from "react";
import { MdDone, MdInfo, MdReport, MdWarning } from "react-icons/md";

interface AlertProps {
  type: "info" | "success" | "error" | "warning";
  title: string;
  titleAs: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  description: string;
}

export default function Alert({
  description,
  titleAs = "h3",
  title,
  type,
}: AlertProps) {
  let titleElement: JSX.Element;
  switch (titleAs) {
    case "h1":
      titleElement = <h1 className="text--sm px--1">{title}</h1>;
      break;

    case "h2":
      titleElement = <h2 className="text--sm px--1">{title}</h2>;
      break;

    case "h3":
      titleElement = <h3 className="text--sm px--1">{title}</h3>;
      break;

    case "h4":
      titleElement = <h4 className="text--sm px--1">{title}</h4>;
      break;

    case "h5":
      titleElement = <h5 className="text--sm px--1">{title}</h5>;
      break;

    case "h6":
      titleElement = <h6 className="text--sm px--1">{title}</h6>;
      break;

    default:
      titleElement = <h1 className="text--sm px--1">{title}</h1>;
      break;
  }
  const colorsBorder = {
    error: "border--red",
    info: "border--blue",
    success: "border--green",
    warning: "border--yellow",
  };
  const colorsBg = {
    error: "bg--red",
    info: "bg--blue",
    success: "bg--green",
    warning: "bg--yellow",
  };
  return (
    <div
      className={`border--2 border--solid d--flex items--center h--1 ${colorsBorder[type]}`}
    >
      <div
        className={`h--full w--1 ${colorsBg[type]} d--flex justify--center items--center`}
      >
        {type === "error" && <MdReport />}
        {type === "info" && <MdInfo />}
        {type === "success" && <MdDone />}
        {type === "warning" && <MdWarning />}
      </div>
      {title && titleElement}
    </div>
  );
}
