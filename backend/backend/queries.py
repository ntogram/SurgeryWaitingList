from sqlalchemy import text

QUERY_SURGERIES_BY_ORGAN = text("""select organName  AS organ,
    SUM(CASE WHEN property = 'Μόνιμος Στρατιωτικός' THEN counter ELSE 0 END) AS 'Μόνιμοι Στρατιωτικοί',
	SUM(CASE WHEN property = 'Έφεδρος Στρατιωτικός' THEN counter ELSE 0 END) AS 'Έφεδροι Στρατιωτικοί',
	SUM(CASE WHEN property = 'Αστυνομικός' THEN counter ELSE 0 END) AS 'Αστυνομικοί',
    SUM(CASE WHEN property = 'Απόστρατος' THEN counter ELSE 0 END) AS 'Απόστρατοι',
	SUM(CASE WHEN property = 'Μέλος' THEN counter ELSE 0 END) AS 'Μέλη',
	SUM(CASE WHEN property = 'Ιδιώτης' THEN counter ELSE 0 END) AS 'Ιδιώτες'

FROM (
select surgerywaitinglist.organ_property_combinations.name AS organName,surgerywaitinglist.organ_property_combinations.property as property,COALESCE(counter,0) as counter
from(SELECT surgeries.organ AS organName,surgerywaitinglist.patients.property as property ,count(*) as counter  FROM 
surgerywaitinglist.surgeries  JOIN 
surgerywaitinglist.patients 
ON (surgerywaitinglist.surgeries.patientId=surgerywaitinglist.patients.ID)
WHERE referral=0 AND surgeryDate IS  NULL AND ACTIVE=1 
GROUP BY surgerywaitinglist.surgeries.organ,surgerywaitinglist.patients.property
ORDER  BY surgerywaitinglist.surgeries.organ,surgerywaitinglist.patients.property DESC
) as existing_surgery_data
right join surgerywaitinglist.organ_property_combinations on (
surgerywaitinglist.organ_property_combinations.name = existing_surgery_data.organName 
and surgerywaitinglist.organ_property_combinations.property =  existing_surgery_data.property
)
ORDER BY surgerywaitinglist.organ_property_combinations.name,surgerywaitinglist.organ_property_combinations.property) as statisticsbyOrgan
GROUP BY organName
ORDER by organName;""")


QUERY_SURGERIES_BY_SURGERYTYPE = text("""SELECT 
    name as surgery,
	SUM(CASE WHEN property = 'Μόνιμος Στρατιωτικός' THEN counter ELSE 0 END) AS 'Μόνιμοι Στρατιωτικοί',
	SUM(CASE WHEN property = 'Έφεδρος Στρατιωτικός' THEN counter ELSE 0 END) AS 'Έφεδροι Στρατιωτικοί',
	SUM(CASE WHEN property = 'Αστυνομικός' THEN counter ELSE 0 END) AS 'Αστυνομικοί',
	SUM(CASE WHEN property = 'Απόστρατος' THEN counter ELSE 0 END) AS 'Απόστρατοι',
	SUM(CASE WHEN property = 'Μέλος' THEN counter ELSE 0 END) AS 'Μέλη',
	SUM(CASE WHEN property = 'Ιδιώτης' THEN counter ELSE 0 END) AS 'Ιδιώτες'
FROM 
    (select surgerywaitinglist.surgery_property_combinations.name AS name,surgerywaitinglist.surgery_property_combinations.property as property,COALESCE(counter,0) as counter
from(
SELECT surgeries.surgeryName AS surgeryName,surgerywaitinglist.patients.property as property ,count(*) as counter  FROM 
surgerywaitinglist.surgeries  JOIN 
surgerywaitinglist.patients 
ON (surgerywaitinglist.surgeries.patientId=surgerywaitinglist.patients.ID)
WHERE referral=0 AND surgeryDate IS  NULL AND ACTIVE=1 
GROUP BY surgerywaitinglist.surgeries.surgeryName,surgerywaitinglist.patients.property
ORDER  BY surgerywaitinglist.surgeries.surgeryName,surgerywaitinglist.patients.property DESC
) as existing_surgery_data
right join surgerywaitinglist.surgery_property_combinations on
(surgerywaitinglist.surgery_property_combinations.name = existing_surgery_data.surgeryName 
and surgerywaitinglist.surgery_property_combinations.property =  existing_surgery_data.property)
ORDER BY surgerywaitinglist.surgery_property_combinations.name,surgerywaitinglist.surgery_property_combinations.property) AS statisticsbySurgeryType
GROUP BY name
ORDER BY name;
""")


QUERY_CALC_WAITING_TIME = text("""
SELECT 
    CASE 
        WHEN totalDuration < FLOOR(totalDuration) + 0.5 THEN FLOOR(totalDuration) + 0.5
        WHEN totalDuration > FLOOR(totalDuration) + 0.5 THEN ROUND(totalDuration)
        WHEN totalDuration is NULL then 0
        ELSE totalDuration
    END AS adjustedDuration
FROM (
    SELECT SUM(st.estimatedDuration) / 1800 AS totalDuration
    FROM surgerywaitinglist.surgeries s
    JOIN surgerywaitinglist.surgerytypes st 
    ON s.surgeryName = st.name
    WHERE s.surgeryDate IS NULL AND s.active = 1 AND s.referral = 0 and s.surgeryId != :surgeryId
) AS DURATION;
""")