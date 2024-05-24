"use client";

import {
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  FilterFn,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  RankingInfo,
  rankItem,
} from '@tanstack/match-sorter-utils'

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableProps } from '@/types/forms';

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

interface UsersState {
  onSelect: (currentValue: string[]) => void,
  selectedRowIds?: Record<string, boolean>, // Armazenando quais linhas estão selecionadas
  onSelectionChange?: (selectedRowIds: Record<string, boolean>) => void; // Novo método para atualizar o estado de seleção
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

export function UserDataTable<TData, TValue>( 
  { data, columns, onSelect, selectedRowIds, onSelectionChange } : DataTableProps<TData, TValue> & UsersState) {

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState([]);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>(selectedRowIds || {});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      globalFilter,
      columnVisibility,
      rowSelection: selectedRowIds, // Use o estado externo como parte do estado interno
    },
  });

  const length = table.getFilteredSelectedRowModel().rows.length;
  useEffect(() => {
    const uids = table.getFilteredSelectedRowModel().flatRows.map(({ original }) => original.uid);
    onSelect(uids ? uids : []);
  }, [length])

  // Exportar mudanças para fora do componente
  useEffect(() => {
    onSelectionChange && onSelectionChange(rowSelection);
  }, [rowSelection, onSelectionChange]);

  // Importar mudanças para dentro do componente
  useEffect(() => {
    setRowSelection(selectedRowIds || {});
  }, [selectedRowIds]);

  return (
    <div>
      <div className="flex items-center pb-4 gap-4">
        {/* input */}
        <Input
          placeholder="Pesquise qualquer campo"
          value={globalFilter ?? ''}
          onChange={(e) => {
           setGlobalFilter(e.target.value);
          }}
        />
      </div>

      {/* table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className={row.getIsSelected() ? 'selected-row' : ''}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  Sem resultados
                </TableCell>
              </TableRow>
              )}
          </TableBody>
        </Table>
      </div>
      {/* pagination */}
      <div className="flex items-center justify-start space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
        >
          Próximo
        </Button>
      </div>
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} de{" "}
        {table.getFilteredRowModel().rows.length} linha(s) selecionada(s)
      </div>
    </div>
  );
}

export default UserDataTable;
