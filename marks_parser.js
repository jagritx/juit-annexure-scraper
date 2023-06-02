import { load } from "cheerio";

function marksParser(html) {
  const $ = load(html);
  const rows = $("table#table-1 tbody tr");

  //Extract name using Reg Ex
  const nameString = $("td:contains('Name:')").text().trim();
  const nameRegex = /Name:\s(.+)/;
  const nameMatch = nameString.match(nameRegex);
  const name = nameMatch ? nameMatch[1].trim() : "";

  const marks = [];
  //Extract Marks along with code (For this sem, might need to modify later)
  rows.each((index, row) => {
    const subject = $(row).find("td:nth-child(2)").text().trim();
    const p1 = parseFloat($(row).find("td:nth-child(3)").text().trim()) || 0;
    const p2 = parseFloat($(row).find("td:nth-child(4)").text().trim()) || 0;
    const p3 = parseFloat($(row).find("td:nth-child(5)").text().trim()) || 0;
    const project1 =
      parseFloat($(row).find("td:nth-child(6)").text().trim()) || 0;
    const project2 =
      parseFloat($(row).find("td:nth-child(7)").text().trim()) || 0;
    const project3 =
      parseFloat($(row).find("td:nth-child(8)").text().trim()) || 0;
    const project4 =
      parseFloat($(row).find("td:nth-child(9)").text().trim()) || 0;
    const test1 =
      parseFloat($(row).find("td:nth-child(10)").text().trim()) || 0;
    const test2 =
      parseFloat($(row).find("td:nth-child(11)").text().trim()) || 0;
    const test3 =
      parseFloat($(row).find("td:nth-child(12)").text().trim()) || 0;

    marks.push({
      subject,
      p1,
      p2,
      p3,
      project1,
      project2,
      project3,
      project4,
      test1,
      test2,
      test3,
    });
  });

  return { name: name, marks };
}

export default marksParser;
