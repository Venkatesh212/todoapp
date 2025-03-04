using Microsoft.EntityFrameworkCore;
using ToDoApp.Data.Entities;
using Task = ToDoApp.Data.Entities.Task;


namespace ToDoApp.Data
{
    public partial class ToDoAppDbContext : DbContext
    {
        public ToDoAppDbContext() { }

        public ToDoAppDbContext(DbContextOptions<ToDoAppDbContext> options)
        : base(options)
        {
        }
        public virtual DbSet<Task> Tasks { get; set; }
        public virtual DbSet<User> Users { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=sql-dev;Initial Catalog=VenkateshDB;Integrated Security=SSPI;TrustServerCertificate=True");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Task>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_Task");
                entity.ToTable("Tasks", "ToDoApp");
                entity.Property(e => e.Id).UseIdentityColumn(seed: 1, increment: 1);
                entity.HasOne(e => e.User)
                .WithMany()
                .HasForeignKey(e => e.UserId)
                .IsRequired();
                
            });
          
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_User");
                entity.ToTable("Users", "ToDoApp");
                entity.Property(e => e.Id).UseIdentityColumn(seed: 1, increment: 1);
            });
            OnModelCreatingPartial(modelBuilder);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
