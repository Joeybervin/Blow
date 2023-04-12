import React, { useEffect } from "react";
import { CustomProps } from '@/interfaces'
import Image from "next/image";
import { CldImage } from "next-cloudinary";

export const CurentWeatherHighlight:React.FC<CustomProps> = ( {data, dataContainerCustomClassName, mainDataCustomClassName, unit, title } : CustomProps ) => {
    

    
    return (
        <div className="flex-auto h-fit w-100 border-current border-2 rounded-lg p-3">
            {
                title === undefined ?

                null 
                :
                <header className='text-xs sm:tesxt-sm text-primary-content font-black  mb-2'>
                    <p className='line-clamp-2'>{title}</p>
                </header>

            }
            <div className='flex divide-x-2 divide-gray-700'>
                {data!.map((item, index) => {
                    return (
                        <div className={`flex justify-center items-center flex-1 ${dataContainerCustomClassName} text-center px-2 my-auto`} key={index}>
                            { item.imgSrc.includes('uv-index') ? 
                                <CldImage format={"svg"} width="55" height="55" className="" src={`Blow/${item.imgSrc}`}  alt={item.imgSrc} />
                                : 
                                <Image src={`/icons/weather/${item.imgSrc}.svg`} width={55} height={55} alt={item.imgSrc} />
                            }
                            
                            <div>
                                <p className={`text-xs sm:text-md font-black font-secondary-content mb-1 ${mainDataCustomClassName} `}>
                                    {item.mainData}
                                    {
                                        unit === undefined ?
                                        null
                                        : 
                                        <span className='align-top text-xs font-normal'>{unit}</span>
                                    }
                                </p>
                                <p className='text-xs'>{item.data}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    )
};
