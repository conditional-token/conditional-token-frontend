import Axios from "axios";
import { conditionalTokenApiURL } from "../utils/constants";

const conditionalTokenApi = Axios.create({
  baseURL: conditionalTokenApiURL,
});

export { conditionalTokenApi };
