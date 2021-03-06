/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import classNames from 'classnames/dedupe';
import fastdom from 'fastdom';
import Gator from 'gator';

import { forEach, map } from './helpers';

/**
 * Event delegation helper
 *
 * @param {string} event
 * @param {string} selector
 * @param {function} listener
 */
export const delegate = (event, selector, listener) =>
  Gator(document).on(event, selector, function (event) {
    listener(event, this);
  });

/**
 * Alias for document.querySelectorAll
 */
export const $ = (selector, scope = document) =>
  map(scope.querySelectorAll(selector), node => node);

/**
 * Set the className using "classnames" inside a fastdom.mutate
 *
 * @param {Node} node
 * @param {...string|object}
 */
export const setClassName = (node, ...args) =>
  fastdom.mutate(() =>
    node.className = classNames(node.className, ...args));

/**
 * Return the closest parent matching the selector
 *
 * @param {Node} node
 * @param {string} selector
 * @returns {Node|null}
 */
export const closest = (node, selector) => {
  const selection = $(selector);
  let parent = node.parentElement;
  while (parent) {
    if (selection.indexOf(parent) > -1) {
      return parent;
    }
    parent = parent.parentElement;
  }
};

/**
 * Add "slds-hide" to a node
 *
 * @param {Node} node
 * @param {boolean} hide
 */
export const hide = (node, hide) => {
  setClassName(node, { 'slds-hide': hide });
  fastdom.mutate(() => node.style.display = hide ? 'none' : '');
};
