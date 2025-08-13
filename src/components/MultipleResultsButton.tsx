import { FC, ReactElement, cloneElement } from "react";
import useUser from "./hooks/useUser";
import { useRouter } from "next/navigation";
import { Answer, Evaluation } from "@/types/forms";
import { User } from "@/types/users";

type BaseProps = {
    children: ReactElement;
    successPath: string;
    failurePath?: string;
}

type ResultsButtonProps = BaseProps & (
    | { users: User[] }
);

const ResultsButton: FC<ResultsButtonProps> = ({
    users,
    children,
    successPath,
    failurePath = '/denied'
}) => {
    const { addUsers } = useUser();
    const router = useRouter();

    const handleResults = async () => {
        console.log(users);
        addUsers(users);
        router.push(successPath);
    };

    const clonedChildren = cloneElement(children, {
        onClick: handleResults
    });

    return clonedChildren;
};

export default ResultsButton;