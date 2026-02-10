import { AppView, Ingredient, PizzaTemplate, Order, OrderStatus } from './types';

export const INITIAL_INVENTORY: Ingredient[] = [
    { id: 'ing_dough_reg', name: 'Masa Clásica', category: 'base', price: 0, stock: 500, unit: 'u' },
    { id: 'ing_sauce_tom', name: 'Salsa de Tomate Neo', category: 'base', price: 0, stock: 5000, unit: 'oz' },
    { id: 'ing_cheese_moz', name: 'Queso Mozzarella', category: 'queso', price: 1.5, stock: 2000, unit: 'oz' },
    { id: 'ing_cheese_par', name: 'Parmesano Digital', category: 'queso', price: 2.0, stock: 1000, unit: 'oz' },
    { id: 'ing_meat_pep', name: 'Pepperoni 8-bit', category: 'carne', price: 2.5, stock: 800, unit: 'oz' },
    { id: 'ing_meat_bac', name: 'Tocino Ahumado', category: 'carne', price: 3.0, stock: 500, unit: 'oz' },
    { id: 'ing_veg_mush', name: 'Champiñones', category: 'vegetal', price: 1.0, stock: 600, unit: 'oz' },
    { id: 'ing_veg_on', name: 'Cebolla Morada', category: 'vegetal', price: 0.8, stock: 400, unit: 'oz' },
    { id: 'ing_veg_pep', name: 'Pimientos Neón', category: 'vegetal', price: 1.2, stock: 450, unit: 'oz' },
    { id: 'ing_extra_hon', name: 'Miel Picante', category: 'extra', price: 1.5, stock: 200, unit: 'oz' },
];

export const PIZZA_MENU: PizzaTemplate[] = [
    {
        id: 'p_margarita_v',
        name: 'Margarita Virtual',
        description: 'La clásica reinventada. Salsa de tomate neo, mozzarella fundida y albahaca holográfica.',
        basePrice: 12.99,
        imageUrl: 'https://picsum.photos/seed/pizza1/400/300',
        defaultIngredients: ['ing_dough_reg', 'ing_sauce_tom', 'ing_cheese_moz']
    },
    {
        id: 'p_cyber_pep',
        name: 'Cyber Pepperoni',
        description: 'Doble porción de pepperoni 8-bit con bordes crujientes y un toque de miel picante.',
        basePrice: 15.99,
        imageUrl: 'https://picsum.photos/seed/pizza2/400/300',
        defaultIngredients: ['ing_dough_reg', 'ing_sauce_tom', 'ing_cheese_moz', 'ing_meat_pep', 'ing_extra_hon']
    },
    {
        id: 'p_mainframe',
        name: 'El Mainframe',
        description: 'Sobrecarga de procesamiento cárnico. Pepperoni, tocino ahumado y extra mozzarella.',
        basePrice: 18.99,
        imageUrl: 'https://picsum.photos/seed/pizza3/400/300',
        defaultIngredients: ['ing_dough_reg', 'ing_sauce_tom', 'ing_cheese_moz', 'ing_meat_pep', 'ing_meat_bac']
    },
    {
        id: 'p_veggie_glitch',
        name: 'Veggie Glitch',
        description: 'Una anomalía deliciosa. Champiñones, cebolla morada y pimientos neón sobre base clásica.',
        basePrice: 14.99,
        imageUrl: 'https://picsum.photos/seed/pizza4/400/300',
        defaultIngredients: ['ing_dough_reg', 'ing_sauce_tom', 'ing_cheese_moz', 'ing_veg_mush', 'ing_veg_on', 'ing_veg_pep']
    },
    {
        id: 'p_404_cheese',
        name: 'Error 404: Cheese Not Found',
        description: '(Es broma, tiene MUCHO queso). Mezcla de mozzarella, parmesano digital y borde relleno.',
        basePrice: 16.99,
        imageUrl: 'https://picsum.photos/seed/pizza5/400/300',
        defaultIngredients: ['ing_dough_reg', 'ing_sauce_tom', 'ing_cheese_moz', 'ing_cheese_par']
    },
    {
        id: 'p_byte_size',
        name: 'Byte Size Supreme',
        description: 'Pequeños bocados de todo nuestro inventario. Una experiencia sensorial completa.',
        basePrice: 19.99,
        imageUrl: 'https://picsum.photos/seed/pizza6/400/300',
        defaultIngredients: ['ing_dough_reg', 'ing_sauce_tom', 'ing_cheese_moz', 'ing_meat_pep', 'ing_veg_mush', 'ing_veg_pep']
    }
];

// Mock historical orders
export const MOCK_ORDERS: Order[] = [
    {
        id: 'ORD-00101',
        date: new Date(Date.now() - 86400000 * 2), // 2 days ago
        items: [
            {
                id: 'item_1',
                pizzaId: 'p_cyber_pep',
                name: 'Cyber Pepperoni',
                size: 'L',
                sizeMultiplier: 1.2,
                customIngredients: [],
                removedIngredients: [],
                basePrice: 15.99,
                totalPrice: 19.19,
                quantity: 1
            }
        ],
        subtotal: 19.19,
        tax: 1.54,
        total: 20.73,
        status: OrderStatus.COMPLETED,
        customerName: 'Satoshi N.'
    },
    {
        id: 'ORD-00102',
        date: new Date(Date.now() - 3600000 * 5), // 5 hours ago
        items: [
            {
                id: 'item_2',
                pizzaId: 'p_margarita_v',
                name: 'Margarita Virtual',
                size: 'M',
                sizeMultiplier: 1.0,
                customIngredients: [{ id: 'ing_veg_mush', name: 'Champiñones', category: 'vegetal', price: 1.0, stock: 100, unit: 'oz' }],
                removedIngredients: [],
                basePrice: 12.99,
                totalPrice: 13.99,
                quantity: 2
            }
        ],
        subtotal: 27.98,
        tax: 2.24,
        total: 30.22,
        status: OrderStatus.COMPLETED,
        customerName: 'Ada L.'
    }
];

// Reusable SVG Icons (Avoid external deps for strict compliance)
export const Icons = {
    Menu: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 12h18M3 6h18M3 18h18"/></svg>,
    Pizza: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 11h.01"/><path d="M11 15h.01"/><path d="M16 16h.01"/><path d="m2 16 20 6-6-20A20 20 0 0 0 2 16"/><path d="M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4"/></svg>,
    Cart: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>,
    Clock: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    Package: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>,
    Plus: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
    Minus: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/></svg>,
    Trash: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>,
    CreditCard: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>,
    Terminal: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>,
    RefreshCcw: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21v-5h5"/></svg>,
    X: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
    CheckCircle: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>,
    Info: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>
};
