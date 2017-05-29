import MockEventTarget from './MockEventTarget';
import MockResponse from './MockResponse';

describe('MockResponse', () => {
  describe('.status()', () => {
    it('should be -1 when not set', () => {
      const res = new MockResponse();
      expect(res.status()).toEqual(-1);
    });

    it('should be 404 when set', () => {
      const res = new MockResponse();
      res.status(404);
      expect(res.status()).toEqual(404);
    });

    it('should return the response when the value is set', () => {
      const res = new MockResponse();
      expect(res.status(404)).toBe(res);
    });
  });

  describe('.reason()', () => {
    it('should be an empty string when not set', () => {
      const res = new MockResponse();
      expect(res.reason()).toEqual('');
    });

    it('should be Not found when set', () => {
      const res = new MockResponse();
      res.reason('Not found');
      expect(res.reason()).toEqual('Not found');
    });

    it('should return the response when the value is set', () => {
      const res = new MockResponse();
      expect(res.reason('Not found')).toBe(res);
    });
  });

  describe('.header()', () => {
    it('should be null when not set', () => {
      const res = new MockResponse();
      expect(res.header('content-type')).toEqual(null);
    });

    it('should be image/jpeg when set', () => {
      const res = new MockResponse();
      res.header('content-type', 'image/jpeg');
      expect(res.header('content-type')).toEqual('image/jpeg');
    });

    it('should return the response when the value is set', () => {
      const res = new MockResponse();
      expect(res.header('content-type', 'image/jpeg')).toBe(res);
    });
  });

  describe('.headers()', () => {
    it('should be an empty object when not set', () => {
      const res = new MockResponse();
      expect(res.headers()).toEqual({});
    });

    it('should be an empty object when not set', () => {
      const res = new MockResponse();
      res.headers({'content-type': 'image/jpeg'});
      expect(res.headers()).toEqual(
        expect.objectContaining({'content-type': 'image/jpeg'})
      );
    });

    it('should return the response when the value is set', () => {
      const res = new MockResponse();
      expect(res.headers({'content-type': 'image/jpeg'})).toBe(res);
    });
  });

  describe('.body()', () => {
    it('should be an empty string when not set', () => {
      const res = new MockResponse();
      res.body('xyz');
      expect(res.body()).toEqual('xyz');
    });

    it('should be HelloWorld when set', () => {
      const res = new MockResponse();
      res.body('HelloWorld');
      expect(res.body()).toEqual('HelloWorld');
    });

    it('should return the response when the value is set', () => {
      const res = new MockResponse();
      expect(res.body('HelloWorld')).toBe(res);
    });
  });

  describe('.progress()', () => {
    it('should dispatch the progress event', () => {
      let progressEvent = null;
      const events = new MockEventTarget();
      const res = new MockResponse(events);

      events.addEventListener('progress', event => {
        progressEvent = event;
      });

      res.progress(0, 100);

      expect(progressEvent).toEqual(
        expect.objectContaining({
          lengthComputable: true,
          loaded: 0,
          total: 100
        })
      );
    });

    it('should return the response when the value is set', () => {
      const events = new MockEventTarget();
      const res = new MockResponse(events);
      expect(res.progress()).toBe(res);
    });
  });
});
