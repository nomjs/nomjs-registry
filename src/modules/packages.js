'use strict';

const Ravel = require('ravel');

class UnscopedPackageError extends Ravel.Error {
  constructor(msg) {
    super(msg, constructor, 308);
  }
}

class UnsubmittedPackageError extends Ravel.Error {
  constructor(msg) {
    super(msg, constructor, 307);
  }
}

/**
 * Logic for listing, retrieving, publishing packages
 */
class Packages extends Ravel.Module {

  constructor() {
    super();
  }

  isScoped(id) {
    // TODO should we check for the slash as well? This is faster, but maybe not sufficient.
    return id[0] === '@';
  }

  getScope(id) {
    const scope = id.match(/^@([\w\-]+)\/([\w\-]+)$/);
    if (scope === null) {
      throw new UnscopedPackageError(`Package id ${id} is not a scoped package`);
    }
    return scope[1];
  }

  _retrieveInfo(id) { //eslint-disable-line no-unused-vars
    return Promise.reject(new UnsubmittedPackageError({
      error: `nom can't find the package you're looking for.\nPlease encourage the developer to submit it to nom!`
    }));
  }

  /**
   * Re-encode a package id to use urlencoded format for slashes
   */
  encode(id) {
    return id.replace('/','%2f');
  }

  /**
   * Retrieve package information based on a package name
   * @param id {String} the package name (such as @raveljs/ravel).
   * @return {Promise} resolves if the package is in the nom registry, rejects otherwise.
   */
  info(id) {
    this.log.info(`client asked for info on: ${id}`);

    if (this.isScoped(id)) {
      return this._retrieveInfo(id);
    } else {
      return Promise.reject(new UnscopedPackageError({
        error: 'nom does not permit unscoped packages'
      }));
    }
  }

  /**
   * Create or update package info and publish tarballs to blob store
   * @param {Object} args:
   *   @param {String} name
   *   @param {String} description
   *   @param {Object} dist-tags
   *   @param {Object} versions
   *   @param {String} readme
   *   @param {Object} _attachments
   * @return {Promise} resolves when package publish is compmlete, rejects with any errors
   */
  publish(args) { //eslint-disable-line no-unused-vars
    console.dir(args);
    // TODO reject attachment if size is too big, but check all of them - not just the first one
    // const attachments = (c) => c.request.fields._attachments;
    // if (
    //   ctx.request.fields &&
    //   typeof attachments(ctx) === 'object' &&
    //   Object.keys(attachments(ctx)).length === 1 &&
    //   attachments(ctx)[Object.keys(attachments(ctx))[0]].length <= this.params.get('max package size bytes')
    // )
    return Promise.reject(new this.ApplicationError.NotImplemented('Not implemented yet :)'));
  }
}

module.exports = Packages;
