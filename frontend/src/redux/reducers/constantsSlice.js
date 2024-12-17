
// general global variables

import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
const initialState = {
  dateFormat :'YYYY-MM-DD',
  today:dayjs(dayjs().format('YYYY-MM-DD'),'YYYY-MM-DD'),
  properties: ["Στρατιωτικός", "Αστυνομικός", "Απόστρατος", "Μέλος", "Ιδιώτης"],
  fullProperties:["Μόνιμοι Στρατιωτικοί", "Έφεδροι Στρατιωτικοί", "Αστυνομικοί", "Απόστρατοι", "Μέλη", "Ιδιώτες"],
  statisticTypes:["Όλες","Ολοκληρωμένες","Εκκρεμείς"],




  surgeries: {
    "Μύτη":["Βιοψία βλάβης-όγκου υπό διερεύνηση",
      
      
      
      //"Χρόνια ρινίτιδα",
      "Κογχοπηξία",
      "Κογχοπλαστική",
      
      "Μέση ρινοαντροστομίας άμφω",
      //"Σκολίωση ρινικού διαφράγματος",
      "Διαφραγματοπλαστική-Κογχοπηξία",
    //"Σκολίωση ρινικού διαφράγματος+λειτουργική ρινοπλαστική", 
    "Ανοπλαστική λειτουργική",
    
    "Αποφρακτική υπνική άπνοια","Όγκοι καλοήθεις","Όγκοι κακοήθεις","Άλλου είδους επέμβαση"],
    "Παραρρίνιοι κόλποι":["Βιοψία βλάβης-όγκου υπό διερεύνηση",
      
      //"Χρόνια παραρρινοκολπίτιδα",
      "Full FESS",
      "Mini FESS",
      "Μέση ρινοαντροστομία",
      
      
      "Όγκοι καλοήθεις","Όγκοι κακοήθεις","Άλλου είδους επέμβαση"],
    "Τράχηλος":["Βιοψία βλάβης-όγκου υπό διερεύνηση", "Σιελαδενίτιδα",
      
      //"Όγκος παρωτίδας (παρωτιδεκτομή)",
      "Παρωτιδεκτομή",

     // "Όγκος υπογνάθιου αδένα (Αφαίρεση υπογνάθιου αδένα)",
     "Αφαίρεση υπογνάθιου αδένα",
    //"Όγκος θυρεοειδή (θυρεοειδεκτομή)",
    "Θυροειδεκτομή",
    "Λεμφαδενικός καθαρισμός τραχήλου",
    //"Συγγενείς διαμαρτίες (βρογχιακή κύστη, κύστη θυρεογλωσσικού πόρου)",
    "Αφαίρεση συγγενών διαμαρτιών (βρογχιακή κύστη, κύστη θυρεογλωσσικού πόρου)",
    "Όγκοι καλοήθεις","Όγκοι κακοήθεις","Άλλου είδους επέμβαση"],
    "Αυτί":["Τυμπανοπλαστική","Καναλοπλαστική","Αναβολεκτομή","Μαστοειδεκτομή",
      
      
      
      "Βιοψία βλάβης-όγκου υπό διερεύνηση","Όγκοι καλοήθεις","Όγκοι κακοήθεις","Άλλου είδους επέμβαση"],
    "Ρινοφάρυγγας":["Βιοψία βλάβης-όγκου υπό διερεύνηση",
     // "Υπερτροφία αδενοειδών εκβλαστήσεων",
      "Αδενοτομή",
      
      "Όγκοι καλοήθεις","Όγκοι κακοήθεις","Άλλου είδους επέμβαση"],
    "Στοματοφάρυγγας":[
      
      
      "Βιοψία βλάβης-όγκου υπό διερεύνηση",
       "Αμυγδαλεκτομή",
      
      
      //"Χρόνια αμυγδαλίτιδα", 
      "UPPP",
      //"Αποφρακτική υπνική άπνοια",
      "Αφαίρεση λίθου υπογνάθιου αδένα","Σιαλενδοσκόπηση",
      
      "Όγκοι καλοήθεις","Όγκοι κακοήθεις","Άλλου είδους επέμβαση"],
    "Υποφάρυγγας":["Μικρολαρυγγοσκόπηση","Πανενδοσκόπηση",
      
      
      "Βιοψία βλάβης-όγκου υπό διερεύνηση","Όγκοι καλοήθεις","Όγκοι κακοήθεις","Άλλου είδους επέμβαση"],
    "Λάρυγγας":["Μικρολαρυγγοσκόπηση","Πανενδοσκόπηση",
      
      
      "Βιοψία βλάβης-όγκου υπό διερεύνηση","Όγκοι καλοήθεις","Όγκοι κακοήθεις","Άλλου είδους επέμβαση"],
    "Άλλη περιοχή":["Βιοψία βλάβης-όγκου υπό διερεύνηση","Όγκοι καλοήθεις","Όγκοι κακοήθεις","Άλλου είδους επέμβαση"]
  },
  ranks: {
    "Στρατιωτικός": ["Στρατιώτης (Στρ)", "Δεκανέας (Δνεας)", "Λοχίας (Λχίας)", "Επιλοχίας (Επχίας)", "Αρχιλοχίας (Αλχιας)", 
      "Δόκιμος Έφεδρος Αξιωματικός (ΔΕΑ)", "Ανθυπασπιστής (Ανθστής)", "Ανθυπολοχαγός (Ανθλγός)",
      "Υπολοχαγός (Υπλγός)", "Λοχαγός (Λγός)", "Ταγματάρχης (Τχης)", "Αντισυνταγματάρχης (Ανχης)",
      "Συνταγματάρχης (Σχης)", "Ταξίαρχος (Ταξχος)", "Υπόστράτηγος (Υπγος)", "Αντιτράτηγος (Αντγος)", "Στρατηγός (Στγος)"],
    "Αστυνομικός": ["Κατώτερος", "Ανώτερος", "Ανώτατος"]
  },
  armyRankMap:{
    "ΓΕΣ":"ges",
    "1η ΣΤΡΑΤΙΑ":"1h_stratia",
    "Γ’ ΣΣ":"g_ss",
    "Δ’ ΣΣ":"d_ss",
    "ΑΣΔΕΝ":"asden",
    "ΑΣΔΥΣ":"asdys",
    "Ι ΜΠ":"i_mp",
    "IV ΜΠ":"iv_mp",
    "VΙ ΜΠ":"vi_mp",
    "VIII ΜΠ":"i_mp",
    "ΙΙ Μ/Κ ΜΠ":"ii_mk_mp",
    "ΧΙΙ Μ/Κ ΜΠ":"xii_mk_mp",
    "XVI Μ/Κ ΜΠ":"xvi_mk_mp",
    "ΧΧ ΤΘΜ":"xx_tthm",
    "ΜΕΡΥΠ":"meryp",
    "ΔΥΒ":"dyb",
    "3 Μ/Κ ΤΑΞ":"3_mk_tax",
    "30 Μ/Κ ΤΑΞ":"30_mk_tax",
    "31 Μ/Κ ΤΑΞ":"31_mk_tax",
    "33 Μ/Κ ΤΑΞ":"33_mk_tax",
    "34 Μ/Κ ΤΑΞ":"34_mk_tax",
    "37 Μ/Κ ΤΑΞ":"37_mk_tax",
    "50 Μ/Κ ΤΑΞ ΠΖ":"50_mk_tax",
    "5 ΤΑΞ ΠΖ":"5_tax_pz",
    "9 ΤΑΞ ΠΖ":"9_tax_pz",
    "10 ΣΠ":"9_tax_pz",
    "15 ΤΑΞ ΠΖ":"15_tax_pz",
    "29 ΤΑΞ ΠΖ":"29_tax_pz",
    "71 A/Μ ΤΑΞ":"71_am_tax",
    "ΧΧΙ ΤΘΤ":"xxi_ttht",
    "ΧΧΙΙ ΤΘΤ":"xxii_ttht",
    "ΧΧΙΙΙ ΤΘΤ":"xxiii_ttht",
    "ΧΧΙV ΤΘΤ":"xxiv_ttht",
    "ΧΧV ΤΘΤ":"xx_tthm",
    "ΔΥΝΑΜΕΙΣ ΚΑΤΑΔΡΟΜΩΝ":"dunameis_katadromwn",
    "ΔΥΝΑΜΕΙΣ ΠΕΖΟΝΑΥΤΩΝ":"dunameis_pezonautwn",
    "1η ΤΑΞ/ΑΣ":"1h_taxas",
    "88 ΣΔΙ":"88_sdi",
    "13 ΔΕΕ":"13dee",
    "79 ΑΔΤΕ":"79_adte",
    "80 ΑΔΤΕ":"80_adte",
    "95 ΑΔΤΕ":"95_adte",
    "96 ΑΔΤΕ":"96_adte",
    "98 ΑΔΤΕ":"98_adte",
    "I ΤΑΞΥΠ":"1h_taxyp",
    "ΙΙ ΤΑΞΥΠ":"2h_taxyp",
    "III ΤΑΞΥΠ":"3h_taxyp",
    "IV ΤΑΞΥΠ":"iv_taxyp",
    "651 ΑΒΥΠ":"651_abyp",
    "ΔΙΣΕ":"dise",
    "ΣΔΙΕΠ":"sdiep",
    "ΣΣΕ":"sse",
    "ΣΜΥ":"smy",
    "ΣΤΡΑΤΟΝΟΜΙΑ":"stratonomia",
    "ΤΔ / 21 Μ/Κ ΣΠ":"td_21_mk",
    "ΤΔ / 41 ΣΠ":"td_41_sp",
    "ΕΛΔΥΚ":"eldyk",
    "ΕΘΝΟΦΥΛΑΚΗ":"ethnofylakh",
    "ΣΕΟΕΔ":"seoed",
    "1 ΣΠ":"1_sp",
    "ΤΕΘΑ":"tetha",
    "ΠΕΖΙΚΟ":"pz",
    "ΤΕΘΩΡΑΚΙΣΜΕΝΑ":"tethorakismena",
    "ΠΥΡΟΒΟΛΙΚΟ":"pb",
    "ΜΗΧΑΝΙΚΟ":"mx",
    "ΔΙΑΒΙΒΑΣΕΙΣ":"db",
    "ΑΕΡΟΠΟΡΙΑ ΣΤΡΑΤΟΥ":"as",
    "ΕΦΟΔΙΑΣΜΟΥ ΜΕΤΑΦΟΡΩΝ":"em",
    "ΥΛΙΚΟΥ ΠΟΛΕΜΟΥ":"yp",
    "ΤΕΧΝΙΚΟ":"tx",
    "ΕΡΕΥΝΑΣ ΠΛΗΡΟΦΟΡΙΚΗΣ":"ep",
    "ΥΓΕΙΟΝΟΜΙΚΟ":"ygeionomiko",
    "ΟΙΚΟΝΟΜΙΚΟ":"oikonomiko",
    "ΓΕΩΓΡΑΦΙΚΟ":"geografiko",
    "ΕΛΕΓΚΤΙΚΟ":"elegktiko",
    "ΣΤΡΑΤΙΩΤΙΚΩΝ ΓΡΑΜΜΑΤΕΩΝ":"straiwtikwn_grammatewn",
    "ΜΟΥΣΙΚΟ":"mousiko"
   }


};

const constantsSlice = createSlice({
  name: 'constants',
  initialState,
  reducers: {
    
}
});

export default constantsSlice.reducer;