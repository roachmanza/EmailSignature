

--||===============||--
--|| BASE TABLES   ||--
--||===============||--
 
--|| NO 1.1 ||--
CREATE TABLE public."ContactTypes"
(
    "ContactTypeId" integer NOT NULL,
    "Name" character varying COLLATE pg_catalog."default",
    "Description" character varying COLLATE pg_catalog."default",
    "EmailAddress" character varying COLLATE pg_catalog."default",
    "InActiveDate" date,
    "InActive" bit(1),
    CONSTRAINT "ContactTypes_pkey" PRIMARY KEY ("ContactTypeId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;
ALTER TABLE public."ContactTypes" OWNER TO "MailEnhancementUser";

--|| NO 1.2 ||--
CREATE TABLE public."FieldTypes"
(
    "FieldTypeId" integer NOT NULL,
    "Name" character varying COLLATE pg_catalog."default",
    "Description" character varying COLLATE pg_catalog."default",
    "InActiveDate" date,
    "InActive" bit(1),
    CONSTRAINT "FieldTypes_pkey" PRIMARY KEY ("FieldTypeId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;
ALTER TABLE public."FieldTypes" OWNER TO "MailEnhancementUser";

--|| NO 1.3 ||--
CREATE TABLE public."Languages"
(
    "LanguageId" integer NOT NULL,
    "Name" character varying COLLATE pg_catalog."default",
    "Description" character varying COLLATE pg_catalog."default",
    "Code" character varying COLLATE pg_catalog."default",
    "InActiveDate" date,
    "InActive" bit(1),
    CONSTRAINT "Languages_pkey" PRIMARY KEY ("LanguageId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;
ALTER TABLE public."Languages" OWNER TO "MailEnhancementUser";


--|| NO 1.4 ||--
CREATE TABLE public."FieldItems"
(
    "FieldItemId" integer NOT NULL,
    "LanguageId" integer NOT NULL,
    "FieldTypeId" integer NOT NULL,
    "Name" character varying COLLATE pg_catalog."default",
    "Description" character varying COLLATE pg_catalog."default",
    "Label" character varying COLLATE pg_catalog."default",
    "Value" character varying COLLATE pg_catalog."default",
    "PrintFormat" character varying COLLATE pg_catalog."default",    
    "InActiveDate" date,
    "InActive" bit(1),
    CONSTRAINT "FieldItems_pkey" PRIMARY KEY ("FieldItemId"),
    CONSTRAINT "FieldItems_Languages_fkey" FOREIGN KEY ("LanguageId")
        REFERENCES public."Languages" ("LanguageId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FieldItems_FieldTypes_fkey" FOREIGN KEY ("FieldTypeId")
        REFERENCES public."FieldTypes" ("FieldTypeId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;
ALTER TABLE public."FieldItems" OWNER TO "MailEnhancementUser";

--|| NO 1.5 ||--
CREATE TABLE public."SignatureItems"
(
    "SignatureItemId" integer NOT NULL,
    "ContactTypeId" integer NOT NULL,
    "FieldItemId" integer NOT NULL,
    "Sequence" integer NOT NULL,
    "InActiveDate" date,
    "InActive" bit(1),
    CONSTRAINT "SignatureItems_pkey" PRIMARY KEY ("SignatureItemId"),
    CONSTRAINT "SignatureItems_ContactTypes_fkey" FOREIGN KEY ("ContactTypeId")
        REFERENCES public."ContactTypes" ("ContactTypeId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "SignatureItems_FieldItems_fkey" FOREIGN KEY ("FieldItemId")
        REFERENCES public."FieldItems" ("FieldItemId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;
ALTER TABLE public."SignatureItems" OWNER TO "MailEnhancementUser";