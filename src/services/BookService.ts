import axios from "axios";
import { Book } from "../models/Book";

const API_URL = "https://tdd.demo.reaktivate.com/v1/books";

export async function getBooksApi(user: string): Promise<Book[]> {
  const response = await axios.get(`${API_URL}/${user}`);
  return response.data;
}

export async function addBookApi(
  user: string,
  book: Partial<Book>
): Promise<Book> {
  const response = await axios.post(`${API_URL}/${user}`, book);
  return response.data;
}
