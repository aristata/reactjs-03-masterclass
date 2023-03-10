import React from "react";
import { Link } from "react-router-dom";
import { users } from "./../db";

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
