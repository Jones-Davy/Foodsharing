import {
  ADD_FOOD,
  CHANGE_CATEGORY,
  FOOD_LENGTH,
  GET_ALL_FOOD,
} from "../types/foodTypes";

function foodReducer(state = [], action) {
  console.log(state);
  switch (action.type) {
    case ADD_FOOD:
      // return { ...state, food: [...state.food, action.payload] };
      return [...state, action.payload]
    case GET_ALL_FOOD:
      return action.payload.products;
    case CHANGE_CATEGORY:
      return action.payload;
    default:
      return state;
  }
}

export default foodReducer;
