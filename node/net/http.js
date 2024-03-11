const http = require("http");

const collectResponse = (resolve) => (response) => {
  let data = "";
  response.on("data", (chunk) => {
    data += chunk;
  });
  response.on("end", () => {
    resolve({
      statusCode: response.statusCode,
      headers: response.headers,
      body: data,
    });
  });
};

const request = (options) =>
  new Promise((resolve, reject) => {
    const request = http.request(options, collectResponse(resolve));
    request.on("error", (err) => reject(err));
    request.end();
  });

const get = (hostname) => async (path) =>
  await request({
    method: "GET",
    hostname,
    port: 80,
    path,
  });

module.exports = {
  get,
};
