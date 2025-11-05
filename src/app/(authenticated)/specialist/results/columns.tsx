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
import { useTranslation } from "react-i18next";

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

const renderFullNameHeader = ({ column }) => {
  const { t } = useTranslation('specialist_results');
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      <ArrowUpDown className="mr-2 h-4 w-4"/>
      {t('columnFullName')}
    </Button>
  );
}

const renderActionsCell = ({ row }) => {
  const result = row.original;
  const { t } = useTranslation('specialist_results');
  return (
    <ResultsButton
      evaluation={result.evaluation}
      user={result.user}
      successPath="/specialist/evaluations/results/answer"
    >
      <Button
          variant="default"
          size="sm"
      >
        {t('actionsOptionView')}
      </Button>
    </ResultsButton>
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
    id: 'columnEmail',
    header: () => {
      const { t } = useTranslation('specialist_results');
      return t('columnEmail');
    },
    meta: { name: "E-mail" },
    accessorFn: row => row.user.email,
  },
  {
    id: 'columnEvaluation',
    header: () => {
      const { t } = useTranslation('specialist_results');
      return t('columnEvaluation');
    },
    meta: { name: "Identificação" },
    accessorFn: row => row.evaluation.identification,
  },
  {
    id: 'columnInstrument',
    header: () => {
      const { t } = useTranslation('specialist_results');
      return t('columnInstrument');
    },
    meta: { name: "Instrumento" },
    accessorFn: row => (row.evaluation.instrument !== "template") ? 
      instruments.find((instrument) => instrument.value === row.evaluation.instrument)?.label : 
      "Template",
  },
  {
    id: 'columnDate',
    header: () => {
      const { t } = useTranslation('specialist_results');
      return t('columnDate');
    },
    meta: { name: "Data da Resposta" },
    accessorFn: row => format(new Date(row.answer.datetime ?? ''), "dd/MM/yyyy HH:mm:ss"),
  },
  {
    id: "actions",
    meta: { name: "Ações" },
    cell: renderActionsCell,
  },
];
