const { statusCode } = require('./constants');

class BadRequestException extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.status = statusCode.BAD_REQUEST;
  }
}

class ConflictException extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.status = statusCode.CONFLICT;
  }
}

class ForbiddenException extends Error {
  constructor(message = 'Forbidden') {
    super();
    this.message = message;
    this.status = statusCode.FORBIDDEN;
  }
}

class NotFoundException extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.status = statusCode.NOT_FOUND;
  }
}

class UnauthorizedException extends Error {
  constructor(message = 'Unauthorized') {
    super();
    this.message = message;
    this.status = statusCode.UNAUTHORIZED;
  }
}


  class ServiceUnavailableException extends Error {
  constructor(message = 'Service unavailable') {
    super();
    this.message = message;
    this.status = statusCode.SERVICE_UNAVAILABLE;
  }
}

module.exports = {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
};
