SELECT
  1 + 1 AS result DROP TABLE IF EXISTS "Likes" CASCADE;

DROP TABLE IF EXISTS "tweets" CASCADE;

DROP TABLE IF EXISTS "users" CASCADE;

SELECT
  DISTINCT tc.constraint_name as constraint_name,
  tc.constraint_schema as constraint_schema,
  tc.constraint_catalog as constraint_catalog,
  tc.table_name as table_name,
  tc.table_schema as table_schema,
  tc.table_catalog as table_catalog,
  tc.initially_deferred as initially_deferred,
  tc.is_deferrable as is_deferrable,
  kcu.column_name as column_name,
  ccu.table_schema AS referenced_table_schema,
  ccu.table_catalog AS referenced_table_catalog,
  ccu.table_name AS referenced_table_name,
  ccu.column_name AS referenced_column_name
FROM
  information_schema.table_constraints AS tc
  JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name
  JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name
WHERE
  constraint_type = 'FOREIGN KEY'
  AND tc.table_name = 'Likes'
  AND tc.table_catalog = 'twitter_mini'
SELECT
  DISTINCT tc.constraint_name as constraint_name,
  tc.constraint_schema as constraint_schema,
  tc.constraint_catalog as constraint_catalog,
  tc.table_name as table_name,
  tc.table_schema as table_schema,
  tc.table_catalog as table_catalog,
  tc.initially_deferred as initially_deferred,
  tc.is_deferrable as is_deferrable,
  kcu.column_name as column_name,
  ccu.table_schema AS referenced_table_schema,
  ccu.table_catalog AS referenced_table_catalog,
  ccu.table_name AS referenced_table_name,
  ccu.column_name AS referenced_column_name
FROM
  information_schema.table_constraints AS tc
  JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name
  JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name
WHERE
  constraint_type = 'FOREIGN KEY'
  AND tc.table_name = 'tweets'
  AND tc.table_catalog = 'twitter_mini'
SELECT
  DISTINCT tc.constraint_name as constraint_name,
  tc.constraint_schema as constraint_schema,
  tc.constraint_catalog as constraint_catalog,
  tc.table_name as table_name,
  tc.table_schema as table_schema,
  tc.table_catalog as table_catalog,
  tc.initially_deferred as initially_deferred,
  tc.is_deferrable as is_deferrable,
  kcu.column_name as column_name,
  ccu.table_schema AS referenced_table_schema,
  ccu.table_catalog AS referenced_table_catalog,
  ccu.table_name AS referenced_table_name,
  ccu.column_name AS referenced_column_name
FROM
  information_schema.table_constraints AS tc
  JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name
  JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name
WHERE
  constraint_type = 'FOREIGN KEY'
  AND tc.table_name = 'users'
  AND tc.table_catalog = 'twitter_mini' DROP TABLE IF EXISTS "Likes" CASCADE;

DROP TABLE IF EXISTS "tweets" CASCADE;

DROP TABLE IF EXISTS "users" CASCADE;

DROP TABLE IF EXISTS "users" CASCADE;

CREATE TABLE IF NOT EXISTS "users" (
  "id" UUID,
  "createdAt" TIMESTAMP WITH TIME ZONE,
  "updatedAt" TIMESTAMP WITH TIME ZONE,
  "username" VARCHAR(20) NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  PRIMARY KEY ("id")
);

SELECT
  i.relname AS name,
  ix.indisprimary AS primary,
  ix.indisunique AS unique,
  ix.indkey AS indkey,
  array_agg(a.attnum) as column_indexes,
  array_agg(a.attname) AS column_names,
  pg_get_indexdef(ix.indexrelid) AS definition
FROM
  pg_class t,
  pg_class i,
  pg_index ix,
  pg_attribute a
WHERE
  t.oid = ix.indrelid
  AND i.oid = ix.indexrelid
  AND a.attrelid = t.oid
  AND t.relkind = 'r'
  and t.relname = 'users'
