import { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';
// import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Layout } from './Layout.styled';
import { SearchBar } from './SearchBar/SearchBar';

export class App extends Component {
  state = {
    value: '',
    page: 1,
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      value: e.currentTarget.elements.searchBar.value.trim(),
      page: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { value, page } = this.state;
    return (
      <Layout>
        <SearchBar onSubmit={this.handleSubmit} />

        <ImageGallery
          query={value}
          page={page}
          loadMore={this.handleLoadMore}
        />
        <GlobalStyle />
        <Toaster position="top-center" reverseOrder={false} gutter={8} />
      </Layout>
    );
  }
}
