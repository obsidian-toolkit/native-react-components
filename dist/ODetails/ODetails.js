import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useLayoutEffect, useState, } from 'react';
import { OSETTING_CSS, OSETTING_STYLES_ID, StyleManager, } from '../style-manager';
const ODetails = ({ name, desc, defaultExpanded = false, expanded, onToggle, className, children, }) => {
    const [internalOpen, setInternalOpen] = useState(defaultExpanded);
    const isControlled = expanded !== undefined;
    const open = isControlled ? expanded : internalOpen;
    useLayoutEffect(() => {
        if (process.env.OSETTING_DISABLE_STYLES === 'true') {
            return;
        }
        StyleManager.getInstance().addStyle(OSETTING_STYLES_ID, OSETTING_CSS);
        return () => {
            StyleManager.getInstance().removeStyle(OSETTING_STYLES_ID);
        };
    }, []);
    const toggleHandle = useCallback((e) => {
        setInternalOpen(e.currentTarget.open);
        onToggle?.(e.currentTarget.open);
    }, [onToggle]);
    return (_jsx("div", { className: `react-obsidian-settings-item collapsible ${className ?? ''}`, children: _jsxs("details", { open: open, onToggle: toggleHandle, children: [_jsxs("summary", { children: [name && _jsxs("div", { className: 'setting-item-name', children: [name, " "] }), desc && (_jsx("div", { className: 'setting-item-description', children: desc }))] }), _jsx("div", { className: 'collapsible-content', children: children })] }) }));
};
export default ODetails;
