import endPointUrl from "../endPoint";

export const updateTodoStatusApi = async (id, sts, token) => {
  const url = endPointUrl + `/todo/${id}/status`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: sts,
      }),
    });

    await response.json();

  } catch (error) {
    console.error(error);
  }
};
