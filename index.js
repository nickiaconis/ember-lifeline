/* eslint-env node */
'use strict';

const VersionChecker = require('ember-cli-version-checker');
const path = require('path');
const stew = require('broccoli-stew');

module.exports = {
  name: 'ember-lifeline',

  treeForAddon(tree) {
    tree = this._super.treeForAddon.call(this, ...arguments) || tree;

    let checker = new VersionChecker(this);
    if (checker.forEmber().satisfies('>=2.8')) {
      tree = stew.map(tree, (content, relativePath) => {
        if (path.basename(relativePath) === 'patch-schedule.js') {
          // Ember >= 2.8 doesn't require patching Ember.run.schedule
          // replace the patcher function with a no-op
          return 'export default function() {}';
        }

        return content;
      });
    }

    return tree;
  }
};
