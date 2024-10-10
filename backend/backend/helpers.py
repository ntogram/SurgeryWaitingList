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



#s="2024-10-02"
#b =  is_valid_date(s)
#print(s)
#print(b)