
'use strict'

const beforeAll = (opt) => `\


`
// DROP TABLE IF EXISTS "${opt.schema}".trips_weekday;
// CREATE TABLE "${opt.schema}".trips_weekday (id serial, trip_id TEXT, route_type "${opt.schema}"."route_type_val", weekdays boolean[]);
// INSERT INTO "${opt.schema}".trips_weekday(trip_id, route_type, weekdays)
// SELECT t.trip_id, t.route_type, ARRAY[
// (('{"available": "true", "not_available": "false"}'::jsonb) ->> c.monday::text)::boolean,
// (('{"available": "true", "not_available": "false"}'::jsonb) ->> c.tuesday::text)::boolean,
// (('{"available": "true", "not_available": "false"}'::jsonb) ->> c.wednesday::text)::boolean,
// (('{"available": "true", "not_available": "false"}'::jsonb) ->> c.thursday::text)::boolean,
// (('{"available": "true", "not_available": "false"}'::jsonb) ->> c.friday::text)::boolean,
// (('{"available": "true", "not_available": "false"}'::jsonb) ->> c.saturday::text)::boolean,
// (('{"available": "true", "not_available": "false"}'::jsonb) ->> c.sunday::text)::boolean
// ] AS weekdays
// FROM
//  (
//  SELECT t.trip_id, t.service_id, r.route_type
// 	FROM "${opt.schema}".trips t, "${opt.schema}".routes r
//     WHERE t.route_id = r.route_id
//  ) t, "${opt.schema}".calendar c
// WHERE t.service_id = c.service_id
// AND '${opt.startDate}' >= start_date
// AND '${opt.endDate}' <= end_date;

// ALTER TABLE "${opt.schema}".trips_weekday ADD PRIMARY KEY (id);
// CREATE INDEX ON "${opt.schema}".trips_weekday (trip_id);
// CREATE TABLE "${opt.schema}".stop_times_optimized (
//     id serial4 NOT NULL,
//     trip_id text NULL,
//     arrival_time interval NULL,
//     stop_id text NULL,
//     route_type "${opt.schema}"."route_type_val" NULL,
//     weekdays _bool NULL
// );
// INSERT INTO "${opt.schema}".stop_times_optimized(trip_id, arrival_time, stop_id, route_type, weekdays)
// SELECT st.trip_id, st.arrival_time, stop_id, route_type, weekdays
// FROM "${opt.schema}".stop_times st, "${opt.schema}".trips_weekday w
// WHERE st.trip_id = w.trip_id;
// ALTER TABLE "${opt.schema}".stop_times_optimized ADD PRIMARY KEY(id);
// CREATE INDEX ON "${opt.schema}".stop_times_optimized(stop_id, arrival_time);

module.exports = {
	beforeAll,
}
