'use strict'

// https://developers.google.com/transit/gtfs/reference#shapestxt
const beforeAll = (opt) =>`\
CREATE UNLOGGED TABLE ${opt.schema}.shapes (
	id SERIAL PRIMARY KEY,
	shape_id TEXT,
	shape_pt_sequence INT,
	shape_pt_loc geometry(POINT, 4326),
	shape_dist_traveled REAL
);

COPY "${opt.schema}".shapes (
	shape_id,
	shape_pt_loc,
	shape_pt_sequence,
	shape_dist_traveled
) FROM STDIN csv;
`

const formatShapesRow = (s) => {
	return [
		s.shape_id || null,
		`POINT(${parseFloat(s.shape_pt_lon)} ${parseFloat(s.shape_pt_lat)})`,
		s.shape_pt_sequence ? parseInt(s.shape_pt_sequence) : null,
		s.shape_dist_traveled ? parseInt(s.shape_dist_traveled) : null,
	]
}

const afterAll = (opt) => `\
\\.

CREATE INDEX shapes_by_shape_id ON ${opt.schema}.shapes (shape_id);
CREATE INDEX ON ${opt.schema}.shapes (shape_id, shape_pt_sequence);
CREATE INDEX ON ${opt.schema}.shapes USING gist (shape_pt_loc);

CREATE OR REPLACE VIEW "${opt.schema}".shapes_aggregated AS
SELECT
	shape_id,
	array_agg(shape_dist_traveled) AS distances_travelled,
	ST_MakeLine(array_agg(shape_pt_loc)) AS shape
FROM (
	SELECT
		shape_id,
		shape_dist_traveled,
		ST_AsText(shape_pt_loc)::geometry AS shape_pt_loc
	FROM "${opt.schema}".shapes
	ORDER by shape_id, shape_pt_sequence
) shapes
GROUP BY shape_id;

ALTER TABLE ${opt.schema}.shapes SET LOGGED
`

module.exports = {
	beforeAll,
	formatRow: formatShapesRow,
	afterAll,
}
