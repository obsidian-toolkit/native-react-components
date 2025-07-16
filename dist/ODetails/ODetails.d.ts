import { FC, PropsWithChildren } from 'react';
interface ODetailsProps {
    name?: string;
    desc?: string;
    defaultExpanded?: boolean;
    expanded?: boolean;
    onToggle?: (opened: boolean) => void;
    className?: string;
}
declare const ODetails: FC<PropsWithChildren<ODetailsProps>>;
export default ODetails;
