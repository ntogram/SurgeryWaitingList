from sqlalchemy import text
from models import *
from sqlalchemy import case, func,and_,or_
from datetime import datetime



# retrieve list of patients
def formPatientsListQuery(db):
    #  display comparison operator based on severity
     severity_operator = case((SurgeryType.severity.in_(['Μικρή', 'Μεσαία', 'Μεγάλη']), '<'),else_='>')
     query  = db.session.query(
        Surgery.surgeryId.label('id'),
        Patient.name.label("name"),
        Patient.surname.label("surname"),
        Patient.fatherName.label("fatherName"),
        Patient.ID.label("patientId"),
        Patient.age.label("age"),
        Officer.officerRank.label("rank"),
        Officer.armyRank.label("armyRank"),
        func.concat(Patient.name, ' ', Patient.surname).label('patientName'), # get the conatenation of patient name and surname
        func.concat(SurgeryType.severity).label("severity"),
        Patient.property.label("property"), #get the property
        Surgery.disease.label('disease'),  # get the name of related disease
        Surgery.diseaseDescription.label("diseaseDescription"),
        Surgery.surgeonist.label("surgeonist"),
        Surgery.organ.label("organ"),
        Surgery.duty.label("duty"),
        Surgery.surgeryName.label("surgery"),
        Surgery.comments.label("comments"),
       func.date_format(Surgery.examDate, '%Y-%m-%d').label('examDate'), # get exam date IN YYYY-MM-DD format
       func.date_format(Surgery.surgeryDate, '%Y-%m-%d').label('surgeryDate'), # get surgery date IN YYYY-MM-DD format
        Soldier.dischargeDate.label('discharge_date'),
        case((and_(
                    Surgery.surgeryDate.is_(None),
                    Surgery.referral == 0,
                    or_(Soldier.dischargeDate.is_(None),Soldier.dischargeDate >= datetime.now())
                ),'Ναι'),else_="Όχι").label("active"), #calculate if patient remains in the surgeries list
         case((Surgery.referral == 1, 'Ναι'),else_='Όχι').label('referral'), # for true return Ναι else return Όχι
         case((Surgery.duty == 1, 'Ναι'),else_='Όχι').label('duty'),
         case(
            (Soldier.dischargeDate < datetime.now(),"Ναι"),
            (Soldier.dischargeDate >= datetime.now(),"Όχι"),
            else_='-').label('dischargeStatus'),
        #Soldier.dischargeDate < datetime.now()).label('dischargeStatus'),
        Surgery.surgeryDate.is_not(None).label("surgeryDone") # check if surgeryDate exists
        # outer join with the corresponding table for getting discharge date for soldier
        ).outerjoin(Soldier, Patient.ID == Soldier.soldierID).join(Surgery,Patient.ID == Surgery.patientId
        ).outerjoin(Officer,Officer.officerID==Patient.ID).join(SurgeryType,SurgeryType.name==Surgery.surgeryName)
     return query   

















# surgeryDate IS  NULL AND ACTIVE=1 
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
LEFT JOIN  surgerywaitinglist.soldiers  ON (surgerywaitinglist.patients.ID = surgerywaitinglist.soldiers.soldierID)
WHERE referral=0 AND ({TYPE_CONDITION})
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

#surgeryDate IS  NULL AND ACTIVE=1 
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
LEFT JOIN  surgerywaitinglist.soldiers  ON (surgerywaitinglist.patients.ID = surgerywaitinglist.soldiers.soldierID)
WHERE referral=0 AND ({TYPE_CONDITION}) 
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
   IFNULL(totalDuration,0)
FROM (
    SELECT SUM(st.estimatedDuration) / 1800 AS totalDuration
    FROM surgerywaitinglist.surgeries s
    JOIN surgerywaitinglist.surgerytypes st 
    ON s.surgeryName = st.name
    WHERE ((s.surgeryDate IS NULL AND s.active = 1 AND s.referral = 0 and s.surgeryId != :surgeryId  AND s.examDate<=:examDate) OR 
    (s.surgeryDate>=s.examDate AND s.active = 0 AND s.referral = 0))
) AS DURATION;
""")