# Migration `20210619230944-profile`

This migration has been generated by ivan-jb-mak at 6/19/2021, 7:09:44 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Post" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "viewCount"

ALTER TABLE "public"."User" ALTER COLUMN "password" SET DEFAULT E''

CREATE TABLE "public"."Profile" (
"id" SERIAL,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"bio" text   ,
"location" text   ,
"website" text   ,
"avatar" text   ,
"userId" integer   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Tweet" (
"id" SERIAL,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"content" text   ,
"authorId" integer   ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "Profile.userId_unique" ON "public"."Profile"("userId")

ALTER TABLE "public"."Profile" ADD FOREIGN KEY("userId")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Tweet" ADD FOREIGN KEY("authorId")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210619023152-first..20210619230944-profile
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model Post {
   id        Int     @default(autoincrement()) @id
@@ -21,5 +21,26 @@
   email    String  @unique
   password String  @default("")
   name     String?
   posts    Post[]
-}
+  Profile  Profile?
+  Tweet    Tweet[]
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
+}
+
+model Tweet {
+  id        Int          @id @default(autoincrement())
+  createdAt DateTime     @default(now())
+  content   String?
+  author    User?        @relation(fields: [authorId], references: [id])
+  authorId  Int?
+}
```


