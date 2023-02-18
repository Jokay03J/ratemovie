import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddMovieMutation } from "../services/ratemovie";
import Alert from "./Alert";
import TextField from "./TextField";
import moment from "moment";

export default function Form() {
  const [values, setValues] = useState({ title: "", author: "", date: "" });
  const [error, setError] = useState(false);
  const [addMovie, response] = useAddMovieMutation();
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.title || !values.date || !values.author) return setError(true);
    const createdAt = moment(values.date).format("YYYY[-]MM[-]DD");
    addMovie({
      title: values.title,
      author: values.author,
      createdAt,
    })
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        if (err.status === 422)
          return alert("format de la date incorrect(YYYY/MM/DD)");
        console.error(err);
      });
  };
  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className="d--flex f--direction--column items--center mt--1"
      style={{ gap: 15 }}
    >
      {error && (
        <Alert
          title="Veuillez remplir tout les champs"
          description={"tout les champs sont obligatoire."}
          type={"error"}
          titleAs={"h3"}
        />
      )}
      <TextField
        type="text"
        id="title"
        className="w--3-6 border--2 rounded--sm border--red p--1"
        value={values.title}
        placeholder={"Entrer une titre"}
        onChange={(e) => setValues({ ...values, title: e.currentTarget.value })}
      />
      <TextField
        type="text"
        id="author"
        className="w--3-6 border--2 rounded--sm border--red p--1"
        value={values.author}
        placeholder={"entrer un auteur"}
        onChange={(e) =>
          setValues({ ...values, author: e.currentTarget.value })
        }
      />
      <TextField
        type="date"
        id="date"
        className="w--3-6 border--2 rounded--sm border--red p--1"
        value={values.date}
        placeholder={"entrer une date"}
        onChange={(e) => setValues({ ...values, date: e.currentTarget.value })}
        pattern="yyyy-mm-dd"
      />

      <input
        type="submit"
        value={"Envoyer"}
        className="w--3-6 btn--red text--white"
      />
    </form>
  );
}
