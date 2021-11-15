import ACTIONS from "./actions";
const storageName = "little-shop-practice";

export function reducer(state, action) {
  if (action.type === ACTIONS.ITEMS_NUMBER) {
    const storage = JSON.parse(window.localStorage.getItem(storageName));
    const total =
      storage?.length > 0 ? storage.reduce((a, b) => a + b.quantity, 0) : 0;
    return {
      ...state,
      cartQuantity: total,
    };
  }
  if (action.type === ACTIONS.OPEN_MODAL) {
    const openModal = true;
    return {
      ...state,
      modal: { itemName: action.payload.item, openModal },
    };
  }
  if (action.type === ACTIONS.CLOSE_MODAL) {
    const openModal = false;
    return {
      ...state,
      modal: { itemName: "", openModal },
    };
  }
}
