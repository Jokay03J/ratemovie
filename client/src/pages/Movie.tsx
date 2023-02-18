import React from "react";
import { MdStar } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import { useGetMovieQuery } from "../services/ratemovie";

export default function Movie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetMovieQuery(id);
  return (
    <>
      <Navbar
        title="Ratemovie"
        items={[
          { href: "/", title: "Accueil" },
          { href: "/new", title: "Nouveaux" },
        ]}
      />
      {isLoading ? (
        <HashLoader
          color="#ff0000"
          className="w--10 h--10"
          style={{ transform: "translate(50%, 50%)" }}
        />
      ) : error ? (
        "une erreur est survenue"
      ) : (
        <Card title={data.title} titleAs="h2" className="w-full m--1">
          <p>auteur: {data.author}</p>
          <p className="d--flex items--center">
            note: {data.note ? Math.floor(data.note) + "/5" : "aucune note"}
          </p>
        </Card>
      )}
    </>
  );
}
