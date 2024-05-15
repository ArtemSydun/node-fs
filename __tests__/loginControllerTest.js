const { loginUserController } = require('../src/controllers/authController');
const { statusCode } = require('../src/helpers/constants');
const { loginUser } = require('../src/services/authService');

const mockRequest = (body) => ({
  body,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

jest.mock('../src/services/authService', () => ({
  loginUser: jest.fn(),
}));

describe('loginUserController', () => {
  it('should respond with status 200 and token if login is successful', async () => {
    const req = mockRequest({ username: 'exampleUser', password: 'examplePassword' });
    const res = mockResponse();

    const mockToken = 'mockedToken'; 

    loginUser.mockResolvedValueOnce(mockToken);

    await loginUserController(req, res);


    expect(res.status).toHaveBeenCalledWith(statusCode.OK);

    expect(res.json).toHaveBeenCalledWith({ status: 'Successful login', token: mockToken });
  });

});
