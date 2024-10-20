import { createMocks } from 'node-mocks-http';
import handler from '../pages/api/logout';

describe('POST /api/logout', () => {
  it('should log out a user', async () => {
    const { req, res } = createMocks({
      method: 'POST',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ message: 'Logged out successfully' });
    expect(res._getHeaders()['set-cookie']).toContain("token=; Max-Age=-1; Path=/; HttpOnly")
    expect(res._getHeaders()['set-cookie']).toContain("isLoggedIn=; Max-Age=-1; Path=/");
  });

  it('should return an error if the method is not POST', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(res._getJSONData()).toEqual({ message: 'Method Not Allowed' });
  });
});
