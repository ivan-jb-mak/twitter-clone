# Migration `20210621235827-add-likes`

This migration has been generated by ivan-jb-mak at 6/21/2021, 7:58:27 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."LikedTweet" (
"id" SERIAL,
"likedAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"userId" integer   ,
"tweetId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

ALTER TABLE "public"."LikedTweet" ADD FOREIGN KEY("tweetId")REFERENCES "public"."Tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."LikedTweet" ADD FOREIGN KEY("userId")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210619233309-profile2..20210621235827-add-likes
--- datamodel.dml
+++ datamodel.dml
@@ -1,37 +1,47 @@
-generator client {
-  provider = "prisma-client-js"
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+model Tweet {
+  id        Int          @id @default(autoincrement())
+  createdAt DateTime     @default(now())
+  content   String?
+  likes     LikedTweet[]
+  author    User?        @relation(fields: [authorId], references: [id])
+  authorId  Int?
+}
+
+model User {
+  id         Int          @id @default(autoincrement())
+  email      String       @unique
+  password   String       @default("")
+  name       String?
+  Tweet      Tweet[]
+  Profile    Profile?
+  likedTweet LikedTweet[]
+}
+
+model LikedTweet {
+  id      Int      @id @default(autoincrement())
+  tweet   Tweet    @relation(fields: [tweetId], references: [id])
+  likedAt DateTime @default(now())
+  userId  Int?
+  User    User?    @relation(fields: [userId], references: [id])
+  tweetId Int
+}
+
+model Profile {
+  id        Int      @id @default(autoincrement())
+  createdAt DateTime @default(now())
+  bio       String?
+  location  String?
+  website   String?
+  avatar    String?
+  userId    Int?     @unique
+  User      User?    @relation(fields: [userId], references: [id])
 }
-
-datasource db {
-  provider = "postgresql"
-  url = "***"
-}
-
-model Tweet {
-  id        Int          @id @default(autoincrement())
-  createdAt DateTime     @default(now())
-  content   String?
-  author    User?        @relation(fields: [authorId], references: [id])
-  authorId  Int?
-}
-
-model User {
-  id       Int     @default(autoincrement()) @id
-  email    String  @unique
-  password String  @default("")
-  name     String?
-  Profile  Profile?
-  Tweet    Tweet[]
-}
-
-model Profile {
-  id        Int      @id @default(autoincrement())
-  createdAt DateTime @default(now())
-  bio       String?
-  location  String?
-  website   String?
-  avatar    String?
-  userId    Int?     @unique
-  User      User?    @relation(fields: [userId], references: [id])
-}
-
```

