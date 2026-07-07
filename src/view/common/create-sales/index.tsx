import React, { useState } from 'react';
import { InputNumber, Select, Button, Form, message } from 'antd';
import { Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

// Mock products data for selection
const MOCK_PRODUCTS = [
    { id: '1', name: 'Apple iPhone 15 Pro', price: 1199 },
    { id: '2', name: 'Samsung Galaxy S24', price: 999 },
    { id: '3', name: 'Dell XPS 15', price: 1699 },
    { id: '4', name: 'Logitech MX Master 3S', price: 99 },
];

export default function CreateSalesContent() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [totals, setTotals] = useState({ items: 0, quantity: 0, grandTotal: 0 });

    const handleValuesChange = (_: any, allValues: any) => {
        const products = allValues.products || [];
        let itemsCount = 0;
        let qtyCount = 0;
        let totalVal = 0;

        products.forEach((p: any) => {
            if (p && p.productId) {
                itemsCount += 1;
                const qty = p.quantity || 1;
                qtyCount += qty;

                const product = MOCK_PRODUCTS.find(mp => mp.id === p.productId);
                const price = product ? product.price : 0;
                totalVal += (price * qty);
            }
        });

        setTotals({
            items: itemsCount,
            quantity: qtyCount,
            grandTotal: totalVal
        });
    };

    const handleSave = (values: any) => {
        console.log("Saving sale data:", values);
        message.success('Sale created successfully!');
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
            onValuesChange={handleValuesChange}
            initialValues={{ products: [{}] }}
            className="flex flex-col gap-6"
        >
            <div className="bg-white p-6 rounded-xl border border-slate-200 overflow-x-auto w-full">

                <div className="min-w-[700px]">
                    <div className="grid grid-cols-12 gap-4 pb-3 border-b border-slate-200 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                        <div className="col-span-12 sm:col-span-5">Product</div>
                        <div className="col-span-4 sm:col-span-2 text-center">Qty</div>
                        <div className="col-span-4 sm:col-span-2 text-right">Price</div>
                        <div className="col-span-4 sm:col-span-2 text-right">Subtotal</div>
                        <div className="col-span-12 sm:col-span-1 text-center">Action</div>
                    </div>

                    <Form.List name="products">
                        {(fields, { add, remove }) => (
                            <div className="flex flex-col gap-4 w-full">
                                {fields.map((field) => {
                                    const productId = form.getFieldValue(['products', field.name, 'productId']);
                                    const product = MOCK_PRODUCTS.find(p => p.id === productId);
                                    const price = product ? product.price : 0;
                                    const qty = form.getFieldValue(['products', field.name, 'quantity']) || 1;
                                    const subtotal = price * qty;

                                    return (
                                        <div key={field.key} className="grid grid-cols-12 gap-4 items-center">
                                            {/* Product Select */}
                                            <div className="col-span-12 sm:col-span-5">
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, 'productId']}
                                                    rules={[{ required: true, message: 'Select product' }]}
                                                    className="mb-0"
                                                >
                                                    <Select
                                                        showSearch
                                                        placeholder="Select Product ▼"
                                                        className="h-11 [&>.ant-select-selector]:!h-11 [&>.ant-select-selector]:!items-center [&>.ant-select-selector]:!rounded-lg w-full"
                                                        optionFilterProp="children"
                                                    >
                                                        {MOCK_PRODUCTS.map(p => (
                                                            <Option key={p.id} value={p.id}>{p.name}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </div>

                                            {/* Quantity Input */}
                                            <div className="col-span-4 sm:col-span-2 flex justify-center">
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, 'quantity']}
                                                    className="mb-0"
                                                    initialValue={1}
                                                    rules={[{ required: true, message: 'Qty required' }]}
                                                >
                                                    <InputNumber
                                                        min={1}
                                                        placeholder="Qty"
                                                        className="h-11 w-full max-w-[100px] rounded-lg [&>.ant-input-number-input]:!text-center [&>.ant-input-number-handler-wrap]:!hidden"
                                                    />
                                                </Form.Item>
                                            </div>

                                            {/* Price Display */}
                                            <div className="col-span-4 sm:col-span-2 text-right">
                                                <div className="h-11 flex items-center justify-end px-3 bg-gray-50 border border-transparent rounded-lg font-medium text-gray-700">
                                                    ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </div>
                                            </div>

                                            {/* Subtotal Display */}
                                            <div className="col-span-4 sm:col-span-2 text-right">
                                                <div className="h-11 flex items-center justify-end px-3 font-bold text-gray-900 border border-gray-100 rounded-lg">
                                                    ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </div>
                                            </div>

                                            {/* Action Delete */}
                                            <div className="col-span-12 sm:col-span-1 flex justify-center">
                                                <Button
                                                    type="text"
                                                    danger
                                                    icon={<Trash2 className="w-5 h-5 text-red-500" />}
                                                    onClick={() => remove(field.name)}
                                                    className="flex items-center justify-center hover:bg-red-50 w-11 h-11 rounded-lg"
                                                />
                                            </div>
                                        </div>
                                    )
                                })}

                                <div className="mt-2 text-left">
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        icon={<Plus className="w-4 h-4" />}
                                        className="h-11 px-6 rounded-lg text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 font-medium transition-colors"
                                    >
                                        Add Another Product
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Form.List>
                </div>
            </div>

            {/* Bottom Summary Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start mt-2">
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden lg:col-start-2">
                    <div className="grid grid-cols-2 bg-gray-50 border-b border-slate-200">
                        <div className="p-4 font-semibold text-gray-900">Sales Summary</div>
                        <div className="p-4 font-semibold text-gray-900 text-right">Grand Total</div>
                    </div>

                    <div className="p-0">
                        <div className="grid grid-cols-2 items-center border-b border-gray-100 px-4 py-3">
                            <div className="text-gray-500 font-medium">Total Items</div>
                            <div className="text-right font-medium text-gray-900">{totals.items}</div>
                        </div>
                        <div className="grid grid-cols-2 items-center border-b border-gray-100 px-4 py-3">
                            <div className="text-gray-500 font-medium">Total Quantity</div>
                            <div className="text-right font-medium text-gray-900">{totals.quantity}</div>
                        </div>
                        <div className="grid grid-cols-2 items-center bg-gray-50 px-4 py-4">
                            <div className="text-lg font-bold text-gray-900">Grand Total</div>
                            <div className="text-right text-xl font-bold text-emerald-600">${totals.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-end gap-3 pb-6">
                <Button
                    size="large"
                    className="px-6 text-gray-700 font-medium h-12 rounded-lg"
                    onClick={() => navigate(-1)}
                >
                    Cancel
                </Button>
                <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="px-8 bg-blue-600 hover:bg-blue-700 font-medium shadow-sm transition-colors h-12 rounded-lg"
                >
                    Create Sale
                </Button>
            </div>
        </Form>
    );
}