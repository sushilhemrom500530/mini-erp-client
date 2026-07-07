import { useState } from 'react';
import { Button, Form, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import FormField from '../../../Components/form/index.js';

export default function AddProductContent() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSave = (values: any) => {
        console.log("Saving product data:", values);
        message.success('Product saved successfully!');
        // navigate(-1);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
            className="flex flex-col gap-6"
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column - Image Upload */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 h-full flex flex-col">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Image</h2>
                        <div className="flex-1">
                            <FormField
                                type="file"
                                name="image"
                                accept=".png,.jpg,.jpeg"
                                fileUploadClass="!h-64 bg-gray-50 hover:border-blue-500 hover:bg-blue-50/50 transition-all border-dashed rounded-xl"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column - Product Information */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                            <FormField
                                type="text"
                                label="Product Name"
                                name="productName"
                                required
                                placeholder="E.g. Apple iPhone 15 Pro"
                                className="md:col-span-2"
                                colorClass="rounded-lg"
                            />

                            <FormField
                                type="text"
                                label="SKU"
                                name="sku"
                                required
                                placeholder="E.g. IPH15P-001"
                                colorClass="rounded-lg"
                            />

                            <FormField
                                type="text"
                                label="Category"
                                name="category"
                                required
                                placeholder="E.g. Electronics"
                                colorClass="rounded-lg"
                            />

                            <FormField
                                type="number"
                                label="Purchase Price ($)"
                                name="purchasePrice"
                                required
                                placeholder="0.00"
                                colorClass="rounded-lg"
                            />

                            <FormField
                                type="number"
                                label="Selling Price ($)"
                                name="sellingPrice"
                                required
                                placeholder="0.00"
                                colorClass="rounded-lg"
                            />

                            <FormField
                                type="number"
                                label="Stock Quantity"
                                name="stockQuantity"
                                required
                                placeholder="0"
                                className="md:col-span-2 lg:col-span-1"
                                colorClass="rounded-lg"
                            />
                        </div>
                    </div>
                </div>

            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-end gap-3 mt-2">
                <Button
                    size="large"
                    className="px-6 text-gray-700 font-medium"
                    onClick={() => navigate(-1)}
                >
                    Cancel
                </Button>
                <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="px-6 !bg-secondary hover:!bg-secondary/80 font-medium transition-colors"
                >
                    Save Product
                </Button>
            </div>
        </Form>
    );
}