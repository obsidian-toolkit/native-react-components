import React, { ReactPortal } from 'react';
interface OModalProps {
    children: React.ReactNode;
    title: string;
    onClose: () => void;
    onOpen?: () => void;
    width?: string;
    height?: string;
    maxWidth?: string;
    maxHeight?: string;
    className?: string;
    closable?: boolean;
}
declare const OModal: ({ children, title, onOpen, onClose, maxHeight, maxWidth, width, height, closable, className, }: OModalProps) => ReactPortal;
export default OModal;
