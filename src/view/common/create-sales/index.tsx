import React, { useState, useEffect } from 'react';
import { Button, message, Input, Spin, Empty } from 'antd';
import { Search, ShoppingBag, Receipt, Package, Trash2, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../../../redux/features/product/index.js';
import { useCreateSaleMutation } from '../../../redux/features/sale/index.js';

interface ICartItem {
    _id: string;
    name: string;
    price: number;
    stock: number;
    quantity: number;
}

export default function CreateSalesContent() {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [cart, setCart] = useState<ICartItem[]>([]);

    const { data, isFetching } = useGetProductsQuery({
        page: 1,
        limit: 50,
        searchTerm: debouncedSearch,
    });

    const [createSale, { isLoading: isCreating }] = useCreateSaleMutation();

    const currentProducts = data?.data?.results || [];

    // Debounce search input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 400);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    const addToCart = (product: any) => {
        if (product.stockQuantity <= 0) {
            return message.warning('This product is out of stock.');
        }

        setCart(prev => {
            const existing = prev.find(item => item._id === product._id);
            if (existing) {
                if (existing.quantity >= product.stockQuantity) {
                    message.warning('Maximum stock limit reached');
                    return prev;
                }
                return prev.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, {
                _id: product._id,
                name: product.productName,
                price: product.sellingPrice,
                stock: product.stockQuantity,
                quantity: 1
            }];
        });
    };

    const updateQuantity = (id: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item._id === id) {
                const newQty = item.quantity + delta;
                if (newQty > item.stock) {
                    message.warning('Maximum stock limit reached');
                    return item;
                }
                return { ...item, quantity: newQty };
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const removeFromCart = (id: string) => {
        setCart(prev => prev.filter(item => item._id !== id));
    };

    const handleSave = async () => {
        try {
            if (cart.length === 0) {
                return message.error('Please add at least one product to the cart.');
            }

            const formattedProducts = cart.map(item => ({
                product: item._id,
                quantity: item.quantity,
            }));

            const payload = {
                products: formattedProducts,
            };

            const res = await createSale(payload).unwrap();
            message.success(res.message || 'Sale completed successfully!');
            setCart([]);
            navigate(-1);
        } catch (error: any) {
            message.error(error?.data?.message || 'Failed to create sale. Please try again.');
        }
    };

    // Derived totals
    const totals = cart.reduce((acc, item) => {
        acc.items += 1;
        acc.quantity += item.quantity;
        acc.grandTotal += (item.price * item.quantity);
        return acc;
    }, { items: 0, quantity: 0, grandTotal: 0 });

    return (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-6 items-start h-[calc(100vh-140px)]">

            {/* Left Side: Product Grid */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] h-full overflow-hidden flex flex-col">
                {/* Header / Search */}
                <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                            <Package className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Products</h2>
                            <p className="text-sm text-gray-500 font-medium">Select items to add to cart</p>
                        </div>
                    </div>

                    <div className="w-full sm:w-80">
                        <Input
                            placeholder="Search products by name or SKU..."
                            prefix={<Search className="w-4 h-4 text-gray-400" />}
                            className="h-11 rounded-xl bg-gray-50 border-transparent hover:border-blue-200 focus:border-blue-500 focus:bg-white transition-all shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            allowClear
                        />
                    </div>
                </div>

                {/* Product Grid Area */}
                <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
                    {isFetching ? (
                        <div className="flex items-center justify-center h-full">
                            <Spin size="large" />
                        </div>
                    ) : currentProducts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <Empty description="No products found" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-max">
                            {currentProducts.map((p: any) => (
                                <div
                                    key={p._id}
                                    onClick={() => addToCart(p)}
                                    className={`
                                        bg-white border rounded-xl p-4 cursor-pointer transition-all duration-200
                                        flex flex-col items-center text-center group relative overflow-hidden
                                        ${p.stockQuantity > 0
                                            ? 'border-gray-200 hover:border-blue-500 hover:shadow-md'
                                            : 'border-gray-100 opacity-60 cursor-not-allowed grayscale-[0.5]'}
                                    `}
                                >
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-3 group-hover:scale-110 transition-transform">
                                        {p.productImage ? (
                                            <img src={p.productImage} alt={p.productName} className="w-full h-full object-cover rounded-full" />
                                        ) : (
                                            <Package className="w-8 h-8" />
                                        )}
                                    </div>
                                    <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-1">
                                        {p.productName}
                                    </h3>
                                    <span className="text-xs text-gray-400 mb-2">SKU: {p.sku}</span>

                                    <div className="mt-auto flex flex-col items-center w-full">
                                        <div className="font-extrabold text-blue-600 text-lg mb-1">
                                            ${p.sellingPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </div>
                                        {p.stockQuantity > 0 ? (
                                            <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                                In Stock ({p.stockQuantity})
                                            </span>
                                        ) : (
                                            <span className="text-[10px] uppercase font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                                                Out of Stock
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side: Cart Cart */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.1)] h-full overflow-hidden flex flex-col">
                <div className="p-5 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-gray-700" />
                        <h2 className="text-lg font-bold text-gray-900">Checkout Cart</h2>
                    </div>
                    {totals.quantity > 0 && (
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
                            {totals.quantity}
                        </div>
                    )}
                </div>

                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-50/30">
                    {cart.length === 0 ? (
                        <div className="m-auto flex flex-col items-center text-gray-400">
                            <ShoppingBag className="w-12 h-12 mb-3 text-gray-200" />
                            <p className="font-medium text-sm">Cart is empty</p>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item._id} className="bg-white border text-sm border-gray-100 rounded-xl p-3 shadow-sm flex flex-col gap-2">
                                <div className="flex justify-between items-start gap-2">
                                    <div className="font-semibold text-gray-800 leading-tight">
                                        {item.name}
                                    </div>
                                    <Button
                                        type="text"
                                        size="small"
                                        danger
                                        onClick={() => removeFromCart(item._id)}
                                        icon={<Trash2 className="w-4 h-4" />}
                                        className="h-6 w-6 rounded-md hover:bg-red-50 -mt-1 -mr-1"
                                    />
                                </div>

                                <div className="flex justify-between items-end mt-1">
                                    <div className="font-bold text-blue-600">
                                        ${(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>

                                    <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-100">
                                        <Button
                                            type="text"
                                            size="small"
                                            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white border border-transparent hover:border-gray-200"
                                            onClick={() => updateQuantity(item._id, -1)}
                                            icon={<Minus className="w-3 h-3" />}
                                        />
                                        <span className="font-bold text-gray-700 w-4 text-center">{item.quantity}</span>
                                        <Button
                                            type="text"
                                            size="small"
                                            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white border border-transparent hover:border-gray-200"
                                            onClick={() => updateQuantity(item._id, 1)}
                                            icon={<Plus className="w-3 h-3" />}
                                            disabled={item.quantity >= item.stock}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Cart Footer Summary */}
                <div className="border-t border-gray-200 bg-white">
                    <div className="p-5 flex flex-col gap-2">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 font-medium">Items Count</span>
                            <span className="font-bold text-gray-700">{totals.items}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 font-medium">Total Quantity</span>
                            <span className="font-bold text-gray-700">{totals.quantity}</span>
                        </div>
                        <div className="h-px bg-gray-100 w-full my-1"></div>
                        <div className="flex justify-between items-end">
                            <span className="font-bold text-gray-800 mb-0.5">Grand Total</span>
                            <span className="text-2xl font-extrabold text-emerald-600 tracking-tight">
                                ${totals.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                        </div>
                    </div>

                    <div className="p-4 pt-0 flex gap-2">
                        <Button
                            size="large"
                            className="flex-[1] h-12 rounded-xl text-gray-600 font-semibold"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            size="large"
                            loading={isCreating}
                            onClick={handleSave}
                            disabled={cart.length === 0}
                            icon={<Receipt className="w-4 h-4" />}
                            className="flex-[2] h-12 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold shadow-md shadow-blue-600/20 flex items-center justify-center gap-2"
                        >
                            Create Sale
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    );
}