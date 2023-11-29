import React from 'react'

import {
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
  } from '@chakra-ui/react';

import { Box } from '@chakra-ui/react';
  
export interface Step {
    title: string;
    description: string;
}

export interface StepperProps {
    steps: Step[];
    activestep: number;
    colorScheme: string;
}

const StepperComp = ({steps, activestep, colorScheme}: StepperProps) => (
    <Stepper index={activestep} colorScheme={colorScheme}>
        {steps.map(({title, description}, index) => (
            <Step key={index}>
                <StepIndicator bg="black">
                    <StepStatus
                        complete={<StepIcon color="white"/>}
                        incomplete={<StepNumber className="text-white" />}
                        active={<StepNumber className="text-white"/>}
                    />
                </StepIndicator>

                <Box flexShrink='0'>
                    <StepTitle>{title}</StepTitle>
                    <StepDescription>{description}</StepDescription>
                </Box>
                <StepSeparator />
            </Step>
        ))}
    </Stepper>
)

export { StepperComp }