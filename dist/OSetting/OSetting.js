import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLayoutEffect, useRef } from 'react';
import { Setting } from 'obsidian';
import { OSETTING_CSS, OSETTING_STYLES_ID, StyleManager, } from '../style-manager';
import { WrapElements } from './WrapElements';
import { descToFragment } from './utils/descToFragment';
const OSetting = ({ name, heading, desc, className, noBorder, disabled, setupObsidianSettingManually, children, }) => {
    const containerRef = useRef(null);
    const obsidianSettingRef = useRef(null);
    useLayoutEffect(() => {
        if (window.OSETTING_DISABLE_STYLES === 'true') {
            return;
        }
        StyleManager.getInstance().addStyle(OSETTING_STYLES_ID, OSETTING_CSS);
        return () => {
            StyleManager.getInstance().removeStyle(OSETTING_STYLES_ID);
        };
    }, []);
    useLayoutEffect(() => {
        if (!setupObsidianSettingManually || !containerRef.current) {
            return;
        }
        obsidianSettingRef.current?.clear();
        obsidianSettingRef.current = new Setting(containerRef.current);
        name && obsidianSettingRef.current.setName(name);
        heading && obsidianSettingRef.current.setHeading();
        desc && obsidianSettingRef.current.setDesc(descToFragment(desc));
        className && obsidianSettingRef.current.setClass(className);
        setupObsidianSettingManually(obsidianSettingRef.current);
        disabled && obsidianSettingRef.current.setDisabled(disabled);
        return () => {
            obsidianSettingRef.current?.clear();
            obsidianSettingRef.current = null;
        };
    }, [setupObsidianSettingManually, name, heading, desc, className]);
    if (setupObsidianSettingManually) {
        return (_jsx("div", { className: 'osetting-item', children: _jsx("div", { ref: containerRef }) }));
    }
    return (_jsx("div", { className: `osetting-item ${noBorder ? 'no-border' : ''} ${className ?? ''}`, children: _jsxs("div", { className: `setting-item ${heading ? 'setting-item-heading' : ''}`, children: [_jsxs("div", { className: 'setting-item-info', children: [name && _jsx("div", { className: 'setting-item-name', children: name }), desc && (_jsx("div", { className: 'setting-item-description', children: typeof desc === 'string'
                                ? desc
                                : desc.map((line, i) => (_jsx("div", { children: line }, i))) }))] }), _jsx("div", { className: 'setting-item-control', children: WrapElements(children, disabled) })] }) }));
};
export default OSetting;
