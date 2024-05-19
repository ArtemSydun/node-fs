const { registerUserController } = require("../src/controllers/authController");
const { statusCode } = require("../src/helpers/constants");
const { registerUser } = require("../src/services/authService");

const mockRequest = (body) => ({
  body,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

jest.mock("../src/services/authService", () => ({
  registerUser: jest.fn(),
}));

describe("registerUserController", () => {
  it("should respond with status 201 and json object with message: success on success", async () => {
    const req = mockRequest({
      firstName: "exampleName",
      lastName: "exampleLName",
      email: "exampleEmail",
      password: "examplePass",
    });

    const res = mockResponse();

    await registerUserController(req, res);

    expect(res.status).toHaveBeenCalledWith(statusCode.CREATED);

    expect(res.json).toHaveBeenCalledWith({ status: "success"});
  });
});
