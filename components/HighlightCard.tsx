import React from "react";
import { HightlightCardProps } from '@/interfaces'
import Image from "next/image";

export const CurentWeatherHighlight = ({ title, children }: HightlightCardProps) => {
    return (
        <div className="flex-auto sm:flex-initial min-w-1/2 border-current border-2 rounded-lg p-3">
            <header className='text-sm sm:text-base text-primary font-black p-1 mb-2'>
                <p className='line-clamp-2'>{title}</p>
            </header>
            {children}
        </div>

    )
};
export const CurentWeatherHighlightDouble = ({ title, data, imgSrc }: HightlightCardProps) => {
    return (
        <div className="flex-auto sm:flex-initial min-w-1/2 border-current border-2 rounded-lg p-3">
            <div className='flex divide-x-2 divide-gray-700'>
                <div className='flex-1 text-center px-2'>
                    <Image className='mx-auto' src={`${imgSrc}`} width={55} height={55} alt={title} />
                    <p className='text--xs sm:text-md font-black'>{title}</p>
                    <p className='text-xs'>{data}</p>
                </div>
                <div className='flex-1 text-center px-2'>
                    <Image className='mx-auto' src={`${imgSrc}`} width={55} height={55} alt={title} />
                    <p className='text--xs sm:text-md font-black'>{title}</p>
                    <p className='text-xs'>{data}</p>
                </div>


            </div>

        </div>

    )
};
export const CurentWeatherHighlightTriple = ({ title, data, imgSrc }: HightlightCardProps) => {
    return (
        <div className="flex-auto sm:flex-initial min-w-1/2 border-current border-2 rounded-lg p-3">
            <div className='flex divide-x-2 divide-gray-700'>
                <div className='flex-1 text-center px-2'>
                    <Image className='mx-auto' src={`${imgSrc}`} width={55} height={55} alt={title} />
                    <p className='text--xs sm:text-md font-black'>{title}</p>
                    <p className='text-xs'>{data}</p>
                </div>
                <div className='flex-1 text-center px-2'>
                    <Image className='mx-auto' src={`${imgSrc}`} width={55} height={55} alt={title} />
                    <p className='text--xs sm:text-md font-black'>{title}</p>
                    <p className='text-xs'>{data}</p>
                </div>
                <div className='flex-1 text-center px-2'>
                    <Image className='mx-auto' src={`${imgSrc}`} width={55} height={55} alt={title} />
                    <p className='text--xs sm:text-md font-black'>{title}</p>
                    <p className='text-xs'>{data}</p>
                </div>

            </div>

        </div>

    )
};

export const WeekWeatherHighlight = ({ title, children }: HightlightCardProps) => {
    return (
        <div className="">
            <p>week</p>
        </div>

    )
};

