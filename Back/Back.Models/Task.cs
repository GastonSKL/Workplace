using System;
using System.Collections.Generic;

namespace Back.Models
{
    public partial class Task
    {
        public decimal IdTask { get; set; }
        public decimal IdUser { get; set; }
        public decimal? Cat { get; set; }
        public decimal? Pri { get; set; }
        public decimal? Com { get; set; }
        public string? Tit { get; set; }
        public string? Des { get; set; }
        public DateTime? FecEdi { get; set; }
        public DateTime? FecCre { get; set; }

        public virtual User IdUserNavigation { get; set; } = null!;
    }
}
