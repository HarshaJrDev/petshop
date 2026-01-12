import * as yup from 'yup';

export const petSchema = yup.object().shape({
    name: yup
        .string()
        .required('Pet name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters'),

    breed: yup
        .string()
        .required('Breed is required')
        .min(2, 'Breed must be at least 2 characters')
        .max(50, 'Breed must be less than 50 characters'),

    age: yup
        .number()
        .required('Age is required')
        .positive('Age must be positive')
        .integer('Age must be a whole number')
        .min(0, 'Age must be at least 0')
        .max(30, 'Age must be less than 30'),

    price: yup
        .number()
        .required('Price is required')
        .positive('Price must be positive')
        .min(0.01, 'Price must be greater than 0')
});

export type PetFormData = yup.InferType<typeof petSchema>;