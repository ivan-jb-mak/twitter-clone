# Migration `20210619233309-profile2`

This migration has been generated by ivan-jb-mak at 6/19/2021, 7:33:09 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_authorId_fkey"

DROP TABLE "public"."Post"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210619230944-profile..20210619233309-profile2
--- datamodel.dml
+++ datamodel.dml
@@ -3,26 +3,24 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
-model Post {
-  id        Int     @default(autoincrement()) @id
-  title     String
+model Tweet {
+  id        Int          @id @default(autoincrement())
+  createdAt DateTime     @default(now())
   content   String?
-  published Boolean @default(false)
-  author    User?   @relation(fields: [authorId], references: [id])
+  author    User?        @relation(fields: [authorId], references: [id])
   authorId  Int?
 }
 model User {
   id       Int     @default(autoincrement()) @id
   email    String  @unique
   password String  @default("")
   name     String?
-  posts    Post[]
   Profile  Profile?
   Tweet    Tweet[]
 }
@@ -36,11 +34,4 @@
   userId    Int?     @unique
   User      User?    @relation(fields: [userId], references: [id])
 }
-model Tweet {
-  id        Int          @id @default(autoincrement())
-  createdAt DateTime     @default(now())
-  content   String?
-  author    User?        @relation(fields: [authorId], references: [id])
-  authorId  Int?
-}
```


