using StationeryList.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StationeryList.Repository.Exceptions
{
    public class ExceptionHandling
    {
        public Task CheckForNull(int rows)
        {
            if (rows == 0)
            {
                throw new Exception("Operation failed. Could not find the specified record");
            }

            return Task.CompletedTask;
        }
    }
}
