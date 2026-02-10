export enum AppView {
    MENU = 'MENU',
    CHECKOUT = 'CHECKOUT',
    RETURNS = 'RETURNS',
    INVENTORY = 'INVENTORY',
    ABOUT = 'ABOUT'
}

export interface Ingredient {
    id: string;
    name: string;
    category: 'base' | 'queso' | 'carne' | 'vegetal' | 'extra';
    price: number;
    stock: number;
    unit: string;
}

export interface PizzaTemplate {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    imageUrl: string;
    defaultIngredients: string[]; // array of ingredient IDs
}

export interface CartItem {
    id: string; // unique instance ID
    pizzaId: string;
    name: string;
    size: 'M' | 'L' | 'XL';
    sizeMultiplier: number;
    customIngredients: Ingredient[]; // ingredients ADDED by user (extra cost)
    removedIngredients: string[]; // IDs of default ingredients removed
    basePrice: number;
    totalPrice: number;
    quantity: number;
}

export enum OrderStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    REFUNDED = 'REFUNDED'
}

export interface Order {
    id: string;
    date: Date;
    items: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
    status: OrderStatus;
    customerName?: string;
}

export interface StoreState {
    view: AppView;
    cart: CartItem[];
    orders: Order[];
    inventory: Ingredient[];
    isCartOpen: boolean;
}
