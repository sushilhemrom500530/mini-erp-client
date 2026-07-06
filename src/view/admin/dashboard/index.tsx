import React from 'react';
import { SalesSummary, StatCard } from '../../../Components/reuseable/common-card/index.js';

const LowStockTable = () => (
    <div className="rounded-xl  border border-slate-200 bg-white p-6 h-full">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">📦 Low Stock Products</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 rounded-lg">
                    <tr>
                        <th className="px-4 py-3 rounded-l-lg">Product Name</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Stock Limit</th>
                        <th className="px-4 py-3">Current Stock</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 font-medium text-gray-900">Napa 500mg</td>
                        <td className="px-4 py-4">Medicine</td>
                        <td className="px-4 py-4">20</td>
                        <td className="px-4 py-4 text-red-600 font-bold">5</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 font-medium text-gray-900">Savlon Antiseptic</td>
                        <td className="px-4 py-4">First Aid</td>
                        <td className="px-4 py-4">15</td>
                        <td className="px-4 py-4 text-orange-500 font-bold">12</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 font-medium text-gray-900">Surgical Mask Box</td>
                        <td className="px-4 py-4">Equipment</td>
                        <td className="px-4 py-4">50</td>
                        <td className="px-4 py-4 text-red-600 font-bold">10</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);


export default function Dashboard() {
    return (
        <div>
            <div className="space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Welcome Back 👋 Sushil
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Inventory & Sales Overview
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-sm text-gray-500">
                            Tuesday
                        </p>

                        <h3 className="font-semibold">
                            July 07, 2026
                        </h3>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    <StatCard title="Products" amount='350' icon="📦" />
                    <StatCard title="Sales" amount='210' icon="💰" />
                    <StatCard title="Low Stock" amount='65' icon="⚠️" />
                </div>

                {/* Tables */}
                <div className="grid gap-6 xl:grid-cols-3">
                    <div className="xl:col-span-2">
                        <LowStockTable />
                    </div>
                    <SalesSummary />
                </div>

            </div>
        </div>
    )
}
