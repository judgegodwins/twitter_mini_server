SELECT
  "Tweet"."id",
  "Tweet"."createdAt",
  "Tweet"."updatedAt",
  "Tweet"."content",
  "Tweet"."type",
  "Tweet"."userId",
  "Tweet"."parentId",
  "Tweet"."quotedId",
  (
    SELECT
      COUNT(tweet.id)
    FROM
      tweets AS tweet
    WHERE
      tweet."parentId" = "Tweet"."id"
  ) AS "commentCount",
  (
    SELECT
      COUNT(tweet.id)
    FROM
      tweets AS tweet
    WHERE
      tweet."quotedId" = "Tweet"."id"
  ) AS "totalRetweetCount",
  (
    SELECT
      COUNT(tweet.id)
    FROM
      tweets AS tweet
    WHERE
      (
        tweet."quotedId" = "Tweet"."id"
        AND tweet.type = 'retweet'
      )
  ) AS "retweetCount",
  (
    SELECT
      COUNT(tweet.id)
    FROM
      tweets AS tweet
    WHERE
      (
        tweet."quotedId" = "Tweet"."id"
        AND tweet.type = 'quote_retweet'
      )
  ) AS "quoteRetweetCount",
  COUNT("likes"."id") AS "likeCount",
  "user"."id" AS "user.id",
  "user"."createdAt" AS "user.createdAt",
  "user"."updatedAt" AS "user.updatedAt",
  "user"."name" AS "user.name",
  "user"."username" AS "user.username"
FROM
  "tweets" AS "Tweet"
  LEFT OUTER JOIN "users" AS "user" ON "Tweet"."userId" = "user"."id"
  LEFT OUTER JOIN "likes" AS "likes" ON "Tweet"."id" = "likes"."tweetId"
WHERE
  "Tweet"."parentId" = '07f209e2-09af-4a35-a7ca-9a7ec0355859'
GROUP BY
  "Tweet"."id",
  "user"."id"
LIMIT
  1 OFFSET 0;