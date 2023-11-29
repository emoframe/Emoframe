import React from 'react'
import { CircularProgress } from '@nextui-org/react';

export interface LoadingProps {
    label: string;
}

const LoadingComp = ({label} : LoadingProps) => (
    <CircularProgress isIndeterminate label={label} className="flex flex-col flex-wrap justify-around" />
)

export { LoadingComp }