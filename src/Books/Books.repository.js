import ApiGateway from "../Shared/ApiGateway.js";

class BooksRepository {
  constructor() {
    this.httpGateway = new ApiGateway();
  }

  getBooks = async (user) => {
    try {
      const booksDto = await this.httpGateway.get(`/${user}/`);
      return booksDto;
    } catch (error) {
      console.debug("Failed to fetch books:", error);
      return [];
    }
  };

  addBook = async (user, { name, author, private: isPrivate }) => {
    try {
      const payload = { name, author, private: isPrivate };
      const bookAddDto = await this.httpGateway.post(`/${user}/`, payload);
      return bookAddDto && bookAddDto.status === "ok";
    } catch (error) {
      console.debug("Failed to add book:", error);
      return false;
    }
  };

  resetBooks = async (user) => {
    try {
      const resetDto = await this.httpGateway.put(`/${user}/reset`);
      return resetDto && resetDto.status === "ok";
    } catch (error) {
      console.debug("Failed to reset books:", error);
      return false;
    }
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
