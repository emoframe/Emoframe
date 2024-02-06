"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef, RowData, SortingFn, sortingFns } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal, Router } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { compareItems } from "@tanstack/match-sorter-utils";
import Link from "next/link";
import { createQueryString } from "@/lib/utils";
import { Evaluation } from "@/types/forms";

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    name: string;
  }
}

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    )
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}

export const columns: ColumnDef<Evaluation>[] = [
  {
    id: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
          }}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorFn: row => row.identification,
    id: 'identification',
    meta: {name: "Identificação"},
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Identificação   
        </Button>
      );
    },
    cell: info => <span className="pl-4">{`${info.getValue()}`}</span>,
    footer: props => props.column.id,
    filterFn: 'fuzzy',
    sortingFn: fuzzySort,
  },
  {
    accessorFn: row => row.instrument,
    id: 'instrument',
    meta: {name: "Instrumento"},
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Instrumento   
        </Button>
      );
    },
    cell: info => <span className="pl-4">{`${info.getValue()}`}</span>,
    footer: props => props.column.id,
    filterFn: 'fuzzy',
    sortingFn: fuzzySort,
  },
  {
    accessorFn: row => row.method,
    id: 'method',
    meta: {name: "Método"},
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Método   
        </Button>
      );
    },
    cell: info => <span className="pl-4">{`${info.getValue()}`}</span>,
    footer: props => props.column.id,
    filterFn: 'fuzzy',
    sortingFn: fuzzySort,
  },
  {
    header: "Data da Avaliação",
    meta: {name: "Data da Avaliação"},
    accessorKey: "date",
  }
];