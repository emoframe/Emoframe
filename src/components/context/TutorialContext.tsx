"use client"

import {createContext, Dispatch, SetStateAction, useContext} from 'react'

interface TutorialContextType{
  showTutorial: boolean;
  setTutorial: Dispatch<SetStateAction<boolean>>;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

const defaultContextValue : TutorialContextType = {
  showTutorial: false,
  setTutorial : () => {},
  currentStep: 0,
  setCurrentStep: () => {}
}

export const TutorialContext = createContext<TutorialContextType>(defaultContextValue);
export const useTutorial = () => useContext(TutorialContext);