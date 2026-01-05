import { createReduxStore, register } from "@wordpress/data";
import reducer from "../todo-store/reducer";
import * as selectors from "../todo-store/selectors";
import * as actions from "../todo-store/actions";
import * as resolvers from "../todo-store/resolvers";
import controls from "./controls";

const store = createReduxStore("create-block/todos", {
	reducer,
	actions,
	selectors,
	resolvers,
	controls,
});
register(store);
