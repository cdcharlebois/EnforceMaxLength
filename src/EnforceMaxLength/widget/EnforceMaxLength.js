define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",

    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/_base/event",

], function(declare, _WidgetBase, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, dojoConstruct, dojoArray, lang, dojoText, dojoHtml, dojoEvent) {
    "use strict";

    return declare("EnforceMaxLength.widget.EnforceMaxLength", [_WidgetBase], {

        //modeler
        target: null,
        // Internal variables.
        _handles: null,
        _contextObj: null,

        constructor: function() {
            this._handles = [];
        },

        postCreate: function() {
            logger.debug(this.id + ".postCreate");

        },

        update: function(obj, callback) {
            logger.debug(this.id + ".update");
            this._contextObj = obj;
            if (this.target) {
                var formGroupNode = this.domNode.parentElement.querySelector(".mx-name-" + this.target);
                if (formGroupNode) {
                    var inputNode = formGroupNode.querySelector("input");
                    if (inputNode) {
                        if (inputNode.hasAttribute("maxlength")) {
                            this.connect(inputNode, "keyup", function(e) {
                                if (e.target.value.length > inputNode.getAttribute("maxlength") * 1) {
                                    e.target.value = e.target.value.substr(0, inputNode.getAttribute("maxlength") * 1);
                                }
                            });
                        } else {
                            console.error("[MaxLength] the target doesn't have the 'maxlength' attribute :(");
                        }
                    } else {
                        console.error("[MaxLength] couldn't find the input node");
                    }
                } else {
                    console.error("[MaxLength] could not find the target: " + this.target);
                }
            } else {
                console.error("[MaxLength] no target specified. Check the configuration.");
            }
            this._updateRendering(callback);
        },

        resize: function(box) {
            logger.debug(this.id + ".resize");
        },

        uninitialize: function() {
            logger.debug(this.id + ".uninitialize");
        },

        _updateRendering: function(callback) {
            logger.debug(this.id + "._updateRendering");

            if (this._contextObj !== null) {
                dojoStyle.set(this.domNode, "display", "block");
            } else {
                dojoStyle.set(this.domNode, "display", "none");
            }

            this._executeCallback(callback);
        },

        _executeCallback: function(cb) {
            if (cb && typeof cb === "function") {
                cb();
            }
        }
    });
});

require(["EnforceMaxLength/widget/EnforceMaxLength"]);