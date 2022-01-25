

UPDATE public.geores_feature
SET geom=?, "name"='', layer_id=0, kvartal=0, lesnichestvo='', uch_lesnichestvo='', urochishe='', preferences=''
WHERE id=nextval('geores_feature_id_seq'::regclass);


select row_to_json(x)::jsonb, x.id from (select id, kvartal, lesnichestvo, uch_lesnichestvo, urochishe from public.geores_feature where "name" IN ('kvartal','kvartal-point')) x;



UPDATE public.geores_feature
SET preferences=subquery.preferences
FROM (select row_to_json(x)::jsonb as preferences, x.id as id from (select id, kvartal, lesnichestvo, uch_lesnichestvo, urochishe from public.geores_feature where "name" IN ('kvartal','kvartal-point')) x) AS subquery
WHERE geores_feature.id=subquery.id;




SELECT id, geom, "name", layer_id, kvartal, lesnichestvo, uch_lesnichestvo, urochishe, preferences
FROM public.geores_feature;





UPDATE public.geores_feature
SET "name"='forest_data'


CREATE INDEX geores_feature_geom_geohash_idx
  ON public.geores_feature
  USING btree
  (st_geohash(st_transform(geom, 4326)) COLLATE pg_catalog."default");
ALTER TABLE public.geores_feature CLUSTER ON geores_feature_geom_geohash_idx;

-- Index: forest_data.sidx_forest_contour_geom

-- DROP INDEX forest_data.sidx_forest_contour_geom;

CREATE INDEX sidx_geores_feature_geom
  ON public.geores_feature
  USING gist
  (geom);

SELECT id, geom, les_name
FROM public.geores_feature;

 
UPDATE public.geores_feature
SET jsonb_data=subquery.data
FROM (select * from (
  select id,
    (
      select row_to_json(d)
      from (
        select les_name as les, uch_les_name as uch_les, uroch_name as uroch
        from public.geores_feature d
        where d.id=s.id
      ) d
    ) as data
  from public.geores_feature s
) a) AS subquery
WHERE geores_feature.id=subquery.id;
 
 
UPDATE public.geores_feature
SET hstore_data=subquery.hstore_data
FROM (select simple_jsonb_to_hstore(jsonb_data) as hstore_data, id from public.geores_feature) AS subquery
WHERE geores_feature.id=subquery.id;


select * from (
  select id,
    (
      select row_to_json(d)
      from (
        select les_name, uch_les_name, uroch_name
        from public.geores_feature d
        where d.id=s.id
      ) d
    ) as data
  from public.geores_feature s
) a


create or replace function simple_jsonb_to_hstore(jdata jsonb)
returns hstore language sql immutable
as $$
    select hstore(array_agg(key), array_agg(value))
    from jsonb_each_text(jdata)
$$;
ALTER TABLE users ALTER COLUMN details TYPE hstore USING simple_jsonb_to_hstore(details);



INSERT INTO public.geores_feature
(geom, layer_id, "name", type_data, jsonb_data)
VALUES(?, 0, '', 0, '');


select simple_jsonb_to_hstore(row_to_json(x)::jsonb) as preferences, x.id as id from (
SELECT id, geom, lesnichestvo, uch_lesnichestvo, urochishe, kvartal
FROM public.forest_kvartal_txt) x


select simple_jsonb_to_hstore(row_to_json(x)::jsonb) as preferences, x.id as id from (select id, les_name, uch_les_name, uroch_name from public.geores_feature) x

INSERT INTO public.geores_feature
(geom, layer_id, "name", type_data, jsonb_data)
select geom, 4, 'Квартал', 4, jsonb_data from (
  select id, geom,
    (
      select row_to_json(d)
      from (
        select lesnichestvo as les, uch_lesnichestvo as uch_les, urochishe as uroch, kvartal
        from public.forest_kvartal_txt d
        where d.id=s.id
      ) d
    ) as jsonb_data
  from public.forest_kvartal_txt s
) a


INSERT INTO public.geores_feature
(geom, layer_id, "name", type_data, jsonb_data)
select geom, 5, 'Выдел',5 , jsonb_data from (
  select id, geom,
    (
      select row_to_json(d)
      from (
        select lesnichestvo as les, uch_lesnichestvo as uch_les, urochishe as uroch, kvartal, vydel, land_categories, poroda, poroda_txt, category, group_data
        from public."Исправленныегеометрии" d
        where d.id=s.id
      ) d
    ) as jsonb_data
  from public."Исправленныегеометрии" s
) a

INSERT INTO public.geores_feature
(geom, layer_id, jsonb_data)
select geom, 3, jsonb_data from (
  select id, geom, 
    (
      select row_to_json(d)
      from (
        select les_name as les, uch_les_name as uch_les, uroch_name as uroch
        from public.forest_contour d
        where d.id=s.id 
      ) d
    ) as jsonb_data
  from public.forest_contour s where type=3
) a 


CREATE INDEX JsonFieldIndex ON public.geores_feature USING GIN (jsonb_data);
CREATE INDEX HStoreFieldIndex ON public.geores_feature USING GIN (hstore_data);

