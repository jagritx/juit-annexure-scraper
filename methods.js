import { parse } from "csv-parse";
import fs from "fs";
import attendanceParser from "./attendance_parser.js";
import attendanceScraper from "./attendance_scraper.js";
import marksScraper from "./marks_scraper.js";
import marksParser from "./marks_parser.js";

let roll = "";
let pass = "";

let getAttendaceAll = async () => {
  const rows = [];

  fs.createReadStream("./annexure.csv")
    .pipe(parse({ delimiter: ",", from_line: 19 }))
    .on("data", function (row) {
      rows.push(row);
    })
    .on("end", async function () {
      for (const row of rows) {
        roll = row[7];
        pass = row[5].substring(0, 3) + row[7].substring(1);
        try {
          const scrapedData = await attendanceScraper(roll, pass);
          const parsedData = attendanceParser(scrapedData);
          console.log(parsedData);
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    });
};

const getAttendanceRange = async (startRoll, endRoll) => {
  const rows = [];

  fs.createReadStream("./annexure.csv")
    .pipe(parse({ delimiter: ",", from_line: 19 }))
    .on("data", function (row) {
      rows.push(row);
    })
    .on("end", async function () {
      const rollColumnIndex = 7;
      const passwordColumnIndex = 5;

      for (const row of rows) {
        const roll = row[rollColumnIndex];
        if (roll >= startRoll && roll <= endRoll) {
          const pass =
            row[passwordColumnIndex].substring(0, 3) + roll.substring(1);
          try {
            const scrapedData = await attendanceScraper(roll, pass);
            const parsedData = attendanceParser(scrapedData);
            console.log(parsedData);
          } catch (error) {
            console.error("An error occurred:", error);
          }
        }
      }
    });
};

const getAttendanceByRoll = async (roll) => {
  const rows = [];

  fs.createReadStream("./annexure.csv")
    .pipe(parse({ delimiter: ",", from_line: 19 }))
    .on("data", function (row) {
      rows.push(row);
    })
    .on("end", async function () {
      const rollColumnIndex = 7;
      const passwordColumnIndex = 5;

      for (const row of rows) {
        const currentRoll = row[rollColumnIndex];
        if (currentRoll === roll) {
          const pass =
            row[passwordColumnIndex].substring(0, 3) + currentRoll.substring(1);
          try {
            const scrapedData = await attendanceScraper(roll, pass);
            const parsedData = attendanceParser(scrapedData);
            console.log(parsedData);
          } catch (error) {
            console.error("An error occurred:", error);
          }
          break; // Stop iterating once the desired roll is found
        }
      }
    });
};

const getMarksAll = async (semester) => {
  const rows = [];

  fs.createReadStream("./annexure.csv")
    .pipe(parse({ delimiter: ",", from_line: 19 }))
    .on("data", function (row) {
      rows.push(row);
    })
    .on("end", async function () {
      for (const row of rows) {
        const roll = row[7];
        const pass = row[5].substring(0, 3) + row[7].substring(1);
        try {
          const scrapedData = await marksScraper(roll, pass, semester);
          const parsedData = marksParser(scrapedData);
          console.log(
            "-----------------------------------------------------------------------------------"
          );
          console.log(parsedData.name);
          parsedData.marks.forEach((item) => {
            console.log(
              "---------------------------------------------------------"
            );
            console.log(`Subject: ${item.subject}`);
            const filteredMarks = item.marks.filter((mark) => mark !== -1);
            console.log(`Marks: ${filteredMarks.join(", ")}`);
          });
          console.log(
            "-----------------------------------------------------------------------------------"
          );
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    });
};

const getMarksRange = async (startRoll, endRoll, semester) => {
  const rows = [];

  fs.createReadStream("./annexure.csv")
    .pipe(parse({ delimiter: ",", from_line: 19 }))
    .on("data", function (row) {
      rows.push(row);
    })
    .on("end", async function () {
      const rollColumnIndex = 7;
      const passwordColumnIndex = 5;

      for (const row of rows) {
        const roll = row[rollColumnIndex];
        if (roll >= startRoll && roll <= endRoll) {
          const pass =
            row[passwordColumnIndex].substring(0, 3) + roll.substring(1);
          try {
            const scrapedData = await marksScraper(roll, pass, semester);
            const parsedData = marksParser(scrapedData);
            console.log(
              "-----------------------------------------------------------------------------------"
            );
            console.log(parsedData.name);
            parsedData.marks.forEach((item) => {
              console.log(
                "---------------------------------------------------------"
              );
              console.log(`Subject: ${item.subject}`);
              const filteredMarks = item.marks.filter((mark) => mark !== -1);
              console.log(`Marks: ${filteredMarks.join(", ")}`);
            });
            console.log(
              "-----------------------------------------------------------------------------------"
            );
          } catch (error) {
            console.error("An error occurred:", error);
          }
        }
      }
    });
};

const getMarksByRoll = async (roll, semester) => {
  const rows = [];

  fs.createReadStream("./annexure.csv")
    .pipe(parse({ delimiter: ",", from_line: 19 }))
    .on("data", function (row) {
      rows.push(row);
    })
    .on("end", async function () {
      const rollColumnIndex = 7;
      const passwordColumnIndex = 5;

      for (const row of rows) {
        const currentRoll = row[rollColumnIndex];
        if (currentRoll === roll) {
          const pass =
            row[passwordColumnIndex].substring(0, 3) + currentRoll.substring(1);
          try {
            const scrapedData = await marksScraper(roll, pass, semester);
            const parsedData = marksParser(scrapedData);
            console.log(
              "-----------------------------------------------------------------------------------"
            );
            console.log(parsedData.name);
            parsedData.marks.forEach((item) => {
              console.log(
                "---------------------------------------------------------"
              );
              console.log(`Subject: ${item.subject}`);
              const filteredMarks = item.marks.filter((mark) => mark !== -1);
              console.log(`Marks: ${filteredMarks.join(", ")}`);
            });
            console.log(
              "-----------------------------------------------------------------------------------"
            );
          } catch (error) {
            console.error("An error occurred:", error);
          }
          break;
        }
      }
    });
};

export {
  getAttendaceAll,
  getAttendanceRange,
  getAttendanceByRoll,
  getMarksAll,
  getMarksRange,
  getMarksByRoll,
};
