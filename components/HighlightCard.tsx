import React from "react";

interface HightlightCardProps {
    title : string;
    children: React.ReactNode;
}

const CurentWeatherHighlight = ({title, children} : HightlightCardProps) => {
    return (
        <div className="flex-auto sm:flex-initial min-w-1/2 border-current border-2 rounded-lg p-3">
            <header className='text-sm sm:text-base text-primary font-black p-1 mb-2'>
                <p className='line-clamp-2'>{title}</p>
            </header>
            {children}
        </div>

    )
};

const WeekWeatherHighlight = ({title, children} : HightlightCardProps) => {
    return (
        <div className="">
            <p>week</p>
        </div>

    )
};

export {CurentWeatherHighlight, WeekWeatherHighlight};
