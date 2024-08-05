"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef, RowData, SortingFn, sortingFns } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { compareItems } from "@tanstack/match-sorter-utils";
import { Result, instruments } from "@/types/forms";
import { format } from 'date-fns';
import ResultsButton from "@/components/ResultsButton";

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    name: string;
  }
}

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    );
  }

  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
}

const renderFullNameHeader = ({ column }) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    <ArrowUpDown className="mr-2 h-4 w-4"/>
    Nome do Usuário
  </Button>
);

const renderActionsCell = ({ row }) => {
  const result = row.original;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-8 h-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <ResultsButton
            evaluation={result.evaluation}
            user={result.user}
            successPath="/specialist/evaluations/results/answer"
          >
            <DropdownMenuItem>
              Ver resultado
            </DropdownMenuItem>
          </ResultsButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Result>[] = [
  {
    accessorFn: row => `${row.user.name} ${row.user.surname}`,
    id: 'fullName',
    meta: { name: "Nome Completo" },
    header: renderFullNameHeader,
    cell: info => <span className="pl-4">{`${info.getValue()}`}</span>,
    footer: props => props.column.id,
    filterFn: 'fuzzy',
    sortingFn: fuzzySort,
  },
  {
    header: "E-mail",
    meta: { name: "E-mail" },
    accessorFn: row => row.user.email,
  },
  {
    header: "Identificação",
    meta: { name: "Identificação" },
    accessorFn: row => row.evaluation.identification,
  },
  {
    header: "Instrumento",
    meta: { name: "Instrumento" },
    accessorFn: row => (row.evaluation.instrument !== "template") ? 
      instruments.find((instrument) => instrument.value === row.evaluation.instrument)?.label : 
      "Template",
  },
  {
    header: "Data da Resposta",
    meta: { name: "Data da Resposta" },
    accessorFn: row => format(new Date(row.answer.datetime ?? ''), "dd/MM/yyyy HH:mm:ss"),
  },
  {
    id: "actions",
    meta: { name: "Ações" },
    cell: renderActionsCell,
  },
];
