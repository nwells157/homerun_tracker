docker restart postgres-hr-tracker-container

docker ps

docker exec -it postgres-hr-tracker-container psql -U admin -d hr_tracker_db
