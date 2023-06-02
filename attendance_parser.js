import { load } from "cheerio";

export default function attendanceParser(data) {
  const $ = load(data);

  // Extract student information
  const studentName = $('form[name="frm"] tr:nth-child(1) td:nth-child(1)')
    .text()
    .trim();
  const courseBranch = $('form[name="frm"] td:nth-child(2)').text().trim();
  const currentSemester = $('form[name="frm"] td:nth-child(3)').text().trim();

  // Extract attendance data
  const attendanceRows = $("#table-1 tbody tr").toArray();
  const attendance = attendanceRows.map((row) => {
    const $row = $(row);
    const sno = $row.find("td:nth-child(1)").text().trim();
    const subject = $row.find("td:nth-child(2)").text().trim();
    const lectureTutorialAttendance = $row
      .find("td:nth-child(3) a")
      .text()
      .trim();
    const lectureAttendance = $row.find("td:nth-child(4) a").text().trim();
    const tutorialAttendance = $row.find("td:nth-child(5)").text().trim();
    const practicalAttendance = $row.find("td:nth-child(6) a").text().trim();

    return {
      sno,
      subject,
      lectureTutorialAttendance,
      lectureAttendance,
      tutorialAttendance,
      practicalAttendance,
    };
  });

  return {
    studentName,
    courseBranch,
    currentSemester,
    attendance,
  };
}
