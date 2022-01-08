

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
 
 
 UPDATE public.geores_feature
SET preferences_jsonb=subquery.preferences
FROM (select row_to_json(x)::jsonb as preferences, x.id as id from (select id, les_name, uch_les_name, uroch_name from public.geores_feature) x) AS subquery
WHERE geores_feature.id=subquery.id;
 
 
 UPDATE public.geores_feature
SET preferences_hstore=subquery.preferences
FROM (select simple_jsonb_to_hstore(row_to_json(x)::jsonb) as preferences, x.id as id from (select id, les_name, uch_les_name, uroch_name from public.geores_feature) x) AS subquery
WHERE geores_feature.id=subquery.id;





create or replace function simple_jsonb_to_hstore(jdata jsonb)
returns hstore language sql immutable
as $$
    select hstore(array_agg(key), array_agg(value))
    from jsonb_each_text(jdata)
$$;
ALTER TABLE users ALTER COLUMN details TYPE hstore USING simple_jsonb_to_hstore(details);



