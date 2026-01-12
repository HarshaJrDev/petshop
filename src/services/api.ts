import { Pet } from '../types';

const API_BASE_URL = 'https://reqres.in/api';
const DOG_API_URL = 'https://dog.ceo/api/breeds/image/random';

export const submitPetDetails = async (petData: Omit<Pet, 'id' | 'image'>): Promise<any> => {
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer reqres_99f1a82e9e1e4fcdb6f73d64a9abc002',
            },
            body: JSON.stringify(petData),
        });


        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {

        console.error('Error submitting pet details:', error);
        throw error;
    }
};

export const fetchRandomDogImage = async (): Promise<string> => {
    try {
        const response = await fetch(DOG_API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error('Error fetching random dog image:', error);
        throw error;
    }
};
