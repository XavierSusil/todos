import endPointUrl from "../endPoint";

const deleteTodoApi = async (id, token) => {
  const url = endPointUrl + `/todo/${id}`;
  console.log(url);
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

export default deleteTodoApi;
