

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
(geom, layer_id, "name", jsonb_data)
select st_transform(geom, 3857) as geom, 2, 'Лесничество', jsonb_data from (
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
(geom, layer_id, "name", jsonb_data)
select st_transform(geom, 3857) as geom, 3, 'Лесничество', jsonb_data from (
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
(geom, layer_id, "name", jsonb_data)
select st_transform(geom, 3857) as geom, 1, 'Лесничество', jsonb_data from (
  select id, geom,
    (
      select row_to_json(d)
      from (
        select type as type_data, les_name as les, uch_les_name as uch_les, uroch_name as uroch
        from public.forest_contour d
        where d.id=s.id 
      ) d
    ) as jsonb_data
  from public.forest_contour s
) a


CREATE INDEX JsonFieldIndex ON public.geores_feature USING GIN (jsonb_data);
CREATE INDEX HStoreFieldIndex ON public.geores_feature USING GIN (hstore_data);

UPDATE public.geores_feature
SET layer_id=2
WHERE type_data=5




INSERT INTO public.geores_forest_data
("name", jsonb_data, geom)
SELECT "name", jsonb_data, geom
FROM public.geores_feature where jsonb_data->>'type_data' = '1' or jsonb_data->>'type_data' = '2' or jsonb_data->>'type_data' = '3';


CREATE INDEX geores_feature_geom_geohash_idx
  ON public.geores_feature
  USING btree
  (st_geohash(st_transform(geom, 4326)) COLLATE pg_catalog."default");
ALTER TABLE public.geores_feature CLUSTER ON geores_feature_geom_geohash_idx;
