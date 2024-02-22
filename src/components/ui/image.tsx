import * as React from 'react'
import Image, { StaticImageData } from 'next/image'

export interface ImageCardProps {
    src: StaticImageData | string,
    alt: string, 
    width: number,
    height: number,
}

const ImageCard = ({src, alt, width, height}: ImageCardProps) => {
    return (
        <div className="rounded-sm">
            <Image 
                src={src}
                width={width}
                height={height}
                alt={alt} 
            />
        </div>
    )
};

export { ImageCard }