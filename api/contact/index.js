const AWS = require("aws-sdk");
const utils = require("../utils/utils");
var ses = new AWS.SES();

module.exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    if (!data) {
      return utils.sendResponse(200, { statusCode: 400, error: "Bad Request" });
    }

    var emailParams = {
        
    Destination: {
        ToAddresses: ["sales@salespulse360.com"],
      },
      Message: {
        Body: {
          Text: { Data: `
            Your Contact Form has a new submission: 
            Name: ${data.name}
            Email: ${data.email}
            Comments: ${data.comment}
          `}
        },
        Subject: { Data: "New Submission from Contact Form" },
      },
      Source: "jonasjefferson1992@gmail.com",
    };

  await ses.sendEmail(emailParams).promise()

  return utils.sendResponse(200, {message: "success"});
  } catch (err) {
    console.log("Error occured", err);
    return utils.sendResponse(200, {statusCode: 500, err});
  }
};