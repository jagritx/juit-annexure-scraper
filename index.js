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
getMarksByRoll("201218", "2023EVESEM");

//2023EVESEM
