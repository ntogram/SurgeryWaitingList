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