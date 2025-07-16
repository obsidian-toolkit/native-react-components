import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { ButtonWrapper } from './wrappers/ButtonWrapper';
import { CheckboxWrapper } from './wrappers/CheckboxWrapper';
import { SelectWrapper } from './wrappers/SelectWrapper';
import { SliderWrapper } from './wrappers/SliderWrapper';
export const WrapElements = (children, parentDisabled) => {
    return React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            const props = child.props;
            const isDisabled = props.disabled || parentDisabled;
            if (child.type === 'input') {
                if (props.type === 'checkbox') {
                    return (_jsx(CheckboxWrapper, { disabled: isDisabled, children: child }));
                }
                if (props.type === 'range') {
                    return (_jsx(SliderWrapper, { disabled: isDisabled, children: child }));
                }
                return React.cloneElement(child, {
                    disabled: isDisabled,
                    tabIndex: isDisabled ? -1 : props.tabIndex || 0,
                    style: {
                        ...props.style,
                        opacity: isDisabled ? 0.6 : 1,
                        cursor: isDisabled ? 'not-allowed' : 'text',
                    },
                });
            }
            if (child.type === 'button') {
                return (_jsx(ButtonWrapper, { disabled: isDisabled, children: child }));
            }
            if (child.type === 'select') {
                return (_jsx(SelectWrapper, { disabled: isDisabled, children: child }));
            }
            if (child.type === 'textarea') {
                return React.cloneElement(child, {
                    disabled: isDisabled,
                    tabIndex: isDisabled ? -1 : props.tabIndex || 0,
                    style: {
                        ...props.style,
                        opacity: isDisabled ? 0.6 : 1,
                        cursor: isDisabled ? 'not-allowed' : 'text',
                    },
                });
            }
            if (child.type === 'a') {
                return React.cloneElement(child, {
                    tabIndex: isDisabled ? -1 : props.tabIndex || 0,
                    onClick: isDisabled
                        ? (e) => e.preventDefault()
                        : props.onClick,
                    style: {
                        ...props.style,
                        opacity: isDisabled ? 0.6 : 1,
                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                        pointerEvents: isDisabled ? 'none' : 'auto',
                    },
                });
            }
            if (props.onClick || props.onMouseDown || props.onMouseUp) {
                return React.cloneElement(child, {
                    onClick: isDisabled ? undefined : props.onClick,
                    onMouseDown: isDisabled ? undefined : props.onMouseDown,
                    onMouseUp: isDisabled ? undefined : props.onMouseUp,
                    tabIndex: isDisabled ? -1 : props.tabIndex || 0,
                    style: {
                        ...props.style,
                        opacity: isDisabled ? 0.6 : 1,
                        cursor: isDisabled
                            ? 'not-allowed'
                            : props.style?.cursor || 'pointer',
                        pointerEvents: isDisabled ? 'none' : 'auto',
                    },
                    children: props.children
                        ? WrapElements(props.children, isDisabled)
                        : props.children,
                });
            }
            if (props.children) {
                return React.cloneElement(child, {
                    children: WrapElements(props.children, isDisabled),
                });
            }
        }
        return child;
    });
};
