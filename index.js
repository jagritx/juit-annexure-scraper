import marksScraper from "./marks_scraper.js";
import marksParser from "./marks_parser.js";
import {
  getAttendaceAll,
  getAttendanceRange, //2 Arguments : Range of Roll No.
  getAttendanceByRoll, //1: Roll No.
  getMarksAll, //    1: Semester Code
  getMarksRange, //  3 : Range + Sem Code
  getMarksByRoll, // 2 : Roll + Sem Code
} from "./methods.js";

//Call your method here
getMarksRange("201212", "201300", "2023EVESEM");

// Note : Won't work unless you have the csv file
// Contact me if you want it ;-)

//Sem code : 2023EVESEM
