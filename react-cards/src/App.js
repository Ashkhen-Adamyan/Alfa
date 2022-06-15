import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillHeart, AiFillDelete } from "react-icons/ai";

const App = () => {
  const [catsDataAll, setCatsDataAll] = useState([]); // все
  const [catsDataLiked, setCatsDataLiked] = useState([]); // лайки
  const [catsDataDisliked, setCatsDataDisliked] = useState([]); //без лайка
  const [isChecked, setIsChecked] = useState(); // чекбокс зачекан

  useEffect(() => {
    axios
      .get("https://api.thecatapi.com/v1/images/search?page=1&limit=12")
      .then((res) => {
        const addLiked = res.data.map((item) => {
          const newItem = { ...item };
          newItem.liked = false;
          return newItem;
        });
        setCatsDataAll(addLiked);
      });
  }, []);
  const handleRemoveData = (idx) => {
    setCatsDataAll((prevState) => prevState?.filter(({ id }) => id !== idx));
  };
  const handleLikeData = (id) => {
    setCatsDataAll((prevState) =>
      prevState.map((catDataItem) =>
        catDataItem.id === id
          ? { ...catDataItem, liked: !catDataItem.liked }
          : catDataItem
      )
    );
  };
  const handleSortByLiked = (event) => {
    const isChecked = event.target.checked;
    console.log(isChecked);
    setIsChecked(isChecked);
    setCatsDataLiked(() => {
      const newState = [...catsDataAll];
      const result = newState.filter(({ liked }) => liked === isChecked);
      console.log(result);
      return result;
    });
    setCatsDataDisliked(() => {
      const newState = [...catsDataAll];
      const result = newState.filter(({ liked }) => liked !== isChecked);
      console.log(result);
      return result;
    });
  };

  // const lengthCatsDataAll = catsDataAll.length;
  // const lengthCatsDataLiked = catsDataLiked.length;
  // const lengthCatsDataDisliked = catsDataDisliked.length;

  // let resultCatsDataLiked = [];

  // if (isChecked && lengthCatsDataLiked === lengthCatsDataAll) {
  //   resultCatsDataLiked = lengthCatsDataAll;
  // }

  // if (isChecked && lengthCatsDataLiked < lengthCatsDataAll) {
  //   resultCatsDataLiked = lengthCatsDataDisliked;
  // }

  // if (!isChecked && lengthCatsDataDisliked < lengthCatsDataAll) {
  //   resultCatsDataLiked = lengthCatsDataDisliked;
  // }

  return (
    <div className="wrapper">
      <h1 className="heading">Cats paradise</h1>
      <label className="checkbox-btn">
        <input type="checkbox" onChange={handleSortByLiked} />
        <span>Выбрать только ♥ </span>
      </label>
      <div className="img-container">
        {catsDataAll.map((catData) => {
          const key = catData.id + "-" + catData.liked;
          return (
            <div className="cards" key={key}>
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
