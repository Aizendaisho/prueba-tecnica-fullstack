import { api } from "./api";

export interface Book {
  id: number;
  title: string;
  description: string;
  pageCount: number;
  excerpt: string;
  publishDate: string;
  idBook?: number; 

}

export const getBooks = () => api.get<Book[]>("/books");
export const getBookById = (id: number) => api.get<Book>(`/books/${id}`);
export const createBook = (book: Book) => api.post("/books", book);
export const updateBook = (id: number, book: Book) => api.put(`/books/${id}`, book);
export const deleteBook = (id: number) => api.delete(`/books/${id}`);
