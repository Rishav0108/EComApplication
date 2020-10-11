using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Rishav",
                    Email = "rishavkvs@gmail.com",
                    UserName = "rishavkvs@gmail.com",
                    Address =new Address
                    {
                        FirstName = "Rishav",
                        LastName = "Raj",
                        Street = "New Colony Saharsa Ward No 8",
                        City = "Saharsa",
                        State = "Bihar",
                        ZipCode = "852201"
                    }
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");

            }
        }
    }
}