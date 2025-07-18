import { jsx as _jsx } from "react/jsx-runtime";
import React, { useRef, useState } from 'react';
export const CheckboxWrapper = ({ children, disabled: parentDisabled }) => {
    const props = children.props;
    const checkboxRef = useRef(null);
    const isDisabled = props.disabled || parentDisabled;
    const isControlled = props.checked !== undefined;
    const [internalChecked, setInternalChecked] = useState(props.defaultChecked || false);
    const checked = isControlled ? props.checked : internalChecked;
    const handleDivClick = () => {
        if (isDisabled)
            return;
        checkboxRef.current?.click();
    };
    const handleChange = (e) => {
        if (isDisabled)
            return;
        if (!isControlled) {
            setInternalChecked(e.target.checked);
        }
        if (props.onChange) {
            props.onChange(e);
        }
    };
    const ariaProps = Object.keys(props).reduce((acc, key) => {
        if (key.startsWith('aria-')) {
            acc[key] = props[key];
        }
        return acc;
    }, {});
    return (_jsx("div", { className: `checkbox-container ${checked ? 'is-enabled' : ''} ${isDisabled ? 'is-disabled' : ''}`, onPointerDown: handleDivClick, ...ariaProps, style: {
            cursor: isDisabled ? 'not-allowed' : 'default',
            opacity: isDisabled ? 0.6 : 1,
        }, children: React.cloneElement(children, {
            ref: checkboxRef,
            tabIndex: isDisabled ? -1 : 0,
            onChange: handleChange,
            checked: checked,
            disabled: isDisabled,
            style: { pointerEvents: 'none' },
            ...Object.keys(ariaProps).reduce((acc, key) => {
                acc[key] = undefined;
                return acc;
            }, {}),
        }) }));
};
