using System.Linq;
using System.Security.Claims;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpCotextAccessor;
        public UserAccessor(IHttpContextAccessor httpCotextAccessor)
        {
            _httpCotextAccessor = httpCotextAccessor;
        }

        public string GetCurrentUsername()
        {
            var username = _httpCotextAccessor.HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            return username;
        }
    }
}