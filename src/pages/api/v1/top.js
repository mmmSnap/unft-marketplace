import {getClientIp} from "request-ip";
import axios from "axios";
import {searchPhotographers} from "./search";

async function getUserCity(ipAddress) {
  try {
    const response = await axios.get(`https://ipinfo.io/${ipAddress}/json`);
    return response?.data?.city || "";
  } catch (error) {
    console.error("Error fetching location:", error.message);
  }
  return "";
}

export default async function handler(req, res) {
  let city = await getUserCity(getClientIp(req));
  let searchResult = await searchPhotographers(city);

  if (searchResult.count === 0) {
    city += " (falling back to empty query)"
    searchResult = await searchPhotographers("");
  }

  searchResult.items = searchResult.items.sort(
      (a, b) =>
          (Number(b.rating || 0) * Number(b.rating_count || 0)) -
          (Number(a.rating || 0) * Number(a.rating_count || 0))
  );

  res.status(200).json({...searchResult, city: city});
}
