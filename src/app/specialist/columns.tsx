"use client";
import { Button } from "@/components/ui/button";
import { User } from "@/types/users";
import { ColumnDef, RowData, SortingFn, sortingFns } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { compareItems } from "@tanstack/match-sorter-utils";

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

export const columns: ColumnDef<User>[] = [
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
    accessorFn: row => `${row.name} ${row.surname}`,
    id: 'fullName',
    meta: {name: "Nome Completo"},
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Nome Completo   
        </Button>
      );
    },
    cell: info => info.getValue(),
    footer: props => props.column.id,
    filterFn: 'fuzzy',
    sortingFn: fuzzySort,
  },
  {
    header: "E-mail",
    meta: {name: "E-mail"},
    accessorKey: "email",
  },
  {
    header: "Gênero",
    meta: {name: "Gênero"},
    accessorKey: "gender",
  },
  {
    header: "Etnia",
    meta: {name: "Etnia"},
    accessorKey: "race",
  },
  {
    header: "Aniversário",
    meta: {name: "Aniversário"},
    accessorKey: "birthday",
  },
  {
    header: "ID",
    meta: {name: "ID"},
    accessorKey: "uid",
  },
  {
    id: "actions",
    meta: {name: "Ações"},

    cell: ({ row }) => {
      const person = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(person.name.toString());
              }}
            >
              Copiar nome
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(person.uid!.toString());
              }}
            >
              Copiar ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
