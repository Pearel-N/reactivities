using Domain;

namespace Application.Interfaces
{
    public interface IJwtGenerator
    {
         string CreateToker(AppUser user);
         
    }
}