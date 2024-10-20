import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';

export function createMockRequest(body: any): NextApiRequest {
  const req = new Readable() as NextApiRequest;
  req.headers = {
    'content-type': 'application/json',
  };
  req.method = 'POST';
  req.body = body;
  return req;
}

export function createMockResponse(): NextApiResponse {
  const res = {} as NextApiResponse;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
}