dropdb -U node_user monstersdb
createdb -U node_user monstersdb
psql -h localhost -p 5432 -U node_user -d "monstersdb" -f "./sql/monsters.sql"