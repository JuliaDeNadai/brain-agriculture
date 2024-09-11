/* Replace with your SQL commands */
CREATE TABLE public."Producer" (
	id serial NOT NULL,
	name varchar NOT NULL,
	cpf_cnpj varchar NOT NULL,
	CONSTRAINT producer_unique UNIQUE (cpf_cnpj),
	CONSTRAINT producer_pk PRIMARY KEY (id)
);

CREATE TABLE public."Farm" (
	id serial NOT NULL,
	name varchar NULL,
	city varchar NULL,
	state varchar NULL,
	total_area numeric NULL,
	arable_area numeric NULL,
	vegetable_area numeric NULL,
	producer int NOT NULL,
	CONSTRAINT farm_unique UNIQUE (producer, id),
	CONSTRAINT farm_pk PRIMARY KEY (id),
	CONSTRAINT farm_producer_fk 
		FOREIGN KEY (producer) 
		REFERENCES public."Producer"(id) 
		ON UPDATE SET NULL
);

CREATE TABLE public."Crop" (
    id serial NOT NULL,
	name varchar NULL,
	CONSTRAINT crop_pk PRIMARY KEY (id)
);

CREATE TABLE public."Farm_Crop" (
    farm int NOT NULL,
    crop int NOT NULL,
    CONSTRAINT farm_crop_unique UNIQUE (farm, crop),
    CONSTRAINT farm_fk 
		FOREIGN KEY (farm) 
		REFERENCES public."Farm"(id) 
		ON UPDATE SET null,
    CONSTRAINT crop_fk 
		FOREIGN KEY (crop) 
		REFERENCES public."Crop"(id) 
		ON UPDATE SET NULL
);


INSERT INTO "Crop" ( name ) 
	VALUES 
		('Soja'),
		('Milho'),
		('Algodão'),
		('Café'),
		('Cana de Açucar');
