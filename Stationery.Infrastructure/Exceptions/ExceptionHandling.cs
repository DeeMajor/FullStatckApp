﻿namespace Stationery.Data.Access.Exceptions
{
    public class ExceptionHandling : IExceptionHandling
    {
        public int CheckForNull(int rows)
        {
            if (rows == 0)
            {
                throw new Exception("Operation failed. Could not find the specified record");
            }

            return rows;
        }
    }
}
