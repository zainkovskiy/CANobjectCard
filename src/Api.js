import axios from "axios";

export const chatApi = async (raw) => {
  const res = await axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Object/Controller.php', raw);
  if (res?.data && res?.statusText === 'OK') {
    return res.data
  }
}
export const toggleIsPrivateVar = async (raw) => {
  const res = await axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Object/Controller.php', raw);
}