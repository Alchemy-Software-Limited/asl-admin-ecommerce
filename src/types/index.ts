import type { HttpStatusCode } from 'src/enumns';

export interface IResponse<DataType> {
  data: {
    staus: 'success' | 'failed' | 'pending';
    statusCode: HttpStatusCode;
    success: boolean;
    message: string;
    data?: DataType | DataType[] | null;
    links?: Record<string, string>;
  };

  // `status` is the HTTP status code from the server response
  status: HttpStatusCode;

  // `statusText` is the HTTP status message from the server response
  // As of HTTP/2 status text is blank or unsupported.
  // (HTTP/2 RFC: https://www.rfc-editor.org/rfc/rfc7540#section-8.1.2.4)
  statusText: string;

  // `headers` the HTTP headers that the server responded with
  // All header names are lower cased and can be accessed using the bracket notation.
  // Example: `response.headers['content-type']`
  headers: object;

  // `config` is the config that was provided to `axios` for the request
  config: object;

  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance in the browser
  request: object;
}

export interface IResetPassword {
  password: string;
  confirmPassword: string;
  token: string;
}

export interface IVerifyOtp {
  otp: string;
  hash_otp: string;
}
