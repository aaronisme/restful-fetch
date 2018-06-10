import sinon from 'sinon';
import apiHelper from '../src/api';

describe('api', () => {
  afterEach(() => {
    window.fetch.restore();
  });

  describe('POST Succeeded', () => {
    let responseBody;
    let response;

    beforeEach(() => {
      responseBody = { flow: 'test-flow' };
      response = new Response(JSON.stringify(responseBody), {
        status: 200,
        headers: { 'Content-type': 'application/json' },
      });
    });

    it('should form the correct params to the post request', (done) => {
      const fetchStub = sinon.stub(window, 'fetch').returns(Promise.resolve(response));

      apiHelper.post('/dummypost', { flowId: 'test-flow' }, { newHeader: 'test' }).then(() => {
        expect(fetchStub.calledWith('/dummypost', {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({ flowId: 'test-flow' }),
          headers: {
            'Content-Type': 'application/json',
            newHeader: 'test',
          },
        })).toEqual(true);
        done();
      }).catch(done);
    });


    it('should resolve with the api response data when request succeed', (done) => {
      sinon.stub(window, 'fetch').returns(Promise.resolve(response));

      apiHelper.post('/dummypost', { flowId: 'test-flow' }).then((result) => {
        expect(result).toEqual(responseBody);
        done();
      }).catch(done);
    });
  });

  describe('POST Failed', () => {
    it('should reject with customized error when HTTP request is fulfilled, but status is not ok', (done) => {
      const res = new Response('NOT FOUND', {
        status: 404,
        statusText: 'NOT FOUND',
      });

      sinon.stub(window, 'fetch').returns(Promise.resolve(res));

      apiHelper.post('/dummypost', { flowId: 'test-flow' }).catch((e) => {
        expect(e.statusCode).toEqual(404);
        expect(e.responseText).toEqual('NOT FOUND');
        expect(e.statusText).toEqual('NOT FOUND');
        expect(e.message).toEqual('{\n\t statusCode: 404,\n\t statusText: "NOT FOUND",\n\t responseText: "NOT FOUND"\n}');
        done();
      }).catch(done);
    });

    it('should reject with original error when HTTP request could not be fulfilled', (done) => {
      const error = new Error('network error');

      sinon.stub(window, 'fetch').returns(Promise.reject(error));

      apiHelper.post('/dummypost', { flowId: 'test-flow' }).catch((e) => {
        expect(e).toEqual(error);
        done();
      }).catch(done);
    });
  });

  describe('GET Succeeded', () => {
    let responseBody;
    let response;

    beforeEach(() => {
      responseBody = { flow: 'test-flow' };
      response = new Response(JSON.stringify(responseBody), {
        status: 200,
        headers: { 'Content-type': 'application/json' },
      });
    });

    it('should form the correct params to the post request', (done) => {
      const fetchStub = sinon.stub(window, 'fetch').returns(Promise.resolve(response));

      apiHelper.get('/test-get', { newHeader: 'test' }).then(() => {
        expect(fetchStub.calledWith('/test-get', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            newHeader: 'test',
          },
        })).toEqual(true);
        done();
      }).catch(done);
    });


    it('should resolve with the api response data when request succeed', (done) => {
      sinon.stub(window, 'fetch').returns(Promise.resolve(response));

      apiHelper.get('/test-get').then((result) => {
        expect(result).toEqual(responseBody);
        done();
      }).catch(done);
    });
  });

  describe('GET Failed', () => {
    it('should reject with customized error when HTTP request is fulfilled, but status is not ok', (done) => {
      const res = new Response('NOT FOUND', {
        status: 404,
        statusText: 'NOT FOUND',
      });

      sinon.stub(window, 'fetch').returns(Promise.resolve(res));

      apiHelper.get('/test-get').catch((e) => {
        expect(e.statusCode).toEqual(404);
        expect(e.responseText).toEqual('NOT FOUND');
        expect(e.statusText).toEqual('NOT FOUND');
        expect(e.message).toEqual('{\n\t statusCode: 404,\n\t statusText: "NOT FOUND",\n\t responseText: "NOT FOUND"\n}');
        done();
      }).catch(done);
    });

    it('should reject with original error when HTTP request could not be fulfilled', (done) => {
      const error = new Error('network error');

      sinon.stub(window, 'fetch').returns(Promise.reject(error));

      apiHelper.get('/test-get').catch((e) => {
        expect(e).toEqual(error);
        done();
      }).catch(done);
    });
  });
});
