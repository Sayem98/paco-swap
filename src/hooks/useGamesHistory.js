import { useState, useEffect } from "react";
import { getGamesHistory as getGamesHistoryApi } from "../services/game";

export default function useGamesHistory(reFetchHistory) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const getGamesHistory = async () => {
    try {
      setLoading(true);
      const data = await getGamesHistoryApi();
      setData(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGamesHistory();
  }, [reFetchHistory]);

  return { loading, data, error };
}
