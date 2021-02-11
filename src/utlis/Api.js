import { API_URL, API_DETAILS } from './Contants';

export const fetchData = async ({ query }) => {
  try {
    const url = `${API_URL}${query}`;
    const request = await fetch(url);
    const result = await request.json();
    const { results: data } = result;
    return data;
  } catch (err) {
    return []; 
  }
};

export const fetchDescription = async ({ id }) => {
  try {
    const url = `${API_DETAILS}${id}/description`;
    const request = await fetch(url);
    const result = await request.json();
    const { plain_text } = result;
    return plain_text;
  } catch (err) {
    return 'Sin descripcion'; 
  }
};

export const fetchImages = async ({ id }) => {
  try {
    const url = `${API_DETAILS}${id}`;
    const request = await fetch(url);
    const result = await request.json();
    const { pictures } = result;
    const urls = pictures.map(x => ({ id: x.id, url: x.secure_url }));
    return urls;
  } catch (err) {
    return []; 
  }
};