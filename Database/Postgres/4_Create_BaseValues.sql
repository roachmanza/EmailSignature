
INSERT INTO public."ContactTypes"(
	"ContactTypeId", "Name", "Description","EmailAddress", "InActive", "InActiveDate")
	VALUES (1, 'Investo', 'Investo','a@b.c', '0', '1900-01-01'),
    (2, 'Myriad', 'Myriad','myriad@mmiholdings.co.za', '0', '1900-01-01'),
    (3, 'Preferred clients', 'Preferred clients','preferredclients@mmiholdings.co.za', '0', '1900-01-01'),
    (4, 'STI', 'Short tem insurance','sti@mmiholdings.co.za', '0', '1900-01-01');

INSERT INTO public."FieldTypes"(
	"FieldTypeId", "Name", "Description", "InActive", "InActiveDate")
	VALUES (1, 'Text', 'String', '0', '1900-01-01'),
    (2, 'Email', 'Email', '0', '1900-01-01'),
    (3, 'Phone number', 'Phone number', '0', '1900-01-01'),
    (4, 'Fax number', 'Fax number', '0', '1900-01-01'),
    (5, 'Operating hours', 'Operating hours', '0', '1900-01-01');

INSERT INTO public."Languages"(
	"LanguageId", "Name", "Description","Code", "InActive", "InActiveDate")
	VALUES
    (1, 'Afrikaans', 'Afrikaans','AFR', '0', '1900-01-01'), 
    (2, 'English', 'English','ENG' ,'0', '1900-01-01');
