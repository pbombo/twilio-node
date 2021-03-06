'use strict';

var _ = require('lodash');  /* jshint ignore:line */
var CredentialList = require('./v2/credential').CredentialList;
var ServiceList = require('./v2/service').ServiceList;
var Version = require('../../base/Version');  /* jshint ignore:line */


/* jshint ignore:start */
/**
 * Initialize the V2 version of IpMessaging
 *
 * @constructor Twilio.IpMessaging.V2
 *
 * @property {Twilio.IpMessaging.V2.CredentialList} credentials -
 *          credentials resource
 * @property {Twilio.IpMessaging.V2.ServiceList} services - services resource
 *
 * @param {Twilio.IpMessaging} domain - The twilio domain
 */
/* jshint ignore:end */
function V2(domain) {
  Version.prototype.constructor.call(this, domain, 'v2');

  // Resources
  this._credentials = undefined;
  this._services = undefined;
}

_.extend(V2.prototype, Version.prototype);
V2.prototype.constructor = V2;

Object.defineProperty(V2.prototype,
  'credentials', {
  get: function() {
    this._credentials = this._credentials || new CredentialList(this);
    return this._credentials;
  }
});

Object.defineProperty(V2.prototype,
  'services', {
  get: function() {
    this._services = this._services || new ServiceList(this);
    return this._services;
  }
});

module.exports = V2;
