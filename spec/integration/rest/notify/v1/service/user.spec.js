'use strict';

var _ = require('lodash');  /* jshint ignore:line */
var Holodeck = require('../../../../holodeck');  /* jshint ignore:line */
var Request = require(
    '../../../../../../lib/http/request');  /* jshint ignore:line */
var Response = require(
    '../../../../../../lib/http/response');  /* jshint ignore:line */
var RestException = require(
    '../../../../../../lib/base/RestException');  /* jshint ignore:line */
var Twilio = require('../../../../../../lib');  /* jshint ignore:line */


var client;
var holodeck;

describe('User', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'AUTHTOKEN', {
      httpClient: holodeck
    });
  });
  it('should generate valid create request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var opts = {
        identity: 'identity'
      };
      var promise = client.notify.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                    .users.create(opts);
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        serviceSid: 'ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://notify.twilio.com/v1/Services/<%= serviceSid %>/Users')(solution);

      var values = {
        Identity: 'identity',
      };
      holodeck.assertHasRequest(new Request({
          method: 'POST',
          url: url,
          data: values
      }));
    }
  );
  it('should generate valid create response',
    function() {
      var body = JSON.stringify({
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'date_created': '2017-02-17T07:17:02Z',
          'date_updated': '2017-02-17T07:17:02Z',
          'identity': 'identity',
          'links': {
              'bindings': 'https://notify.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Users/identity/Bindings',
              'segment_memberships': 'https://notify.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Users/identity/SegmentMemberships'
          },
          'segments': [
              'segment1'
          ],
          'service_sid': 'ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'sid': 'USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'url': 'https://notify.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Users/identity'
      });

      holodeck.mock(new Response(201, body));

      var opts = {
        identity: 'identity'
      };
      var promise = client.notify.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                    .users.create(opts);
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid remove request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.notify.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                    .users('NUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').remove();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        serviceSid: 'ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        identity: 'NUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://notify.twilio.com/v1/Services/<%= serviceSid %>/Users/<%= identity %>')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'DELETE',
        url: url
      }));
    }
  );
  it('should generate valid delete response',
    function() {
      var body = JSON.stringify(null);

      holodeck.mock(new Response(204, body));

      var promise = client.notify.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                    .users('NUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').remove();
      promise = promise.then(function(response) {
        expect(response).toBe(true);
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid fetch request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.notify.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                    .users('NUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').fetch();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        serviceSid: 'ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        identity: 'NUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://notify.twilio.com/v1/Services/<%= serviceSid %>/Users/<%= identity %>')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid fetch response',
    function() {
      var body = JSON.stringify({
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'sid': 'USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'date_created': '2017-02-17T07:17:02Z',
          'date_updated': '2017-02-17T07:17:02Z',
          'identity': 'identity',
          'links': {
              'bindings': 'https://notify.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Users/identity/Bindings',
              'segment_memberships': 'https://notify.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Users/identity/SegmentMemberships'
          },
          'segments': [
              'segment1'
          ],
          'service_sid': 'ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'url': 'https://notify.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Users/identity'
      });

      holodeck.mock(new Response(200, body));

      var promise = client.notify.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                    .users('NUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').fetch();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid list request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.notify.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                    .users.list();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        serviceSid: 'ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://notify.twilio.com/v1/Services/<%= serviceSid %>/Users')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid read_empty response',
    function() {
      var body = JSON.stringify({
          'users': [],
          'meta': {
              'first_page_url': 'https://notify.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Users?PageSize=50&Page=0',
              'key': 'users',
              'next_page_url': null,
              'page': 0,
              'page_size': 50,
              'previous_page_url': null,
              'url': 'https://notify.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Users?PageSize=50&Page=0'
          }
      });

      holodeck.mock(new Response(200, body));

      var promise = client.notify.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                    .users.list();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid read_full response',
    function() {
      var body = JSON.stringify({
          'users': [
              {
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'date_created': '2017-02-17T07:17:02Z',
                  'date_updated': '2017-02-17T07:17:02Z',
                  'identity': 'identity',
                  'links': {
                      'bindings': 'https://notify.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Users/identity/Bindings',
                      'segment_memberships': 'https://notify.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Users/identity/SegmentMemberships'
                  },
                  'segments': [
                      'segment1'
                  ],
                  'service_sid': 'ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'sid': 'USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'url': 'https://notify.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Users/identity'
              }
          ],
          'meta': {
              'first_page_url': 'https://notify.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Users?PageSize=50&Page=0',
              'key': 'users',
              'next_page_url': null,
              'page': 0,
              'page_size': 50,
              'previous_page_url': null,
              'url': 'https://notify.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Users?PageSize=50&Page=0'
          }
      });

      holodeck.mock(new Response(200, body));

      var promise = client.notify.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                    .users.list();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
});

