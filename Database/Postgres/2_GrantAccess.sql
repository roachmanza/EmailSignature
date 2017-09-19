--Access on the database for AwardsDbUser

GRANT TEMPORARY, CONNECT ON DATABASE "MailEnhancement_Dev" TO PUBLIC;

GRANT ALL ON DATABASE "MailEnhancement_Dev" TO "MailEnhancementUser";

ALTER DEFAULT PRIVILEGES
GRANT ALL ON TABLES TO "MailEnhancementUser";
