import axios from "axios";
const baseUrl = "http://localhost:3005/notes";

// const getAll = async () => {
//   const request = axios.get(baseUrl);
//   return request.then((response) => response.data);
// };
const getAll = async () => {
  const request = axios.get(baseUrl);
  const nonExisting = {
    id: 10000,
    content: "This note is not saved to server",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  };
  return request.then((response) => response.data.concat(nonExisting));
};

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const noteService = { getAll, create, update };

export default noteService;
