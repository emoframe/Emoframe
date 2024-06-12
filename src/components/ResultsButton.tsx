import React, { FC, ReactElement, cloneElement } from "react";
import useUser from "./hooks/useUser";
import { useRouter } from "next/router";
import { Evaluation } from "@/types/forms";

interface ResultsButtonProps {
  evaluation: Evaluation;
  children: ReactElement;
  successPath: string;
  failurePath: string;
}

const ResultsButton: FC<ResultsButtonProps> = ({ evaluation, children, successPath, failurePath }) => {
  const { addEvaluation } = useUser();
  const router = useRouter();

  const handleResults = async () => {
    if (addEvaluation && evaluation) {
      addEvaluation(evaluation);
      await router.push(successPath);
    } else {
      await router.push(failurePath);
    }
  };

  const clonedChildren = cloneElement(children, {
    onClick: handleResults
  });

  return clonedChildren;
};

export default ResultsButton;