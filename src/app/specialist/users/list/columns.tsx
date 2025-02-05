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
import { ArrowUpDown, MoreHorizontal, Router } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { compareItems } from "@tanstack/match-sorter-utils";
import { useTranslation } from "react-i18next";

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
      const { t } = useTranslation('specialist_users_view');
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          <ArrowUpDown className="mr-2 h-4 w-4" />
          {t('columnFullName')}   
        </Button>
      );
    },
    cell: info => info.getValue(),
    footer: props => props.column.id,
    filterFn: 'fuzzy',
    sortingFn: fuzzySort,
  },
  {
    header: () => {
      const { t } = useTranslation('specialist_users_view');
      return t('columnEmail')
    },
    meta: {name: "E-mail"},
    accessorKey: "email",
  },
  {
    header: () => {
      const { t } = useTranslation('specialist_users_view');
      return t('columnGender')
    },
    meta: {name: "Gênero"},
    accessorKey: "gender",
  },
  {
    header: () => {
      const { t } = useTranslation('specialist_users_view');
      return t('columnEthnicity')
    },
    meta: {name: "Etnia"},
    accessorKey: "race",
  },
  {
    header: () => {
      const { t } = useTranslation('specialist_users_view');
      return t('columnBirthDate')
    },
    meta: {name: "Data de Nascimento"},
    accessorKey: "birthday",
  },
  {
    id: "actions",
    meta: {name: "actionsLabel"},

    cell: ({ row }) => {
      const person = row.original;
      const { t } = useTranslation('specialist_users_view');
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{t('actionsLabel')}</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(person.name.toString());
              }}
            >
              {t('actionsCopyName')}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(person.uid!.toString());
              }}
            >
              {t('actionsCopyId')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
