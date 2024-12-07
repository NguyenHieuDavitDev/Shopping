import React, { useState } from "react";
import { stores } from "../components/storesData";
import "./StoreList.css";

function StoreList() {
  const [selectedCity, setSelectedCity] = useState("Hồ Chí Minh");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const cities = [...new Set(stores.map((store) => store.city))];
  const districts = [
    ...new Set(
      stores
        .filter((store) => store.city === selectedCity)
        .map((store) => store.district)
    ),
  ];

  const filteredStores = stores.filter(
    (store) =>
      store.city === selectedCity &&
      (selectedDistrict ? store.district === selectedDistrict : true)
  );

  return (
    <div className="store-list-container">
      <select
        className="conscious-select"
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <select
        className="district-select"
        value={selectedDistrict}
        onChange={(e) => setSelectedDistrict(e.target.value)}
      >
        <option value="">Quận/Huyện</option>
        {districts.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>

      <div>
        <p>Có {filteredStores.length} cửa hàng còn hàng</p>
        {filteredStores.map((store, index) => (
          <div key={index} className="store-item">
            <p>{store.address}</p>
            <button className="store-button">
              {" "}
              <i className="fa-solid fa-location-dot"></i> Chỉ đường
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoreList;
