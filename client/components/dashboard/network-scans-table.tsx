'use client'

import { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react'

interface NetworkScan {
  id: string
  ssid: string
  type: 'wifi' | 'bluetooth' | 'network'
  security: string
  signal: number
  timestamp: string
}

const mockData: NetworkScan[] = [
  { id: '1', ssid: 'Office_Network', type: 'wifi', security: 'WPA3', signal: -45, timestamp: '2m ago' },
  { id: '2', ssid: 'Guest_WiFi', type: 'wifi', security: 'Open', signal: -67, timestamp: '2m ago' },
  { id: '3', ssid: 'iPhone 13', type: 'bluetooth', security: 'Paired', signal: -55, timestamp: '3m ago' },
  { id: '4', ssid: '192.168.1.1', type: 'network', security: 'Router', signal: -30, timestamp: '1m ago' },
  { id: '5', ssid: 'MyWiFi_5G', type: 'wifi', security: 'WPA2', signal: -52, timestamp: '2m ago' },
  { id: '6', ssid: 'AirPods Pro', type: 'bluetooth', security: 'LE', signal: -58, timestamp: '4m ago' },
  { id: '7', ssid: '192.168.1.100', type: 'network', security: 'Desktop', signal: -35, timestamp: '1m ago' },
  { id: '8', ssid: 'TP-Link_5G', type: 'wifi', security: 'WPA3', signal: -61, timestamp: '3m ago' },
]

const columns: ColumnDef<NetworkScan>[] = [
  {
    accessorKey: 'ssid',
    header: 'Network/Device',
    cell: ({ row }) => {
      const isAlert = row.original.security === 'Open'
      return (
        <div className="flex items-center gap-2">
          {isAlert && <AlertTriangle className="h-4 w-4 text-destructive" />}
          <span className="font-medium">{row.getValue('ssid')}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type') as string
      return <span className="capitalize text-muted-foreground">{type}</span>
    },
  },
  {
    accessorKey: 'security',
    header: 'Security',
    cell: ({ row }) => {
      const security = row.getValue('security') as string
      const isInsecure = security === 'Open'
      return (
        <span className={isInsecure ? 'text-destructive font-medium' : ''}>
          {security}
        </span>
      )
    },
  },
  {
    accessorKey: 'signal',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2"
        >
          Signal
          {column.getIsSorted() === 'asc' ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ChevronDown className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      )
    },
    cell: ({ row }) => {
      const signal = row.getValue('signal') as number
      const strength = signal > -50 ? 'Strong' : signal > -70 ? 'Fair' : 'Weak'
      return (
        <div className="text-sm">
          <span className="text-muted-foreground">{signal} dBm</span>
          <span className="ml-2 text-xs">({strength})</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'timestamp',
    header: 'Detected',
  },
]

export function NetworkScansTable() {
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data: mockData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    state: {
      globalFilter,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  })

  const selectedCount = Object.keys(rowSelection).length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Scans</CardTitle>
            <CardDescription>
              Networks and devices discovered in recent scans
            </CardDescription>
          </div>
          {selectedCount > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedCount} selected
              </span>
              <Button variant="outline" size="sm">
                Export
              </Button>
              <Button variant="outline" size="sm">
                Delete
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Filter */}
          <div className="flex items-center gap-2">
            <Input
              placeholder="Filter by name, type, or security..."
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="max-w-sm"
            />
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
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
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No scans found. Start a scan to see results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {table.getFilteredRowModel().rows.length} result(s)
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
