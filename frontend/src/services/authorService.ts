import { api } from "./api";

export interface Author {
  id: number;
  idBook: number;
  firstName: string;
  lastName: string;
}

export const getAuthors = () => api.get<Author[]>("/authors");
export const getAuthorById = (id: number) => api.get<Author>(`/authors/${id}`);
export const createAuthor = (author: Author) => api.post("/authors", author);
export const updateAuthor = (id: number, author: Author) => api.put(`/authors/${id}`, author);
export const deleteAuthor = (id: number) => api.delete(`/authors/${id}`);
