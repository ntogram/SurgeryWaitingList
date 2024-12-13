from datetime import datetime
from datetime import date, timedelta
from dateutil.relativedelta import relativedelta
from models import Patient
import math
from sqlalchemy import text
def custom_round(val):
    """Custom rounding logic based on decimal part."""
    int_part = int(val)  # Get the integer part
    decimal_part = val - int_part  # Get the decimal part

    if decimal_part > 0.5: # 
        return math.ceil(val)  # Round up
    elif decimal_part > 0:  # Handle values with a decimal part
        return int_part + 0.5
    else:  # If there's no decimal part
        return int_part





def is_valid_date(date_string):
    try:
        # Try to parse the string with the format YYYY-MM-DD
        datetime.strptime(date_string, "%Y-%m-%d")
        return True
    except ValueError:
        return False


def isAfter(startDate,endDate):
    if endDate < startDate:
            return False
    return True





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

def readStatsFromDB(db,query,conditionType,keyname):
    # Insert the full condition SQL expression into the query string
    dquery = str(query).format(TYPE_CONDITION=conditionType)

    # Log the final query for debugging
    #print("Executing Query:\n", dquery)
    query = text(dquery)

 

   


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

def isSummer(m):
    # check if month is July or August
    if m in [7,8]:
        return True
    else:
        return False

def isChristmas(m,d):
    # Check if the new date is in the Christmas period (20-Dec to 10-Jan)
    is_in_christmas_period = ((m == 12 and d >= 20) or (m == 1 and d <= 10))
    if is_in_christmas_period:
        return True
    else:
        return False

def getPostSummerDate(y):
    # the first surgery  date is approximately 10-09
     d= datetime(y, 9, 10)
     return d

def getPostChristmasDate(y,m):
    # 15-01 is the first surgery date after Christmas
    newDate = None
    if m == 12:
            newDate= datetime(y+1, 1, 15)
    else:
            newDate= datetime(y, 1, 15)
    return  newDate



# find date of orthodox Easter
def getEasterDate(y):
    a = y % 19
    b = y % 4
    c = y % 7
    sum1 = 19*a + 15
    d = sum1 % 30
    sum2 = 2*b + 4*c + 6*d + 6
    e = sum2 % 7
    f = d+e
    if f <= 9:
        easterDate = date(y, 3, 22 + f)  # March 22 + f days
    else:
        easterDate = date(y, 4, f - 9)   # April (f - 9)th

    # Step 3: Convert to new style by adding 13 days
    return easterDate + timedelta(days=13)



def isEaster(dateVal):
    if isinstance(dateVal, datetime):
        dateVal = dateVal.date() 
    easterDate = getEasterDate(dateVal.year)
    beforeEaster = easterDate  - timedelta(days=7)
    afterEaster = easterDate   +   timedelta(days=7)
    if beforeEaster <= dateVal <= afterEaster:
        newDate = afterEaster + timedelta(days=1)
        return True,newDate
    else:
        return False,afterEaster


def calculateDateDiff(d1,d2):
    duration = relativedelta(d2, d1)
    durationInMonths =  duration.months+ (duration.years*12) +duration.days/30
    # normalize the durationInMonths in int value
    durationInMonths = custom_round(durationInMonths)
    return durationInMonths


def getExpectedSurgeryDate(examDate,interval):
    intervalM  =int(interval) # get number of months
    extra_days = (interval - intervalM) * 30 # get supplementary days
    # calculate expected surgery date
    expectedSurgeryDate = examDate + relativedelta(months=intervalM,days=extra_days)
    return expectedSurgeryDate

# The surgery date cannot be realized during holidays (Christmas,Easter,Summer). 
# The expected surgery date may need adaptation
def adaptSurgeryDate(surgeryDate):
    # check if expected surgery date is in Summer Holidays
     if isSummer(surgeryDate.month) :
        surgeryDate= getPostSummerDate(surgeryDate.year)            
     
     # check if expected surgery date is in Christmas Holidays
     if isChristmas(surgeryDate.month,surgeryDate.day):
        surgeryDate = getPostChristmasDate(surgeryDate.year,surgeryDate.month)
     # check if the expected surgery date is in Easter Holidats
     easterFeatures = isEaster(surgeryDate)
     if easterFeatures[0]:
         surgeryDate = easterFeatures[1]
     return surgeryDate