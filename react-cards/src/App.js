import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillHeart, AiFillDelete } from "react-icons/ai";

const App = () => {
  const [catsData, setCatsData] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.thecatapi.com/v1/images/search?page=1&limit=48")
      .then((res) => {
        setCatsData(res.data);
      });
  }, []);
  const handleRemoveData = (id) => {
    setCatsData((prev) => prev?.filter((x) => x.id !== id));
  };
  const handleLikeData = (id) => {
    setCatsData((prevState) =>
      prevState.map((catDataItem) =>
        catDataItem.id === id
          ? { ...catDataItem, liked: !catDataItem.liked }
          : catDataItem
      )
    );
  };
  const handleSortByLiked = (event) => {
    setCatsData(prev => {
      const arr = [...prev]
      if (event.target.checked)
        arr.sort((a, b) => b.liked - a.liked)
      else
        arr.sort((a, b) => a.liked - b.liked)
      return arr;
    });
  }
  return (
    <div className="wrapper">
      <h1 className="heading">Cats paradise</h1>
      <label className="checkbox-btn">
        <input type="checkbox" onChange={handleSortByLiked}/>
        <span>Выбрать только ♥ </span>
      </label>
      <div className="img-container">
        {catsData.map((catData) => {
          console.log(catData.liked);
          return (
            <div className="cards" key={catData.id}>
              <img src={catData.url} alt={catData.id} className="cards-img" />
              <AiFillHeart
                className="img-icon_like"
                onClick={() => handleLikeData(catData.id)}
                id={catData.liked ? "liked" : "unliked"}
              />
              <AiFillDelete
                className="img-icon_delete"
                onClick={() => handleRemoveData(catData.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
