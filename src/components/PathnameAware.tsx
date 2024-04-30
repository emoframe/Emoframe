"use client";

import { FC } from 'react';
import { usePathname } from 'next/navigation';

interface PathnameAwareComponentProps {
  defaultContent: React.ReactNode;
  specialContent: React.ReactNode;
  ignorePaths: string | string[];
}

const PathnameAware: FC<PathnameAwareComponentProps> = ({
  defaultContent,
  specialContent,
  ignorePaths
}) => {
  const pathname = usePathname();

  const isPathIgnored = (path: string | null, pathsToIgnore: string | string[]): boolean => {
    if (!path) return false;
    if (Array.isArray(pathsToIgnore)) {
      return pathsToIgnore.some(ignorePath => path?.startsWith(ignorePath));
    }
    return path?.startsWith(pathsToIgnore);
  };

  if (pathname === null) return null; // Não renderiza até que o pathname esteja disponível

  // Decide qual conteúdo renderizar com base no pathname
  if (isPathIgnored(pathname, ignorePaths)) {
    return <>{specialContent}</>; // Renderiza o conteúdo especial para caminhos ignorados
  }

  return <>{defaultContent}</>;
};

export default PathnameAware;
