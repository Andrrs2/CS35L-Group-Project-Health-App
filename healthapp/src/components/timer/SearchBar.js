import React, { useState } from "react";
import "../../App.css";

function SearchBar({ data }) {
  const [reduced_data, setreduced_data] = useState([]);
  const [user_input, setuser_input] = useState("");

  const findExercise = (event) => {
    const search_exercise = event.target.value;
    setuser_input(search_exercise);
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(search_exercise.toLowerCase());
    });

    if (search_exercise === "") {
      setreduced_data([]);
    } else {
      setreduced_data(newFilter);
    }
  };

  return (
    <div className="container_search">
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          value={user_input}
          onChange={findExercise}
          placeholder="Search an exercise..."
        />
      </div>
      {reduced_data.length !== 0 && (
        <div className="dataResult">
          {reduced_data.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem" href={value.link} target="_blank">
                <p>{value.name} </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
    </div>
  );
}

export default SearchBar;
