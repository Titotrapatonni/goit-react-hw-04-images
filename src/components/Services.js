import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '32822912-5b663025839bc66c64f5a98ae',
    per_page: '12',
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

export const getFetchImages = async (query, page) => {
  const response = await instance(`?q=${query}&page=${page}`);
  const data = await response.data;
  return data;
};
