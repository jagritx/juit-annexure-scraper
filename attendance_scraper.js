import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

async function attendanceScraper(roll, pass) {
  //Change these values if you want to retry because sometimes webkiosk server doesnt not work
  const maxAttempts = 1;
  const delay = 0;
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      // Solving the cookie problem (just these two lines) took wayyy longer than expected :-|
      const jar = new CookieJar();
      const client = wrapper(axios.create({ jar }));

      axios.defaults.withCredentials = true;
      console.log(roll, pass);
      var body = {
        txtInst: "Institute",
        InstCode: "JUIT",
        txtuType: "Member Type",
        UserType: "P",
        txtCode: "Enrollment No",
        MemberCode: roll,
        txtPin: "Password/Pin",
        Password: pass,
        BTNSubmit: "Submit",
      };

      await client.get("https://webkiosk.juit.ac.in:9443/");
      await client.post(
        "https://webkiosk.juit.ac.in:9443/CommonFiles/UserAction.jsp",
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
          },
        },
        { params: { ...body } }
      );

      const response = await client.get(
        "https://webkiosk.juit.ac.in:9443/StudentFiles/Academic/StudentAttendanceList.jsp"
      );

      if (response.data.length > 1000) {
        return response.data;
      } else {
        throw new Error("Invalid Credentials");
      }
    } catch (error) {
      attempts++;
      console.log(
        `Attempt ${attempts}/${maxAttempts} failed. Retrying in ${
          delay / 1000
        } seconds...`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error(
    `Maximum number of attempts (${maxAttempts}) reached. Could not establish connection.`
  );
}

export default attendanceScraper;
