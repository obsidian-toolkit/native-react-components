import React from 'react';
export const SelectWrapper = ({ children, disabled: parentDisabled }) => {
    const props = children.props;
    const isDisabled = props.disabled || parentDisabled;
    return React.cloneElement(children, {
        className: `dropdown ${props.className || ''}`.trim(),
        tabIndex: isDisabled ? -1 : 0,
        disabled: isDisabled,
        style: {
            ...props.style,
            opacity: isDisabled ? 0.6 : 1,
            cursor: isDisabled ? 'not-allowed' : 'pointer',
        },
    });
};
