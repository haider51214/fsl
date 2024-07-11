import { uiActions } from "../slices/ui-slice";

const httpAction = (data) => async (dispatch) => {
  dispatch(uiActions.setError(null));
  dispatch(uiActions.startLoading(true));

  try {
    const response = await fetch(data.url, {
      method: data.method ? data.method : "GET",
      body: data.body ? JSON.stringify(data.body) : null,
      headers: { "Content-Type": "application/json" },
    });

    const resData = await response.json();
    if (!response.ok) {
      dispatch(uiActions.setError(resData.message));
    }

    return resData;
  } catch (error) {
    dispatch(uiActions.setError("something went wrong"));
  } finally {
    dispatch(uiActions.startLoading(false));
  }
};

export default httpAction;
