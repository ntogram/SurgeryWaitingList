from datetime import datetime
from models import Patient
def is_valid_date(date_string):
    try:
        # Try to parse the string with the format YYYY-MM-DD
        datetime.strptime(date_string, "%Y-%m-%d")
        return True
    except ValueError:
        return False


def hasRank(prop):
    if prop in ["Στρατιωτικός", "Αστυνομικός"]:
        return True
    else:
        return False


def isBoolean(v):
    if v in [0,1]:
        return True
    else:
        return False

def readStatsFromDB(db,query,keyname):
     # Execute the query
    result = db.session.execute(query)
    # Fetch all results from the query
    rows = result.fetchall()
    statistics = []
    # Convert the results to a list of dictionaries
    for row in rows:
        statistics.append({
            keyname: row._mapping[keyname],
            'Μόνιμοι Στρατιωτικοί': int(row._mapping['Μόνιμοι Στρατιωτικοί']),
            'Έφεδροι Στρατιωτικοί': int(row._mapping['Έφεδροι Στρατιωτικοί']),
            'Αστυνομικοί': int(row._mapping['Αστυνομικοί']),
            'Απόστρατοι': int(row._mapping['Απόστρατοι']),
            'Μέλη': int(row._mapping['Μέλη']),
            'Ιδιώτες': int(row._mapping['Ιδιώτες'])})
    return statistics
#s="2024-10-02"
#b =  is_valid_date(s)
#print(s)
#print(b)