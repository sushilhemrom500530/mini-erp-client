import { Table, Input, Select, Button, Space, Tooltip, ConfigProvider } from 'antd';
import { Plus, Search, Eye, Edit, Trash2 } from 'lucide-react';

export default function Products() {

    const productData = [
        {
            "owner": "686b2e5c4a5d9f0012345678",
            "productName": "Apple iPhone 15 Pro",
            "sku": "IPH15P-001",
            "category": "Smartphones",
            "purchasePrice": 980,
            "sellingPrice": 1199,
            "stockQuantity": 25,
            "productImage": "https://example.com/images/iphone15pro.jpg",
            "isDeleted": false
        },
        {
            "owner": "686b2e5c4a5d9f0012345678",
            "productName": "Samsung Galaxy S24",
            "sku": "SGS24-002",
            "category": "Smartphones",
            "purchasePrice": 850,
            "sellingPrice": 999,
            "stockQuantity": 18,
            "productImage": "https://example.com/images/galaxy-s24.jpg",
            "isDeleted": false
        },
        {
            "owner": "686b2e5c4a5d9f0012345678",
            "productName": "Dell XPS 15",
            "sku": "DXPS15-003",
            "category": "Laptops",
            "purchasePrice": 1450,
            "sellingPrice": 1699,
            "stockQuantity": 10,
            "productImage": "https://example.com/images/dell-xps15.jpg",
            "isDeleted": false
        },
        {
            "owner": "686b2e5c4a5d9f0012345678",
            "productName": "Logitech MX Master 3S",
            "sku": "LMM3S-004",
            "category": "Accessories",
            "purchasePrice": 70,
            "sellingPrice": 99,
            "stockQuantity": 45,
            "productImage": "https://example.com/images/mx-master3s.jpg",
            "isDeleted": false
        },
        {
            "owner": "686b2e5c4a5d9f0012345678",
            "productName": "Sony WH-1000XM5",
            "sku": "SONYXM5-005",
            "category": "Headphones",
            "purchasePrice": 260,
            "sellingPrice": 349,
            "stockQuantity": 15,
            "productImage": "https://example.com/images/sony-wh1000xm5.jpg",
            "isDeleted": false
        },
        {
            "owner": "686b2e5c4a5d9f0012345678",
            "productName": "Apple Magic Keyboard",
            "sku": "AMK-006",
            "category": "Accessories",
            "purchasePrice": 85,
            "sellingPrice": 129,
            "stockQuantity": 30,
            "productImage": "https://example.com/images/magic-keyboard.jpg",
            "isDeleted": false
        },
        {
            "owner": "686b2e5c4a5d9f0012345678",
            "productName": "HP LaserJet Pro M404dn",
            "sku": "HPLJ404-007",
            "category": "Printers",
            "purchasePrice": 220,
            "sellingPrice": 299,
            "stockQuantity": 8,
            "productImage": "https://example.com/images/hp-laserjet.jpg",
            "isDeleted": false
        },
        {
            "owner": "686b2e5c4a5d9f0012345678",
            "productName": "Canon EOS R50",
            "sku": "CANR50-008",
            "category": "Cameras",
            "purchasePrice": 650,
            "sellingPrice": 799,
            "stockQuantity": 12,
            "productImage": "https://example.com/images/canon-r50.jpg",
            "isDeleted": false
        },
        {
            "owner": "686b2e5c4a5d9f0012345678",
            "productName": "Acer Nitro 5",
            "sku": "AN5-009",
            "category": "Laptops",
            "purchasePrice": 780,
            "sellingPrice": 949,
            "stockQuantity": 20,
            "productImage": "https://example.com/images/acer-nitro5.jpg",
            "isDeleted": false
        },
        {
            "owner": "686b2e5c4a5d9f0012345678",
            "productName": "JBL Flip 6",
            "sku": "JBLF6-010",
            "category": "Speakers",
            "purchasePrice": 90,
            "sellingPrice": 129,
            "stockQuantity": 40,
            "productImage": "https://example.com/images/jbl-flip6.jpg",
            "isDeleted": false
        }
    ];

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
        <div className="space-y-6 max-w-full">

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">Products</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your inventory products</p>
                </div>
                <Button type="primary" className="bg-blue-600 hover:bg-blue-700 h-10 px-4 font-medium flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add Product
                </Button>
            </div>

            {/* Filters Section */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
                <Input
                    placeholder="Search Product..."
                    prefix={<Search className="w-4 h-4 text-gray-400" />}
                    className="max-w-md h-10"
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

            {/* Table Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
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

        </div>
    );
}