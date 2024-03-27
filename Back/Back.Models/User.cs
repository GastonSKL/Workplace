using System;
using System.Collections.Generic;

namespace Back.Models
{
    public partial class User
    {
        public User()
        { 
            Tasks = new HashSet<Task>();
        }

        public decimal IdUser { get; set; }
        public string? Nom { get; set; }
        public string? Ape { get; set; }
        public string? Pas { get; set; }
        public string? Mai { get; set; }

        public virtual ICollection<Task> Tasks { get; set; }
    }
}
