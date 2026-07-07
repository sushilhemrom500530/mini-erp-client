import { Table, Input, Select, Button, Space, Tooltip, ConfigProvider } from 'antd';
import { Plus, Search, Eye, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useGetProductsQuery } from '../../../redux/features/product/index.js';

export default function ProductsContent() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");

    const { data, isLoading } = useGetProductsQuery({
        page,
        limit,
        searchTerm,
        category,
    });

    const productData = data?.data?.results || [];
    const meta = data?.data?.meta;


    const columns = [
        {
            title: 'Image',
            dataIndex: 'productImage',
            key: 'image',
            render: (img: string) => (
                <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                    <img src={img} alt="product" className="object-cover w-full h-full" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/40' }} />
                </div>
            )
        },
        {
            title: 'Product',
            dataIndex: 'productName',
            key: 'productName',
            className: 'font-medium text-gray-900'
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
            className: 'text-gray-500 text-sm'
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category'
        },
        {
            title: 'Buy',
            dataIndex: 'purchasePrice',
            key: 'buy',
            render: (val: number) => `$${val}`
        },
        {
            title: 'Sell',
            dataIndex: 'sellingPrice',
            key: 'sell',
            render: (val: number) => `$${val}`
        },
        {
            title: 'Stock',
            dataIndex: 'stockQuantity',
            key: 'stock',
            render: (val: number) => (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${val < 15 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                    {val}
                </span>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: () => (
                <Space size="small">
                    <Tooltip title="View">
                        <Button type="text" size="small" icon={<Eye className="w-4 h-4 text-blue-600" />} />
                    </Tooltip>
                    <Tooltip title="Edit">
                        <Button type="text" size="small" icon={<Edit className="w-4 h-4 text-amber-600" />} />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button type="text" size="small" icon={<Trash2 className="w-4 h-4 text-red-600" />} danger />
                    </Tooltip>
                </Space>
            )
        }
    ];

    return (
        <>

            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <Input
                    placeholder="Search Product..."
                    prefix={<Search className="w-4 h-4 text-gray-400" />}
                    className="max-w-md h-10"
                    allowClear
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setPage(1);
                    }}
                />

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Select
                        defaultValue="all"
                        className="w-full sm:w-40 h-10 [&>.ant-select-selector]:!h-10 [&>.ant-select-selector]:!items-center"
                        options={[
                            { value: 'all', label: 'All Categories' },
                            { value: 'smartphones', label: 'Smartphones' },
                            { value: 'laptops', label: 'Laptops' },
                            { value: 'accessories', label: 'Accessories' }
                        ]}
                    />
                    <Select
                        defaultValue="all"
                        className="w-full sm:w-40 h-10 [&>.ant-select-selector]:!h-10 [&>.ant-select-selector]:!items-center"
                        options={[
                            { value: 'all', label: 'All Status' },
                            { value: 'in-stock', label: 'In Stock' },
                            { value: 'low-stock', label: 'Low Stock' },
                            { value: 'out-of-stock', label: 'Out of Stock' }
                        ]}
                    />
                </div>
            </div>


            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                headerBg: '#f8fafc',
                                headerColor: '#475569',
                                rowHoverBg: '#f1f5f9',
                            },
                        },
                    }}
                >
                    <Table
                        columns={columns}
                        dataSource={productData}
                        rowKey="sku"
                        pagination={{
                            pageSize: 5,
                            showSizeChanger: true,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} products`,
                            className: 'px-6 pt-4 pb-2'
                        }}
                        className="w-full"
                        scroll={{ x: 'max-content' }}
                    />
                </ConfigProvider>
            </div>
        </>
    )
}