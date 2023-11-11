import { EVENT } from "../constants/constant.js";

export const getDay = date => new Date(EVENT.year, EVENT.month - 1, date).getDay();