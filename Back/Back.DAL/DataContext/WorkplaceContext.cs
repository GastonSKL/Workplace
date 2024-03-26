using System;
using System.Collections.Generic;
using Back.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Back.DAL.DataContext
{
    public partial class WorkplaceContext : DbContext
    {
        public WorkplaceContext()
        {
        }

        public WorkplaceContext(DbContextOptions<WorkplaceContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Models.Task> Tasks { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=(localdb)\\Local; DataBase=Workplace;Integrated Security=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Models.Task>(entity =>
            {
                entity.HasKey(e => e.IdTask);

                entity.Property(e => e.IdTask)
                    .HasColumnType("numeric(3, 0)")
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id_task");

                entity.Property(e => e.Cat)
                    .HasColumnType("numeric(1, 0)")
                    .HasColumnName("cat");

                entity.Property(e => e.Com)
                    .HasColumnType("numeric(1, 0)")
                    .HasColumnName("com");

                entity.Property(e => e.Des)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("des");

                entity.Property(e => e.FecCre)
                    .HasColumnType("datetime")
                    .HasColumnName("fecCre");

                entity.Property(e => e.FecEdi)
                    .HasColumnType("datetime")
                    .HasColumnName("fecEdi");

                entity.Property(e => e.IdUser)
                    .HasColumnType("numeric(3, 0)")
                    .HasColumnName("id_user");

                entity.Property(e => e.Pri)
                    .HasColumnType("numeric(1, 0)")
                    .HasColumnName("pri");

                entity.Property(e => e.Tit)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("tit");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.Tasks)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Tasks_Users");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.IdUser);

                entity.Property(e => e.IdUser)
                    .HasColumnType("numeric(3, 0)")
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id_user");

                entity.Property(e => e.Ape)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("ape");

                entity.Property(e => e.Mai)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("mai");

                entity.Property(e => e.Nom)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nom");

                entity.Property(e => e.Pas)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("pas");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
