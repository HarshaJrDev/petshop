export interface Pet {
    id: string | number;
    name: string;
    breed: string;
    age: string;
    price: string;
    image: string;
}

export interface CartItem extends Pet {
    cartId: number;
}

export interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'info';
}
