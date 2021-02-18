"use strict";
exports.__esModule = true;
var react_1 = require("react");
function useDigitInput(_a) {
    var acceptedCharacters = _a.acceptedCharacters, length = _a.length, value = _a.value, onChange = _a.onChange;
    var val = padValue(value, length);
    var inputs = react_1.useRef(Array.from({ length: length }));
    var inputRefSetters = react_1.useRef(Array.from({ length: length }));
    var props = [];
    var _loop_1 = function (i) {
        var ref = (inputRefSetters.current[i] =
            inputRefSetters.current[i] ||
                (function (input) {
                    inputs.current[i] = input || undefined;
                }));
        var digitValue = val[i] === ' ' ? '' : val[i];
        props.push({
            ref: ref,
            value: digitValue,
            onClick: function (_a) {
                var currentTarget = _a.currentTarget;
                window.requestAnimationFrame(function () {
                    currentTarget.setSelectionRange(0, 1);
                });
            },
            onFocus: function (_a) {
                var currentTarget = _a.currentTarget;
                currentTarget.setSelectionRange(0, 1);
            },
            onKeyDown: function (e) {
                switch (e.key) {
                    case 'Backspace':
                        e.preventDefault();
                        if (!digitValue) {
                            if (i > 0) {
                                // this digit is empty, so backspace removes the previous digit
                                // and focuses it
                                onChange(val.substring(0, i - 1) + ' ' + val.substring(i));
                                var previousInput = inputs.current[i - 1];
                                if (previousInput) {
                                    previousInput.focus();
                                }
                            }
                        }
                        else {
                            // this digit is not empty, so backspace removes that digit
                            onChange(val.substring(0, i) + ' ' + val.substring(i + 1));
                        }
                        break;
                    case 'ArrowUp':
                    case 'ArrowLeft':
                        e.preventDefault();
                        if (i > 0) {
                            var previousInput_1 = inputs.current[i - 1];
                            if (previousInput_1) {
                                previousInput_1.focus();
                                window.requestAnimationFrame(function () {
                                    previousInput_1.setSelectionRange(0, 1);
                                });
                            }
                        }
                        break;
                    case 'ArrowDown':
                    case 'ArrowRight':
                        e.preventDefault();
                        if (i + 1 < length) {
                            var nextInput_1 = inputs.current[i + 1];
                            if (nextInput_1) {
                                nextInput_1.focus();
                                window.requestAnimationFrame(function () {
                                    nextInput_1.setSelectionRange(0, 1);
                                });
                            }
                        }
                        break;
                }
            },
            onChange: function (e) {
                var v = e.target.value
                    .split('')
                    .filter(function (c) { return acceptedCharacters.test(c); })
                    .join('');
                onChange((val.substring(0, i) + v + val.substring(i + v.length)).substr(0, length));
                if (i < length - 1) {
                    var nextInput_2 = inputs.current[i + v.length < length ? i + v.length : length - 1];
                    if (nextInput_2) {
                        nextInput_2.focus();
                        window.requestAnimationFrame(function () {
                            nextInput_2.setSelectionRange(0, 1);
                        });
                    }
                }
            }
        });
    };
    for (var i = 0; i < length; i++) {
        _loop_1(i);
    }
    return props;
}
exports["default"] = useDigitInput;
function padValue(value, length) {
    while (value.length < length) {
        value += ' ';
    }
    return value.substr(0, length);
}
//# sourceMappingURL=index.js.map