GROUP BY
  i.relname,
  ix.indexrelid,
  ix.indisprimary,
  ix.indisunique,
  ix.indkey
ORDER BY
  i.relname;

DROP TABLE IF EXISTS "tweets" CASCADE;

CREATE TABLE IF NOT EXISTS "tweets" (
  "id" UUID,
  "createdAt" TIMESTAMP WITH TIME ZONE,
  "updatedAt" TIMESTAMP WITH TIME ZONE,
  "content" TEXT,
  "userId" UUID REFERENCES "users" ("id") ON DELETE
  SET
    NULL ON UPDATE CASCADE,
    "parentId" UUID REFERENCES "tweets" ("id") ON DELETE
  SET
    NULL ON UPDATE CASCADE,
    "quotedId" UUID REFERENCES "tweets" ("id") ON DELETE
  SET
    NULL ON UPDATE CASCADE,
    PRIMARY KEY ("id")
);

SELECT
  i.relname AS name,
  ix.indisprimary AS primary,
  ix.indisunique AS unique,
  ix.indkey AS indkey,
  array_agg(a.attnum) as column_indexes,
  array_agg(a.attname) AS column_names,
  pg_get_indexdef(ix.indexrelid) AS definition
FROM
  pg_class t,
  pg_class i,
  pg_index ix,
  pg_attribute a
WHERE
  t.oid = ix.indrelid
  AND i.oid = ix.indexrelid
  AND a.attrelid = t.oid
  AND t.relkind = 'r'
  and t.relname = 'tweets'
GROUP BY
  i.relname,
  ix.indexrelid,
  ix.indisprimary,
  ix.indisunique,
  ix.indkey
ORDER BY
  i.relname;

DROP TABLE IF EXISTS "Likes" CASCADE;

CREATE TABLE IF NOT EXISTS "Likes" (
  "id" UUID,
  "createdAt" TIMESTAMP WITH TIME ZONE,
  "updatedAt" TIMESTAMP WITH TIME ZONE,
  "userId" UUID REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "tweetId" UUID REFERENCES "tweets" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE ("userId", "tweetId"),
  PRIMARY KEY ("id")
);

SELECT
  i.relname AS name,
  ix.indisprimary AS primary,
  ix.indisunique AS unique,
  ix.indkey AS indkey,
  array_agg(a.attnum) as column_indexes,
  array_agg(a.attname) AS column_names,
  pg_get_indexdef(ix.indexrelid) AS definition
FROM
  pg_class t,
  pg_class i,
  pg_index ix,
  pg_attribute a
WHERE
  t.oid = ix.indrelid
  AND i.oid = ix.indexrelid
  AND a.attrelid = t.oid
  AND t.relkind = 'r'
  and t.relname = 'Likes'
GROUP BY
  i.relname,
  ix.indexrelid,
  ix.indisprimary,
  ix.indisunique,
  ix.indkey
ORDER BY
  i.relname;

SELECT
  COUNT("Like"."id") AS "count"
FROM
  "likes" AS "Like"
WHERE
  "Like"."tweetId" = '07f209e2-09af-4a35-a7ca-9a7ec0355859';

SELECT
  "Tweet"."id",
  "Tweet"."createdAt",
  "Tweet"."updatedAt",
  "Tweet"."content",
  "Tweet"."type",
  "Tweet"."userId",
  "Tweet"."parentId",
  "Tweet"."quotedId",
  COUNT("comments"."id") AS "commentCount",
  "comments"."id" AS "comments.id"
FROM
  "tweets" AS "Tweet"
  LEFT OUTER JOIN "tweets" AS "comments" ON "Tweet"."id" = "comments"."parentId"
WHERE
  "Tweet"."id" = '07f209e2-09af-4a35-a7ca-9a7ec0355859'
GROUP BY
  "Tweet"."id",
  "comments"."id";