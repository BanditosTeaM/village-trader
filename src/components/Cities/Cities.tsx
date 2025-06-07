import "./Cities.css";
import { Link } from "react-router-dom";
import useStore from "@/store";
export const Cities = () => {
  const cities = useStore((state) => state.cities);
  return (
    <>
      <div className="city-list">
        {cities.map((city) => (
          <Link key={city.id} to={`/city/${city.id}`}>
            {city.name}
          </Link>
        ))}
      </div>
    </>
  );
};
