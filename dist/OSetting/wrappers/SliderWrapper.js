import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef, useState } from 'react';
export const SliderWrapper = ({ children, disabled: parentDisabled }) => {
    const props = children.props;
    const isDisabled = props.disabled || parentDisabled;
    const sliderRef = useRef(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipValue, setTooltipValue] = useState('');
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const updateTooltipPosition = () => {
        if (sliderRef.current) {
            const rect = sliderRef.current.getBoundingClientRect();
            setTooltipPosition({
                x: rect.left + rect.width / 2,
                y: rect.top - 40,
            });
        }
    };
    const handleInput = (e) => {
        const value = e.currentTarget.value;
        setTooltipValue(value);
        updateTooltipPosition();
        if (props.onInput) {
            props.onInput(e);
        }
    };
    const handleMouseEnter = (e) => {
        setTooltipValue(e.currentTarget.value);
        setShowTooltip(true);
        updateTooltipPosition();
        if (props.onMouseEnter) {
            props.onMouseEnter(e);
        }
    };
    const handleMouseLeave = (e) => {
        setShowTooltip(false);
        if (props.onMouseLeave) {
            props.onMouseLeave(e);
        }
    };
    return (_jsxs(_Fragment, { children: [React.cloneElement(children, {
                ref: sliderRef,
                className: `slider ${props.className || ''}`.trim(),
                tabIndex: isDisabled ? -1 : 0,
                disabled: isDisabled,
                onInput: handleInput,
                onMouseEnter: handleMouseEnter,
                onMouseLeave: handleMouseLeave,
                style: {
                    ...props.style,
                    opacity: isDisabled ? 0.6 : 1,
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                },
            }), showTooltip && (_jsx("div", { className: 'tooltip mod-top', style: {
                    position: 'fixed',
                    left: tooltipPosition.x,
                    top: tooltipPosition.y,
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                    pointerEvents: 'none',
                }, children: tooltipValue }))] }));
};
