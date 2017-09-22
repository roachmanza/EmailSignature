

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
CREATE TABLE public."CsiContactCategories"
(
    "CsiContactCategoryId" integer NOT NULL,
    "Name" character varying COLLATE pg_catalog."default",
    "Description" character varying COLLATE pg_catalog."default",
    "InActiveDate" date,
    "InActive" bit(1),
    CONSTRAINT "CsiContactCategories_pkey" PRIMARY KEY ("CsiContactCategoryId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;
ALTER TABLE public."CsiContactCategories" OWNER TO "MailEnhancementUser";

--|| NO 1.5 ||--
CREATE TABLE public."CsiMainContactTypes"
(
    "CsiMainContactTypeId" integer NOT NULL,
    "Name" character varying COLLATE pg_catalog."default",
    "Description" character varying COLLATE pg_catalog."default",
    "InActiveDate" date,
    "InActive" bit(1),
    CONSTRAINT "CsiContactType_pkey" PRIMARY KEY ("CsiContactTypeId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;
ALTER TABLE public."CsiMainContactTypes" OWNER TO "MailEnhancementUser";

--||=================||--
--|| SECOND SEQUENCE ||--
--||=================||--
--|| NO 2.1 ||--
CREATE TABLE public."CsiContactCategoryMappings"
(
    "CsiContactCategoryMappingId" integer NOT NULL,
    "CsiContactCategoryId" integer NOT NULL,
    "ContactTypeId" integer NOT NULL,
    "Name" character varying COLLATE pg_catalog."default",
    "Description" character varying COLLATE pg_catalog."default",
    "InActiveDate" date,
    "InActive" bit(1),
    CONSTRAINT "CsiContactType_pkey" PRIMARY KEY ("CsiContactTypeId"),
    CONSTRAINT "CsiContactCategoryMappings_CsiContactCategories_fkey" FOREIGN KEY ("CsiContactCategoryId")
        REFERENCES public."CsiContactCategories" ("CsiContactCategoryId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "CsiContactCategoryMappings_ContactTypes_fkey" FOREIGN KEY ("ContactTypeId")
        REFERENCES public."ContactTypes" ("ContactTypeId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;
ALTER TABLE public."CsiContactCategoryMappings" OWNER TO "MailEnhancementUser";


--|| NO 2.2 ||--
CREATE TABLE public."CsiContactTypes"
(
    "CsiContactTypeId" integer NOT NULL,
    "CsiMainContactTypeId" integer NOT NULL,
    "Name" character varying COLLATE pg_catalog."default",
    "Description" character varying COLLATE pg_catalog."default",
    "InActiveDate" date,
    "InActive" bit(1),
    CONSTRAINT "CsiContactType_pkey" PRIMARY KEY ("CsiContactTypeId"),
    CONSTRAINT "CsiContactTypes_CsiMainContactTypes_fkey" FOREIGN KEY ("CsiMainContactTypeId")
        REFERENCES public."CsiMainContactTypes" ("CsiMainContactTypeId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;
ALTER TABLE public."CsiContactTypes" OWNER TO "MailEnhancementUser";



--|| NO 2.3 ||--
CREATE TABLE public."AwdContactTypeMappings"
(
    "AwdContactTypeMappingId" integer NOT NULL,
    "ContactTypeId" integer NOT NULL,
    "AwdRegion" character varying COLLATE pg_catalog."default",
    "AwdContactRole" character varying COLLATE pg_catalog."default",
    "Name" character varying COLLATE pg_catalog."default",
    "Description" character varying COLLATE pg_catalog."default",
    "InActiveDate" date,
    "InActive" bit(1),
    CONSTRAINT "AwdContactTypeMappings_pkey" PRIMARY KEY ("AwdContactTypeMappingId"),
    CONSTRAINT "AwdContactTypeMappings_ContactTypes_fkey" FOREIGN KEY ("ContactTypeId")
        REFERENCES public."ContactTypes" ("ContactTypeId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;
ALTER TABLE public."AwdContactTypeMappings" OWNER TO "MailEnhancementUser";

--|| NO 2.4 ||--
CREATE TABLE public."CsiContactTypeMappings"
(
    "CsiContactTypeMappingId" integer NOT NULL,
    "ContactTypeId" integer NOT NULL,
    "AwdRegion" character varying COLLATE pg_catalog."default",
    "AwdContactRole" character varying COLLATE pg_catalog."default",
    "Name" character varying COLLATE pg_catalog."default",
    "Description" character varying COLLATE pg_catalog."default",
    "InActiveDate" date,
    "InActive" bit(1),
    CONSTRAINT "CsiContactTypeMappings_pkey" PRIMARY KEY ("CsiContactTypeMappingId"),
    CONSTRAINT "CsiContactTypeMappings_ContactTypes_fkey" FOREIGN KEY ("ContactTypeId")
        REFERENCES public."ContactTypes" ("ContactTypeId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;
ALTER TABLE public."CsiContactTypeMappings" OWNER TO "MailEnhancementUser";


--|| NO 2.5 ||--
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

--|| NO 2.6 ||--
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