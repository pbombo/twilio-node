'use strict';

var _ = require('lodash');
var Holodeck = require('../../../../../../holodeck');
var Request = require('../../../../../../../../lib/http/Request');
var Response = require('../../../../../../../../lib/http/Response');
var Twilio = require('../../../../../../../../lib');


var client;
var holodeck;

describe('LastMonth', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'AUTHTOKEN', holodeck);
  });
  it('should generate valid list request', function() {
    holodeck.mock(new Response(500, ''));

    var promise = client.api.v2010.accounts('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .usage
                                  .records
                                  .lastMonth.list();
    promise = promise.then(function() {
      throw new Error('failed');
    }, function(error) {
      expect(error.constructor).toBe(Error.prototype.constructor);
    });

    promise.done();

    var solution = {
      accountSid: 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    };
    var url = _.template(
      'https://api.twilio.com/2010-04-01/Accounts/<%= accountSid %>/Usage/Records/LastMonth.json'
    )(solution);


    holodeck.assertHasRequest(new Request({
      method: 'GET',
      url: url
    }));
  });
  it('should generate valid read_full response', function() {
    var body = JSON.stringify({
        'end': 0,
        'first_page_uri': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/LastMonth?Page=0&PageSize=1',
        'last_page_uri': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/LastMonth?Page=68&PageSize=1',
        'next_page_uri': null,
        'num_pages': 69,
        'page': 0,
        'page_size': 1,
        'previous_page_uri': null,
        'start': 0,
        'total': 69,
        'uri': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/LastMonth',
        'usage_records': [
            {
                'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                'api_version': '2010-04-01',
                'category': 'sms-inbound-shortcode',
                'count': '0',
                'count_unit': 'messages',
                'description': 'Short Code Inbound SMS',
                'end_date': '2015-08-31',
                'price': '0',
                'price_unit': 'usd',
                'start_date': '2015-08-01',
                'subresource_uris': {
                    'all_time': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/AllTime.json?Category=sms-inbound-shortcode',
                    'daily': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Daily.json?Category=sms-inbound-shortcode',
                    'last_month': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/LastMonth.json?Category=sms-inbound-shortcode',
                    'monthly': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Monthly.json?Category=sms-inbound-shortcode',
                    'this_month': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/ThisMonth.json?Category=sms-inbound-shortcode',
                    'today': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Today.json?Category=sms-inbound-shortcode',
                    'yearly': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Yearly.json?Category=sms-inbound-shortcode',
                    'yesterday': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Yesterday.json?Category=sms-inbound-shortcode'
                },
                'uri': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/LastMonth?Category=sms-inbound-shortcode&StartDate=2015-08-01&EndDate=2015-08-31',
                'usage': '0',
                'usage_unit': 'messages'
            }
        ]
    });
    holodeck.mock(new Response(200, body));

    var promise = client.api.v2010.accounts('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .usage
                                  .records
                                  .lastMonth.list();
    promise = promise.then(function(response) {
      expect(response).toBeDefined();
    }, function() {
      throw new Error('failed');
    });

    promise.done();
  });
  it('should generate valid read_empty response', function() {
    var body = JSON.stringify({
        'end': 0,
        'first_page_uri': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/LastMonth?Page=0&PageSize=1',
        'last_page_uri': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/LastMonth?Page=68&PageSize=1',
        'next_page_uri': null,
        'num_pages': 69,
        'page': 0,
        'page_size': 1,
        'previous_page_uri': null,
        'start': 0,
        'total': 69,
        'uri': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/LastMonth',
        'usage_records': []
    });
    holodeck.mock(new Response(200, body));

    var promise = client.api.v2010.accounts('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .usage
                                  .records
                                  .lastMonth.list();
    promise = promise.then(function(response) {
      expect(response).toBeDefined();
    }, function() {
      throw new Error('failed');
    });

    promise.done();
  });
});
