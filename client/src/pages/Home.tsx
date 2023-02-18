import React from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import { useGetAllmovieQuery } from "../services/ratemovie";
import moment from "moment";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";

export default function Home() {
  const { data, error, isLoading } = useGetAllmovieQuery({
    limit: 150,
    page: 1,
  });
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
        <div
          className="my--2 row gap-2 justify--center px--4"
          style={{ gap: 15 }}
        >
          {data?.data.map((movie, index) => (
            <Link
              to={`/movie/${movie.id}`}
              className="col-12-xs col-12-sm col-5-md col-3-xl"
              key={index}
            >
              <Card title={movie.title} titleAs={"h2"} key={index}>
                {moment(movie.createdAt).calendar()} · {movie.author}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
