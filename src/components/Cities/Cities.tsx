import "./Cities.css";
import citiesData from "@api/cities.json";
import { Link } from "react-router-dom";

export const Cities = () => {
  return (
    <>
      <div className="city-list">
        {citiesData.map((city) => (
          <Link key={city.id} to={`/city/${city.id}`}>
            {city.name}
          </Link>
        ))}
      </div>
    </>
  );
};
