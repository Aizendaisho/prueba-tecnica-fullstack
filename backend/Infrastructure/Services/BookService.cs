using Application.Interfaces;
using Domain.Entities;
using System.Net.Http.Json;

namespace Infrastructure.Services;

public class BookService : IBookService
{
    private readonly HttpClient _httpClient;

    public BookService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<IEnumerable<Book>> GetAllBooksAsync()
    {
        return await _httpClient.GetFromJsonAsync<IEnumerable<Book>>("Books") ?? new List<Book>();
    }

    public async Task<Book?> GetBookByIdAsync(int id)
    {
        return await _httpClient.GetFromJsonAsync<Book>($"Books/{id}");
    }

    public async Task<Book> CreateBookAsync(Book book)
    {
        var response = await _httpClient.PostAsJsonAsync("Books", book);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<Book>() ?? throw new Exception("Error creating book");
    }

    public async Task<Book> UpdateBookAsync(int id, Book book)
    {
        var response = await _httpClient.PutAsJsonAsync($"Books/{id}", book);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<Book>() ?? throw new Exception("Error updating book");
    }

    public async Task<bool> DeleteBookAsync(int id)
    {
        var response = await _httpClient.DeleteAsync($"Books/{id}");
        return response.IsSuccessStatusCode;
    }
}
