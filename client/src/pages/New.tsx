import React from "react";
import Form from "../components/Form";
import Navbar from "../components/Navbar";

export default function New() {
  return (
    <>
      <Navbar
        title="Ratemovie"
        items={[
          { href: "/", title: "Accueil" },
          { href: "/new", title: "Nouveaux" },
        ]}
      />
      <h2 className="text--xl d--flex justify--center">Nouveaux Film/Série</h2>
      <Form />
    </>
  );
}
