using Application.Interfaces;
using Domain.Entities;
using System.Net.Http.Json;

namespace Infrastructure.Services;

public class AuthorService : IAuthorService
{
    private readonly HttpClient _httpClient;

    public AuthorService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<IEnumerable<Author>> GetAllAuthorsAsync()
    {
        return await _httpClient.GetFromJsonAsync<IEnumerable<Author>>("Authors") ?? new List<Author>();
    }

    public async Task<Author?> GetAuthorByIdAsync(int id)
    {
        return await _httpClient.GetFromJsonAsync<Author>($"Authors/{id}");
    }

    public async Task<Author> CreateAuthorAsync(Author author)
    {
        var response = await _httpClient.PostAsJsonAsync("Authors", author);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<Author>() ?? throw new Exception("Error creating author");
    }

    public async Task<Author> UpdateAuthorAsync(int id, Author author)
    {
        var response = await _httpClient.PutAsJsonAsync($"Authors/{id}", author);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<Author>() ?? throw new Exception("Error updating author");
    }

    public async Task<bool> DeleteAuthorAsync(int id)
    {
        var response = await _httpClient.DeleteAsync($"Authors/{id}");
        return response.IsSuccessStatusCode;
    }
}
