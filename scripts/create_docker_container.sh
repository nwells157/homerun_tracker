docker run --name postgres-hr-tracker-container \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_DB=hr_tracker_db\
  -p 5432:5432 \
  -v hr_tracker_pgdata:/var/lib/postgresql/data \
  -d postgres:16
