import React from "react";

export function UserTableSkeleton() {
  return (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <tr key={i} className="animate-pulse">
          <td className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700" />
              <div className="space-y-1.5">
                <div className="w-28 h-3.5 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="w-36 h-2.5 bg-slate-100 dark:bg-slate-800 rounded" />
              </div>
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="w-20 h-4 bg-slate-200 dark:bg-slate-700 rounded" />
          </td>
          <td className="px-6 py-4">
            <div className="w-24 h-4 bg-slate-100 dark:bg-slate-800 rounded" />
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center gap-1.5">
              <div className="w-16 h-5 rounded-md bg-slate-200 dark:bg-slate-700" />
              <div className="w-16 h-5 rounded-md bg-slate-200 dark:bg-slate-700" />
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="w-14 h-5 rounded-full bg-slate-200 dark:bg-slate-700" />
          </td>
          <td className="px-6 py-4 text-right">
            <div className="flex justify-end space-x-2">
              <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700" />
              <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

export function ProductCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm animate-pulse space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700" />
              <div className="space-y-1.5">
                <div className="w-24 h-4 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="w-16 h-3 bg-slate-100 dark:bg-slate-800 rounded" />
              </div>
            </div>
            <div className="w-16 h-6 rounded-full bg-slate-200 dark:bg-slate-700" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="w-20 h-3 bg-slate-100 dark:bg-slate-800 rounded" />
              <div className="w-12 h-3 bg-slate-100 dark:bg-slate-800 rounded" />
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800" />
          </div>

          <div className="pt-2">
            <div className="w-full h-8 rounded-xl bg-slate-100 dark:bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
