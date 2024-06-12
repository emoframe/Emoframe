import { FC, ReactElement, cloneElement } from "react";
import useUser from "./hooks/useUser";
import { useRouter } from "next/router";
import { Evaluation } from "@/types/forms";
import { User } from "@/types/users";

type AtLeastOne<T, K extends keyof T> = Partial<T> & { [P in K]: T[P] };

type BaseProps = {
  children: ReactElement;
  successPath: string;
  failurePath?: string;
}

type ResultsButtonProps = BaseProps & (
  | { evaluation: Evaluation; user?: never }
  | { evaluation?: never; user: User }
);

const ResultsButton: FC<ResultsButtonProps> = ({
  evaluation,
  user,
  children,
  successPath,
  failurePath = '/denied'
}) => {
  const { addEvaluation, addUser } = useUser();
  const router = useRouter();

  const handleResults = async () => {
    if (evaluation && addEvaluation) {
      addEvaluation(evaluation);
      await router.push(successPath);
    } else if (user && addUser) {
      addUser(user);
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