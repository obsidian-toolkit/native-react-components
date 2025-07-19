import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
export const SliderWrapper = ({ children, disabled: parentDisabled }) => {
    const props = children.props;
    const isDisabled = props.disabled || parentDisabled;
    const sliderRef = useRef(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipValue, setTooltipValue] = useState('');
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const timeoutRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
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
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setShowTooltip(true);
        if (!isDragging) {
            timeoutRef.current = setTimeout(() => {
                setShowTooltip(false);
                timeoutRef.current = null;
            }, 200);
        }
        const value = e.currentTarget.value;
        setTooltipValue(value);
        updateTooltipPosition();
        if (props.onInput) {
            props.onInput(e);
        }
    };
    useEffect(() => {
        const handleEnd = () => {
            setIsDragging(false);
            setShowTooltip(false);
        };
        if (isDragging) {
            document.addEventListener('pointerup', handleEnd);
            document.addEventListener('pointercancel', handleEnd);
            return () => {
                document.removeEventListener('pointerup', handleEnd);
                document.removeEventListener('pointercancel', handleEnd);
            };
        }
    }, [isDragging]);
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    const handleMouseEnter = (e) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setTooltipValue(e.currentTarget.value);
        setShowTooltip(true);
        updateTooltipPosition();
        if (props.onMouseEnter) {
            props.onMouseEnter(e);
        }
    };
    const handleMouseLeave = (e) => {
        if (!isDragging) {
            setShowTooltip(false);
        }
        if (props.onMouseLeave) {
            props.onMouseLeave(e);
        }
    };
    const handlePointerDown = () => {
        setIsDragging(true);
        if (!showTooltip) {
            setTooltipValue(sliderRef.current?.value || '');
            setShowTooltip(true);
            updateTooltipPosition();
        }
    };
    return (_jsxs(_Fragment, { children: [React.cloneElement(children, {
                ref: sliderRef,
                className: `slider ${props.className || ''}`.trim(),
                tabIndex: isDisabled ? -1 : 0,
                disabled: isDisabled,
                onInput: handleInput,
                onPointerDown: handlePointerDown,
                onMouseEnter: handleMouseEnter,
                onMouseLeave: handleMouseLeave,
                style: {
                    ...props.style,
                    opacity: isDisabled ? 0.6 : 1,
                    cursor: isDisabled ? 'not-allowed' : 'default',
                },
            }), showTooltip &&
                createPortal(_jsxs("div", { className: 'tooltip mod-top', style: {
                        position: 'fixed',
                        left: tooltipPosition.x,
                        top: tooltipPosition.y,
                        transform: 'translateX(-50%)',
                        zIndex: 1000,
                        pointerEvents: 'none',
                    }, children: [tooltipValue, _jsx("div", { className: 'tooltip-arrow' })] }), document.body), ' '] }));
};