UPDATE public.geores_feature
SET layer_id=1
WHERE type_data=5




INSERT INTO public.geores_forest_data
("name", jsonb_data, geom)
SELECT "name", jsonb_data, geom
FROM public.geores_feature where jsonb_data->>'type_data' = '1' or jsonb_data->>'type_data' = '2' or jsonb_data->>'type_data' = '3';




UPDATE public.geores_feature
SET type_les=subquery.type_les
FROM (SELECT id, jsonb_data->>'type_data' as type_les
FROM public.geores_feature where jsonb_data->>'type_data' = '1' or jsonb_data->>'type_data' = '2' or jsonb_data->>'type_data' = '3') AS subquery
WHERE geores_feature.id=subquery.id;



CREATE INDEX geores_feature_geom_geohash_idx
  ON public.geores_feature
  USING btree
  (st_geohash(st_transform(geom, 4326)) COLLATE pg_catalog."default");
ALTER TABLE public.geores_feature CLUSTER ON geores_feature_geom_geohash_idx;


UPDATE public.geores_feature
SET layer_id=1








INSERT INTO public.geores_smoothed_border
(area, geom)
SELECT area, st_transform(geom, 4326)
FROM public.geores_smoothed_border_import;


INSERT INTO public.geores_forest_data
(geom, jsonb_data, "name")
SELECT geom, jsonb_data, "name"
FROM public.geores_feature;

CREATE INDEX geores_forest_data_geom_geohash_idx
  ON public.geores_forest_data
  USING btree
  (st_geohash(st_transform(geom, 4326)) COLLATE pg_catalog."default");
ALTER TABLE public.geores_forest_data CLUSTER ON geores_forest_data_geom_geohash_idx;






INSERT INTO public.geores_feature
(layer_id, "name", geom)
select 1, 'Лесничество', geom from forest_contour


UPDATE public.geores_feature
SET layer_id=2
WHERE type_les IS NULL and jsonb_data->>'type_data' = '4'


UPDATE public.geores_feature
SET layer_id=3
WHERE type_les IS NULL and jsonb_data->>'type_data' = '5'


CREATE INDEX type_data_int_btree_idx ON public.geores_feature (((jsonb_data ->> 'type_data')::int));
create index hstore_data_idx on public.geores_feature using gin(hstore_data);


CREATE INDEX geores_feature_type_data
  ON public.geores_feature
  USING btree
  (type_data);



UPDATE public.geores_feature
SET type_data=subquery.type_data::int
FROM (select id, hstore_data -> 'type_data' AS type_data from public.geores_feature) AS subquery
WHERE geores_feature.id=subquery.id;



INSERT INTO public.geores_mypolygon
(geometry, type_data)

select st_transform(geom,3857), 4 as type_data
        from public.forest_kvartal_txt


INSERT INTO public.geores_mypolygon
(geometry, type_data)

select st_transform(geom,3857), 5 as type_data
        from public."Исправленныегеометрии" d

        
INSERT INTO public.geores_mypolygon
(geometry, type_data)

select st_transform(geom,3857), type as type_data
        from public.forest_contour
        
        
        
        
CREATE INDEX geores_mypolygon_geometry_geohash_idx
  ON public.geores_mypolygon
  USING btree
  (st_geohash(st_transform(geometry, 4326)) COLLATE pg_catalog."default");
ALTER TABLE public.geores_mypolygon CLUSTER ON geores_mypolygon_geometry_geohash_idx;

CREATE INDEX geores_mypolygon_type_data ON public.geores_mypolygon USING btree (type_data)










INSERT INTO public.geores_feature
(layer_id, "name", geom, type_data)

select  1, 'Лесничество', geom, 4 as type_data
        from public.forest_kvartal_txt


INSERT INTO public.geores_feature
(layer_id, "name", geom, type_data)


select 1, 'Лесничество', geom, 5 as type_data
        from public."Исправленныегеометрии" d

        
INSERT INTO public.geores_mypolygon
(geometry, type_data)

select st_transform(geom,3857), type as type_data
        from public.forest_contour




UPDATE public.geores_feature
SET layer_id=2
WHERE type_data=4;

UPDATE public.geores_feature
SET layer_id=3
WHERE type_data=5;


CREATE INDEX kvartal_int_btree_idx ON public.geores_feature (((jsonb_data ->> 'kvartal')::text));
CREATE INDEX vydel_int_btree_idx ON public.geores_feature (((jsonb_data ->> 'vydel')::text));



CREATE INDEX idx_btree_jsonb_data_path ON public.geores_feature USING GIN (jsonb_data jsonb_path_ops);
CREATE INDEX idx_btree_jsonb_data ON public.geores_feature USING GIN (jsonb_data jsonb_ops);

CREATE INDEX idx_btree_jsonb_data ON public.geores_feature USING HASH ((jsonb_data->>'vydel'));

create index ginner on public.geores_feature using gin(jsonb_data);

create index IX_1 on public.geores_feature using BTree((jsonb_data->'vydel'->>'vydel'));

CREATE INDEX user_reputation_idx ON public.geores_feature(cast("jsonb_data"->>'vydel' AS int));

