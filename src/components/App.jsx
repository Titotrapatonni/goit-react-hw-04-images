import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Layout } from './Layout.styled';
import { SearchBar } from './SearchBar/SearchBar';

export const App = () => {
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);

  const handleSubmit = e => {
    e.preventDefault();
    setValue(e.currentTarget.elements.searchBar.value.trim());
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <Layout>
      <SearchBar onSubmit={handleSubmit} />

      <ImageGallery query={value} page={page} loadMore={handleLoadMore} />
      <GlobalStyle />
      <Toaster position="top-center" reverseOrder={false} gutter={8} />
    </Layout>
  );
};
