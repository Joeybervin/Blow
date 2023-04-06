
interface Data {
    imgSrc : string;
    mainData: string;
    data: string;
}

export interface HightlightCardProps {
    title? : string
    children?: React.ReactNode;
    data? : Data[];
    unit? : string ;
};

export interface CustomProps extends HightlightCardProps {
    dataContainerCustomClassName?: string;
    mainDataCustomClassName? : string;
    
}
