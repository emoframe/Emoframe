"use client";
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { User } from "@/types/users";
import { ColumnDef, RowData, SortingFn, sortingFns } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { compareItems } from "@tanstack/match-sorter-utils";
import Link from "next/link";
import { createQueryString } from "@/lib/utils";

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

const translateGender = (gender, t) => {
  const genderMap = {
    "Feminino": t("Feminino"),
    "Masculino": t("Masculino"),
    "Não sei/Prefiro não dizer": t("Não sei/Prefiro não dizer"),
    "Outro": t("Outro")
  };
  return genderMap[gender] || gender;
}

const translateRace = (race, t) => {
  const raceMap = {
    "Amarelo": t("Amarelo"),
    "Branco": t("Branco"),
    "Indígena": t("Indígena"),
    "Pardo": t("Pardo"),
    "Preto": t("Preto")
  };
  return raceMap[race] || race;
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
    meta: { name: "Nome Completo" },
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          <ArrowUpDown className="mr-2 h-4 w-4" />
          {t('Nome Completo')}
        </Button>
      );
    },
    cell: info => info.getValue(),
    footer: props => props.column.id,
    filterFn: 'fuzzy',
    sortingFn: fuzzySort,
  },
  {
    accessorKey: "email",
    id: "email",
    meta: { name: "E-mail" },
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          <ArrowUpDown className="mr-2 h-4 w-4" />
          {t('E-mail')}
        </Button>
      );
    },
  },
  {
    accessorKey: "gender",
    id: "gender",
    meta: { name: "Gênero" },
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          <ArrowUpDown className="mr-2 h-4 w-4" />
          {t('Gênero')}
        </Button>
      );
    },
    cell: info => {
      const { t } = useTranslation();
      return translateGender(info.getValue(), t);
    }
  },
  {
    accessorKey: "race",
    id: "race",
    meta: { name: "Etnia" },
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          <ArrowUpDown className="mr-2 h-4 w-4" />
          {t('Etnia')}
        </Button>
      );
    },
    cell: info => {
      const { t } = useTranslation();
      return translateRace(info.getValue(), t);
    }
  },
  {
    accessorKey: "birthday",
    id: "birthday",
    meta: { name: "Aniversário" },
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          <ArrowUpDown className="mr-2 h-4 w-4" />
          {t('Aniversário')}
        </Button>
      );
    },
  },
  {
    id: "actions",
    meta: { name: "Ações" },
    cell: ({ row }) => {
      const { t } = useTranslation();
      const person = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{t('Ações')}</DropdownMenuLabel>
            <Link href={"/specialist/set-forms" + "?" + createQueryString("uid", person.uid!)}>
              <DropdownMenuItem>
                {t('Definir form')}
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(person.name.toString());
              }}
            >
              {t('Copiar nome')}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(person.uid!.toString());
              }}
            >
              {t('Copiar ID')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
