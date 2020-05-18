import React, { useState, useEffect } from "react";
import Unsplash, { toJson } from "unsplash-js";
import "./ImagesList.css";
import moment from "moment";

export default function ImagesList() {
  const [photos, setphotos] = useState([]);
  function getPhotos() {
    const unsplash = new Unsplash({
      accessKey: "F0_2tT6brj9C-INXDlIvgIBCaXQOyaxBjr-LcVC8eII",
    });

    unsplash.photos
      .listPhotos(200, 30, "latest")
      .then(toJson)
      .then((photos) => {
        setphotos(photos);
        console.log(photos);
      });
  }
  useEffect(() => {
    getPhotos();
  }, []);
  return (
    <div className="photos__list">
      {photos.map((photo) => {
        return (
          <span className="photos__item" key={photo.id}>
            <h2 className="photo__user__name"> {photo.user.username}</h2>
            <p className="photo__information"> {photo.description}</p>
            <img
              className="photos__item-photo"
              src={photo.urls.small}
              alt={photo.description}
            />
            <div className="photo__footer">
              {" "}
              <span className="photo__likes">
                {" "}
                Liked by <i class="fa fa-heart"></i>
                <span className="photo_likes_number">{photo.likes}</span> people
              </span>
              <br />
              <span className="photo__date">
                {moment(photo.created_at).format("LLL")}
              </span>
            </div>
          </span>
        );
      })}
    </div>
  );
}
