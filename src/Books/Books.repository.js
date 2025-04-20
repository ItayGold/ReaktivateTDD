import ApiGateway from "../Shared/ApiGateway.js";

class BooksRepository {
  constructor() {
    this.httpGateway = new ApiGateway();
  }

  getBooks = async (user) => {
    const booksDto = await this.httpGateway.get(`/${user}/`);
    return booksDto;
  };

  addBook = async (user, { name, author }) => {
    const bookAddDto = await this.httpGateway.post(`/${user}/`, { name, author });
    return bookAddDto && bookAddDto.status === "ok" ? true : false;
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
