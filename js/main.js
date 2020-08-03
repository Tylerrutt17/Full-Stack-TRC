import setContent from "./setContent.js";
import logger from "./logger.js";

let result = setContent('You have now entered the site!',document.querySelector('h1'));
logger(result);