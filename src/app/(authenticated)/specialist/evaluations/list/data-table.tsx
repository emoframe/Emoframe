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

import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { DataTableProps } from "@/types/forms";
import { useTranslation } from "react-i18next";

declare module '@tanstack/table-core' {
    interface FilterFns {
        fuzzy: FilterFn<unknown>
    }
    interface FilterMeta {
        itemRank: RankingInfo
    }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({ itemRank })
    return itemRank.passed
}

export function EvaluationsDataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = React.useState('');
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  
    const [pageSize, setPageSize] = React.useState(5); 

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
        initialState: {
            pagination: { pageSize },
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            globalFilter,
            columnVisibility,
            rowSelection,
        },
    });

    const rows = table.getRowModel().rows;
    const emptyRows = pageSize - rows.length;

    const { t } = useTranslation('specialist_evaluations_view');

    return (
        <div className="flex flex-col h-full w-full space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
                <Input
                    placeholder={t('searchPlaceholder')}
                    value={globalFilter ?? ''}
                    onChange={(e) => {
                        setGlobalFilter(e.target.value);
                    }}
                    className="w-full sm:max-w-sm"
                />

                <Link 
                    className={`${buttonVariants({ variant: "default" })} w-full sm:w-auto`} 
                    href="/specialist/evaluations/form"
                >
                    {t('createLabel')}
                </Link>
            </div>

            {/* Título */}
            <h3 className='text-xl font-semibold leading-none tracking-tight'>{t('title')}</h3>
            
            <div className="rounded-md border flex-1 overflow-hidden flex flex-col">
                <div className="overflow-x-auto w-full h-full">
                    <Table className="h-full min-w-[600px] sm:min-w-full">
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

                        <TableBody className="border-t">
                            {rows.length ? (
                                <>
                                    {rows.map((row) => (
                                        <TableRow key={row.id} className="h-[calc(100%/5)]">
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                    {Array.from({ length: emptyRows }).map((_, index) => (
                                        <TableRow key={`empty-${index}`} className="h-[calc(100%/5)]">
                                            <TableCell colSpan={columns.length} />
                                        </TableRow>
                                    ))}
                                </>
                            ) : (
                                <TableRow className="h-24 text-center">
                                    <TableCell colSpan={columns.length} className="h-full justify-center">
                                        Sem resultados
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 py-2">
                <div className="text-sm text-muted-foreground text-center sm:text-left">
                    {t('selectedRows', {
                        selected: table.getFilteredSelectedRowModel().rows.length, 
                        total: table.getFilteredRowModel().rows.length
                    })}
                </div>
                
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {t('previousLabel')}
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {t('nextLabel')}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default EvaluationsDataTable;