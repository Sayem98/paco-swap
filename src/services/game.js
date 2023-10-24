import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_API_URL;

export const createGame = async ({
  playerAddress,
  betAmount,
  betNumber,
  rollType,
}) => {
  const { data } = await axios.post(`${API_URL}/games`, {
    playerAddress,
    betAmount,
    betNumber,
    rollType,
  });
  return data;
};

export const getGamesHistory = async () => {
  const { data } = await axios.get(`${API_URL}/games`);
  return data;
};
