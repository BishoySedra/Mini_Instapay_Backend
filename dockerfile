# Use official Postgres image as base
FROM postgres:latest

# Set environment variables
ENV POSTGRES_PASSWORD=Backend@2004
ENV POSTGRES_DB=mydb

# Optional: expose the default PostgreSQL port
EXPOSE 5432
