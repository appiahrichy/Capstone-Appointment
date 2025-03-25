// Database object to store both students and staff
const database = {
  students: [],
  staff: [],
  appointments: [],
  notifications: []
};

// Function to generate username from full name
function generateUsername(fullName) {
  return fullName
    .toLowerCase()
    .replace(/,/g, '') // Remove commas
    .replace(/[^a-z0-9]/g, '') // Remove any special characters and spaces
    .trim();
}

// Function to determine gender based on first name
function determineGender(name) {
  // List of common male and female first names
  const maleNames = ['david', 'john', 'mark', 'jonas', 'emile', 'wycliffe', 'enoch', 'stephen', 'jeddy', 'charles', 'kelvin', 'francis', 'albert', 'emmanuel', 'philip', 'godfred', 'collins', 'frank', 'gabriel', 'daniel', 'samuel', 'prince', 'william', 'isaac', 'felix'];
  const femaleNames = ['christabel', 'linda', 'judith', 'michelle', 'emmanuella', 'eunice', 'deborah', 'ruth', 'mary', 'blessing', 'suraiya', 'martha'];
  
  const firstName = name.split(',')[1]?.trim().split(' ')[0].toLowerCase() || '';
  
  if (maleNames.includes(firstName)) return 'Male';
  if (femaleNames.includes(firstName)) return 'Female';
  
  // Default to Male if name is not in the lists (as per requirement of majority being male)
  return 'Male';
}

// Function to randomly assign programme option with 2/3 probability for General
function assignProgrammeOption() {
  return Math.random() < 0.67 ? 'General' : 'Fee-Paying';
}

// Process students data
const studentsData = [
  { index: '3359122', name: 'ABATEY, David Alegre' },
  { index: '3365822', name: 'AGYEMANG, Christabel Yaa' },
  { index: '3371922', name: 'ANOKYE, Yaw Mark' },
  { index: '3378622', name: 'ATITSO, Jonas Sedem Kwame' },
  { index: '3386022', name: 'CHAMOUN, Emile' },
  { index: '3392722', name: 'GYAMBIBI, Wycliffe Kwame' },
  { index: '3399222', name: 'MARTEY KORLEY, Enoch' },
  { index: '3405822', name: 'OHENE, Linda Anima' },
  { index: '3413222', name: 'SARPEY, Stephen Papa Maakeh' },
  { index: '3359222', name: 'ABBAN, Jeddy Paa Kojo' },
  { index: '3365922', name: 'AGYEMANG, John' },
  { index: '3372022', name: 'ANOKYE-MENSAH, Papa Yaw' },
  { index: '3378822', name: 'ATUAHENE, Judith Nkrumah' },
  { index: '3386222', name: 'COFIE, Ezekiel Heward' },
  { index: '3392822', name: 'GYAMERA, Charles Caleb' },
  { index: '3399322', name: 'MAWUENA, Daniel Bubu' },
  { index: '3405922', name: 'OKOI, Judith Ampomaa' },
  { index: '3413422', name: 'SEFA, Kelvin' },
  { index: '3359322', name: 'ABBEY DARKO, Samuel Desmond' },
  { index: '3366022', name: 'AGYEMANG, Kelvin Ntim' },
  { index: '3372122', name: 'ANORCHIE, Michelle Frimpomaah' },
  { index: '3378922', name: 'AUSTIN, Nana Adjoa Akyimfoa' },
  { index: '3386422', name: 'CUDJOE, Francis' },
  { index: '3392922', name: 'GYAMFI, Nana Agyemang' },
  { index: '3399422', name: 'MENDS, Albert' },
  { index: '3406022', name: 'OKRAH, Peniel Osei' },
  { index: '3413522', name: 'SEGBEDZI, Livingston' },
  { index: '3359422', name: 'ABBOAH, Festus' },
  { index: '3366122', name: 'AGYEMANG, Nana Akua' },
  { index: '3372222', name: 'ANSAH, Francis' },
  { index: '3379022', name: 'AWARIKARO, Rudolph Hodds Awenate' },
  { index: '3386522', name: 'CUDJOE, Gabriel Ngemah' },
  { index: '3393022', name: 'GYAMFI, Owusu Samuel' },
  { index: '3400422', name: 'MENSAH PEPRA, Terry' },
  { index: '3406122', name: 'OKYERE-GYAMFI, Augustine' },
  { index: '3413622', name: 'SEIDU, Hamzah' },
  { index: '3359522', name: 'ABDUL HAQUE, Yahaya Yelpoea' },
  { index: '3366222', name: 'AGYEMANG-BADU, Daniel' },
  { index: '3372322', name: 'ANSAH, Fredrick Owusu' },
  { index: '3379122', name: 'AWHANSU, Oluwaseyi Praise' },
  { index: '3386622', name: 'CUDJOE, Philip' },
  { index: '3393122', name: 'GYAN, Emmanuel Akyea' },
  { index: '3399522', name: 'MENSAH, Emmanuella Asiedua' },
  { index: '3406922', name: 'OPOKU AGYIN, Denzil' },
  { index: '3413722', name: 'SELBY, Emmanuel Kweku' },
  { index: '3359622', name: 'ABDUL KARIM, Abdul Latif Numbre' },
  { index: '3366322', name: 'AHADO, Ronald Ofoe' },
  { index: '3372522', name: 'ANSU, Godfred' },
  { index: '3379322', name: 'AWORTWE, Gideon' },
  { index: '3386822', name: 'DADZIE, Joseph' },
  { index: '3393222', name: 'HARUNA, Bawumia Fahad' },
  { index: '3399622', name: 'MENSAH, Isaac Nana Sam' },
  { index: '3407022', name: 'OPOKU NTI, Marvin' },
  { index: '3413822', name: 'SEMEKOR, Eunice' },
  { index: '3359722', name: 'ABDUL RAFIU, Shamsudeen' },
  { index: '3366422', name: 'AHIATAKU, Etornam Kordzo' },
  { index: '3372622', name: 'ANTWI, Collins Seth' },
  { index: '3379422', name: 'AWUAH, Caleb' },
  { index: '3386922', name: 'DAGADU, John David' },
  { index: '3393322', name: 'HONU, Destine Kofi' },
  { index: '3399722', name: 'MENSAH, Justin' },
  { index: '3406322', name: 'OPOKU, Davies' },
  { index: '3413922', name: 'SENU, Seyram Elorm Adzo' },
  { index: '3359822', name: 'ABDUL RASHEED, Ruweida Suhuyini' },
  { index: '3366522', name: 'AHIEKPOR, Jude Kekeli Yaw' },
  { index: '3372722', name: 'ANTWI, Frank Oteng' },
  { index: '3379522', name: 'AWUAH, Kelvin' },
  { index: '3387122', name: 'DANQUAH, Deborah Anoah' },
  { index: '3393422', name: 'HOVOR, Kingsley' },
  { index: '3399822', name: 'MENSAH, Kennedy Akweteh' },
  { index: '3406422', name: 'OPOKU, Davis' },
  { index: '3414022', name: 'SEWORDOR, Ruth Afivi' },
  { index: '3359922', name: 'ABDUL RASHID, Mujahid' },
  { index: '8574021', name: 'AHORGBAH, Fredrick Kofi Sedinam' },
  { index: '3372822', name: 'ANTWI, Gabriel' },
  { index: '3379722', name: 'AWUAH-TABIRI, Ransford' },
  { index: '3387222', name: 'DANQUAH, Larbi Samuel' },
  { index: '3393522', name: 'HUARU, Hafiz' },
  { index: '3399922', name: 'MENSAH, Kenneth Okoe' },
  { index: '3406522', name: 'OPOKU, Kwaku Kelvin' },
  { index: '3414122', name: 'SEY, Allan Paa-Joe' },
  { index: '3360322', name: 'ABDULAI, Abdul-Latif' },
  { index: '3366622', name: 'AIDOO, Sampson' },
  { index: '3372922', name: 'ANTWI, Jeffrey Twum' },
  { index: '3379822', name: 'AWUAKYE, Bright Sarpong' },
  { index: '3387322', name: 'DANSO, Daniel Osafo' },
  { index: '3393622', name: 'IBRAHIM, Edem Ishmael' },
  { index: '3400222', name: 'MENSAH, Raphael Teiko' },
  { index: '3406622', name: 'OPOKU, Ofori Yaw Barimah Nana' },
  { index: '3414222', name: 'SHAIBU, Salim' },
  { index: '3360422', name: 'ABDULAI, Jalali-Din Wuni-Zaligu' },
  { index: '3366722', name: 'AJANG, Burjwok Paulo Deng' },
  { index: '3373022', name: 'ANTWI, Joshua Ohene Yaw' },
  { index: '3379922', name: 'AWUDJA, Kelvin Daniel Nana Yaw' },
  { index: '3387422', name: 'DANSO, Etornam Yaa Lydia' },
  { index: '3393722', name: 'IBRAHIM, Saadatu' },
  { index: '3400322', name: 'MENSAH, Vincent Justice' },
  { index: '3406722', name: 'OPOKU, Perry' },
  { index: '3414422', name: 'SIAW, Emmanuel Asante' },
  { index: '3360522', name: 'ABDULAI, Umar Tijani' },
  { index: '3366822', name: 'AJUITEY, Prince Awonaab' },
  { index: '3373122', name: 'ANTWI, Nana Osei Assibey' },
  { index: '3380122', name: 'AWUNTUBA, Caswell' },
  { index: '3387522', name: 'DANSO, Martin Obiri' },
  { index: '3393822', name: 'IDDRISU, Faadila Wumpini' },
  { index: '8557021', name: 'MICHAEL ISAAC, Asigre' },
  { index: '3406822', name: 'OPOKU, Philip Brako' },
  { index: '3414522', name: 'SIE, Eugene Kwasi' },
  { index: '3360022', name: 'ABDUL-KARIM, Adnaan' },
  { index: '3366922', name: 'AKANLU, Brian Webadua' },
  { index: '3373222', name: 'ANTWI, Prince Amoako' },
  { index: '3380322', name: 'AYEH-PAYE, Yaw Ayeh' },
  { index: '3387622', name: 'DAPAAH, Sarpong Nana' },
  { index: '3393922', name: 'IDDRISU, Mohammed Awal' },
  { index: '3400522', name: 'MIKADO, Ernest Kwadwo' },
  { index: '3407122', name: 'OPONG, Kwabena Darko' },
  { index: '3414622', name: 'SIKA, Noah' },
  { index: '3360122', name: 'ABDUL-KARIM, Ansinmwini Raqib' },
  { index: '3367022', name: 'AKISI, Leonard Awonwie' },
  { index: '3373322', name: 'ANTWI, Richel Nhyira Takyiwaa' },
  { index: '3380422', name: 'AYERTEY, Danny Ayeh' },
  { index: '3387722', name: 'DARKO, Leslie Kwadwo' },
  { index: '3394022', name: 'JACKSON, Judah Bless' },
  { index: '8557121', name: 'MILLA, Esinam Ama' },
  { index: '3407522', name: 'OPPONG PEPRAH, Clifford' },
  { index: '3414722', name: 'SOETOR, Theophilus Etornam' },
  { index: '3360622', name: 'ABDULLAH, Ayisha' },
  { index: '3367122', name: 'AKORSU, Emmanuella Amenuveve' },
  { index: '3373422', name: 'ANTWI, Samuella' },
  { index: '3380522', name: 'AYESU, Philip Odame' },
  { index: '3387822', name: 'DARKOH, Frank' },
  { index: '3394122', name: 'JEAN, Ange Emmanuel Adou Granger Sidike' },
  { index: '3400622', name: 'MINTAH, Bright Amofa' },
  { index: '3407222', name: 'OPPONG, Emmanuel Akwasi' },
  { index: '3414822', name: 'SULEMANA, Kaisaan Anamzoya' },
  { index: '4236420', name: 'ABDUL-SALAAM, Ishaque Marfo' },
  { index: '3367322', name: 'AKPANGLO, Samuel Katey' },
  { index: '3373522', name: 'ANTWI, Yaa Asantewaa' },
  { index: '3380622', name: 'AYITEY, Dennis Tiam' },
  { index: '3387922', name: 'DARKWAH, Martha Kinih' },
  { index: '3394222', name: 'JOHNSON, William' },
  { index: '3400722', name: 'MOHAMMED, Abdul Basit' },
  { index: '3408222', name: 'OSEI AGYEMANG, Allan' },
  { index: '3414922', name: 'TABIL, Elliot Ebo' },
  { index: '3360222', name: 'ABDUL-SAMED, Adama' },
  { index: '3367422', name: 'AKUAKU, Jeremiah Narteh' },
  { index: '3373622', name: 'ANTWI-ADJEI, Samuel' },
  { index: '3380722', name: 'AYITEY-ADJIN, Sadiq' },
  { index: '3388122', name: 'DEDE, Mary Ampaw' },
  { index: '3394322', name: 'KAKOU, Ishmael Evonlah' },
  { index: '3400922', name: 'MOHAMMED, Iddriss' },
  { index: '3408322', name: 'OSEI SARPONG, Kezia' },
  { index: '3415022', name: 'TAIWO, Rodeeyah Akorede' },
  { index: '3419722', name: 'ABOAGYE, Elvis Frimpong' },
  { index: '3367522', name: 'AKUSAKI, Benjamin Nartey' },
  { index: '3373722', name: 'ANYAGRI, Blessing Winbisisa' },
  { index: '8540021', name: 'AYOR, Obed Otu' },
  { index: '3388322', name: 'DENNIS, Opoku Amponsah' },
  { index: '3394522', name: 'KARIKARI, David Kweku' },
  { index: '3401022', name: 'MOHAMMED, Suraiya' },
  { index: '3407622', name: 'OSEI, David Adubofour' },
  { index: '3415122', name: 'TAKPAL, Emmanuela' },
  { index: '8523421', name: 'ABOAGYE, Emmanuel Nana Sakyi' },
  { index: '3367622', name: 'AKWAH, Bismark' },
  { index: '3373822', name: 'APEDO, Theophilus Ossana' },
  { index: '3380822', name: 'AZEEZ, Ahliyah' },
  { index: '3388422', name: 'DETTOH, Prince Kweku Adu' },
  { index: '3394622', name: 'KARIKARI, Kuffour Felix' },
  { index: '8557721', name: 'MORDEN, Jonathan' },
  { index: '3407722', name: 'OSEI, Heinrich Owusu' },
  { index: '3415222', name: 'TAMAKLOE, Richmond Delasi' },
  { index: '3360822', name: 'ABOAGYE, Emmanuel Opoku' },
  { index: '3367722', name: 'AKYEN ABBAN, Maxwell' },
  { index: '3373922', name: 'APPIAGYEI, Reindolf Akwasi' },
  { index: '3380922', name: 'AZUMAH, Asakwin Caleb' },
  { index: '3388522', name: 'DEVINE, Randy' },
  { index: '3394722', name: 'KARIKARI, Osei Ansah' },
  { index: '3401222', name: 'MUSTAPHA, Abdul-Salam Nto' },
  { index: '3407822', name: 'OSEI, Isaac Gyasi' },
  { index: '3415322', name: 'TAY-WORGBALE, Stevestan Mawudekakomayor' },
  { index: '3361022', name: 'ABORA, Godfred' },
  { index: '3367922', name: 'ALHASSAN DIASSO, Iman' },
  { index: '8535821', name: 'APPIAH, Bridget Mensah' },
  { index: '3381022', name: 'BAAH, Beatrice Darkoa' },
  { index: '8545921', name: 'DIMMIE, Niduokhansumah Ishmael' },
  { index: '3394922', name: 'KATA, Desmond Jeffery' },
  { index: '3401322', name: 'MUSTAPHA, Shafihu' },
  { index: '3408022', name: 'OSEI, Louis' },
  { index: '3415422', name: 'TECHIE, Doreen' },
  { index: '3361222', name: 'ACHEAMPONG, Francis' },
  { index: '3367822', name: 'ALHASSAN, Abdul Rauf' },
  { index: '3374112', name: 'APPIAH, Christiana Afia' },
  { index: '3381122', name: 'BAAH, Samuel' },
  { index: '3388622', name: 'DINKO, Nazeer Mohammed' },
  { index: '3395022', name: 'KESSE, Kwame Ofori' },
  { index: '3401422', name: 'NARH, Lois Korklu' },
  { index: '3408522', name: 'OSEI-ASSIBEY, Kelvin Odame' },
  { index: '3415522', name: 'TEMPLE, Evangelina' },
  { index: '3361422', name: 'ACHEAMPONG, Shadrack Adu Sarfo' },
  { index: '3368022', name: 'ALLASSANI, Rex' },
  { index: '3374222', name: 'APPIAH, Derrick Ofori' },
  { index: '3381322', name: 'BAAH-OTU, Edwin Paa Kwame' },
  { index: '3388722', name: 'DJIBOE, Jeffrey Edem Kojo' },
  { index: '3395122', name: 'KISSI, Joshua' },
  { index: '3401522', name: 'NARTEY, Desmond Kofi Lawer' },
  { index: '3419922', name: 'OTI, Wisdom Boakye' },
  { index: '3415622', name: 'TENKORANG, Bishop Duah' },
  { index: '3361522', name: 'ACKAH, Divine Elikem' },
  { index: '3368122', name: 'AMANKONAH-FORDJOUR, Sandra' },
  { index: '3374322', name: 'APPIAH, Gifty' },
  { index: '3381422', name: 'BAAKOH, Prince' },
  { index: '3388822', name: 'DODOFOLI, Joshua Korku' },
  { index: '3395222', name: 'KISSI, Mercy' },
  { index: '3401622', name: 'NARTEY, Osborn Ojerh Tettey' },
  { index: '3408622', name: 'OTIS, Daniel Owusu' },
  { index: '3415722', name: 'TENZAGH, Philip' },
  { index: '3361622', name: 'ACQUAH, Gideon' },
  { index: '3368222', name: 'AMANKONAH-HENNEH, Elton' },
  { index: '3374422', name: 'APPIAH, Moses Edward' },
  { index: '3381522', name: 'BABA MOHAMMED, Suleiman' },
  { index: '3388922', name: 'DOE, Terry Elikplim Kwaku' },
  { index: '3395422', name: 'KONADU, Kwabena Boateng' },
  { index: '3401722', name: 'NARTEY, Samuel Akoto' },
  { index: '3408922', name: 'OWIREDU, Akua Afriyie' },
  { index: '3415822', name: 'TETTEH, Mark Addo' },
  { index: '3361722', name: 'ACQUAH, Kelvin Anii' },
  { index: '3368322', name: 'AMARH, Evans Amartei' },
  { index: '3374522', name: 'APPIAH, Richard' },
  { index: '3381622', name: 'BADDOO, Jeremiah Nii Adotei' },
  { index: '3389022', name: 'DOGBEY, Rejoice Elike' },
  { index: '3395522', name: 'KONADU, Nana Kwame Amoateng' },
  { index: '3401822', name: 'NIMAKO, Evans' },
  { index: '3409022', name: 'OWUSU, David Kwaku Kuffour' },
  { index: '3415922', name: 'TETTEH, Michael Narh' },
  { index: '3361822', name: 'ACQUANDOH, Esther Efua' },
  { index: '3368422', name: 'AMARTEY, Roland Teye' },
  { index: '3374622', name: 'APPIAH-KUBI, Desmond' },
  { index: '3381722', name: 'BADU, Owusu Edmund' },
  { index: '3389122', name: 'DOGBEY, Senanu Carl Jesse' },
  { index: '3395722', name: 'KOOMSON, Benedict Bondzie' },
  { index: '3401922', name: 'NIMAKO, Obed Afari' },
  { index: '3409122', name: 'OWUAYEBI, Erica Ama Dansua' },
  { index: '3416022', name: 'TEYE, Victoria' },
  { index: '3361922', name: 'ADAMS, Prince' },
  { index: '3368522', name: 'AMEGASHIE, Selikem Kwasi' },
  { index: '3374722', name: 'ARKOH, Silas' },
  { index: '3381822', name: 'BAFFOUR, Chris' },
  { index: '3389222', name: 'DOKU, Clifford Nii Adjei' },
  { index: '3395822', name: 'KORANTENG, Nhyiraba Daniel' },
  { index: '3402022', name: 'NKANSAH, Benedicta Kerren Mawusene' },
  { index: '3410622', name: 'OWUSU ACHAW, Abramovich Jerry' },
  { index: '3416122', name: 'THOMPSON, Kobina Mensa' },
  { index: '3362122', name: 'ADARKWA, Godfred Boakye' },
  { index: '3368622', name: 'AMEYAW, David Asante' },
  { index: '3374822', name: 'ARKU, Selase' },
  { index: '3381922', name: 'BAIDOO, Kingsley' },
  { index: '3389322', name: 'DOMI, Gifty Adzo' },
  { index: '3395922', name: 'KORLI, Larry Addo' },
  { index: '3402122', name: 'NKETIA, Opoku Bandoh' },
  { index: '3410722', name: 'OWUSU AFRIYIE, Alfred' },
  { index: '3416222', name: 'TIBILLA, Collins' },
  { index: '3362322', name: 'ADDAI, Isaac' },
  { index: '3368922', name: 'AMEYAW, Seth' },
  { index: '3374922', name: 'ARKUTU, Melike' },
  { index: '3382022', name: 'BAMUOH, Ida Nuotama' },
  { index: '3389422', name: 'DONKOH, Benjamin Kwesi' },
  { index: '3396022', name: 'KORSAH, Bennett Abeiku' },
  { index: '3402222', name: 'NKETIAH, Asamoah Michael' },
  { index: '8565121', name: 'OWUSU AFRIYIE, Patricia' },
  { index: '3416322', name: 'TORKORNOO, Kevin' },
  { index: '3362422', name: 'ADDAI, Nana Yaw' },
  { index: '3369022', name: 'AMISSAH, Gilbert' },
  { index: '3375022', name: 'ARMAH, John' },
  { index: '3382222', name: 'BARRY, Momodou Wurrie' },
  { index: '3389622', name: 'DOWUONA OWOO, Mildred' },
  { index: '3396122', name: 'KPEMLIE, Vincent Kwaku' },
  { index: '3402322', name: 'NKETSIAH, Naomi' },
  { index: '3409222', name: 'OWUSU, Adolph Kwabena' },
  { index: '3416422', name: 'TORKPO, Robert Kweku' },
  { index: '3362522', name: 'ADDO, Chris Anome Paa Yaw' },
  { index: '3369122', name: 'AMOAFO, Caleb Frimpong' },
  { index: '3375222', name: 'ARMAH, Lawrence Nii' },
  { index: '3382422', name: 'BARTIMEUS, Manuel Nii Osabu' },
  { index: '3389522', name: 'DOWUONA, Daniel Nortei' },
  { index: '3396222', name: 'KPENTEY, Kankson Komla Ewoenam' },
  { index: '3402422', name: 'NKETSIAH, Nathaniel Akwessey' },
  { index: '3409322', name: 'OWUSU, Bruce Peprah' },
  { index: '3416522', name: 'TUGBAH, Lily Ama Mawuena' },
  { index: '3362622', name: 'ADDO-GYAMFI, Kwaku' },
  { index: '3369222', name: 'AMOAH, Benjamin' },
  { index: '3375322', name: 'ARTHUR, Frank Annor' },
  { index: '3382522', name: 'BARYEH, Samuel' },
  { index: '3389722', name: 'DUAH, Jephthah' },
  { index: '3396322', name: 'KUFFOUR, Kelvin Osei' },
  { index: '3402522', name: 'NKRUMAH, Ignatius Peprah' },
  { index: '8564321', name: 'OWUSU, Charles Asare' },
  { index: '3416622', name: 'TWENEBOAH, Jonathan Ofori' },
  { index: '3362722', name: 'ADDY, Christian Nii Antiaye' },
  { index: '3369322', name: 'AMOATEY, Gerald Addey' },
  { index: '3375422', name: 'ARYEE, Godwyll Essel' },
  { index: '3382622', name: 'BASHIRU, Sadat Yerima' },
  { index: '3389822', name: 'DUKU, Polycarp Nkpadewie' },
  { index: '3396422', name: 'KUMAH, Benjamin' },
  { index: '3402622', name: 'NSIAH, Mary' },
  { index: '3409422', name: 'OWUSU, Desmond Bobie' },
  { index: '3416722', name: 'TWUM, Clement' },
  { index: '3362822', name: 'ADJEI, Albert Arko' },
  { index: '3369422', name: 'AMPAH, Emily Maureen' },
  { index: '3375522', name: 'ASAAH, Manasseh' },
  { index: '3382722', name: 'BASOAH, Barima Owusu' },
  { index: '3389922', name: 'DUMASHIE, Bruce Klenam' },
  { index: '3396522', name: 'KUSI, James' },
  { index: '3402722', name: 'NSIAH, Milcah Beatrice Owusuaa' },
  { index: '3409522', name: 'OWUSU, Elvis Fosu' },
  { index: '3416822', name: 'TWUMASI-ANKRAH, Nana Oduro' },
  { index: '3362922', name: 'ADJEI, Gideon' },
  { index: '3369522', name: 'AMPOFO, Ofosu Michael' },
  { index: '3375622', name: 'ASABERE, Eugene Amponsah' },
  { index: '3382822', name: 'BATABE, Stacy Akiwele' },
  { index: '3390022', name: 'DUSSEY, Caleb Semekor' },
  { index: '3396622', name: 'KWAAH, Samuel' },
  { index: '3402922', name: 'NTIBIM, Helena' },
  { index: '3409822', name: 'OWUSU, Jaffar' },
  { index: '3416922', name: 'UTHMAN, Memuna' },
  { index: '3363022', name: 'ADJEI, Kelvin Ankamah' },
  { index: '3369622', name: 'AMPONG, Scott Kankam' },
  { index: '3375722', name: 'ASAFO-ADJEI, Jensen Kweku Sedem' },
  { index: '3382922', name: 'BAWA, Benjamin Kwesi' },
  { index: '8547521', name: 'DUUT, Oscar' },
  { index: '3396722', name: 'KWAKYE, Ernest Bediako' },
  { index: '3403022', name: 'NTIM, Oheneba Kwaku Tawiah' },
  { index: '3409922', name: 'OWUSU, Kofi Eric' },
  { index: '3417122', name: 'WETTA, Emmanuel Mawuli' },
  { index: '3363222', name: 'ADJIN, Vernon' },
  { index: '3369722', name: 'AMPONSAH, Cyprian Kumi' },
  { index: '3375822', name: 'ASAMOAH, Clinton' },
  { index: '3383022', name: 'BEDIAKOH, Emmanuel Ayirifa Asare' },
  { index: '3390122', name: 'DWIRANTWI, Joel Pitman' },
  { index: '3396822', name: 'KWAKYE, Jude Boateng' },
  { index: '3403122', name: 'NUAKO, Blankson' },
  { index: '3410022', name: 'OWUSU, Michael Osei' },
  { index: '3417222', name: 'WIAFE, Obed Annor' },
  { index: '3363322', name: 'ADOMAKO, John Kwaku' },
  { index: '3369922', name: 'AMPONSAH, Enoch' },
  { index: '3375922', name: 'ASAMOAH, Robert Ebo' },
  { index: '3383122', name: 'BEKOE, Ntiamoah Chris' },
  { index: '3390222', name: 'DZEBLE, Emmanuel Eli Komla' },
  { index: '3396922', name: 'KWAKYE, Oliver Andoh' },
  { index: '3403222', name: 'NUAMAH, Nana Ama Dansowaa' },
  { index: '3410222', name: 'OWUSU, Nelson Osei Tutu' },
  { index: '3417322', name: 'WILLS, Tony' },
  { index: '3363622', name: 'ADU MENSAH AMOFAH, Felix' },
  { index: '3370022', name: 'AMPONSAH-MENSAH, Awurabena Agyeiwaa' },
  { index: '3376122', name: 'ASANTE, Eric' },
  { index: '3383222', name: 'BENTIL, Benjamin Kwaku' },
  { index: '3390322', name: 'DZORSAH, Palmer Elisha' },
  { index: '3397022', name: 'KWAKYE-AMEYAW, Nana Kwadwo' },
  { index: '3403322', name: 'NUKPORTI, Collins Korbla' },
  { index: '3410322', name: 'OWUSU, Queenster Adomah' },
  { index: '3417422', name: 'YAHAYA, Alidu Faisal' },
  { index: '3363722', name: 'ADU NYARKO, Andy' },
  { index: '3370122', name: 'AMPONSEM, Stephen Owusu' },
  { index: '3376222', name: 'ASANTE, Ernest Kwame Opoku' },
  { index: '3383322', name: 'BENTIL, Edmond Fiifi Ampoma' },
  { index: '3390422', name: 'EDZIE, Samuel Ekow Junior' },
  { index: '3397122', name: 'KWAPONG, Ephraim Kofi Ayi' },
  { index: '3403522', name: 'NWAKANMA, Chimezie Brian' },
  { index: '3410422', name: 'OWUSU, Reagan Afrane' },
  { index: '3417522', name: 'YAKUBU, Abdul Wahab Kalanba' },
  { index: '3363522', name: 'ADU, Roger Osafo Kwabena' },
  { index: '8533021', name: 'ANAGI, Elisha' },
  { index: '3376322', name: 'ASANTE, Faustina Frimpongmaa Ama' },
  { index: '3383422', name: 'BENTIL, William Ninsin' },
  { index: '3390522', name: 'EFFAH-FRIMPONG, Maxwell' },
  { index: '3397222', name: 'KWARKO, Bernard' },
  { index: '3403622', name: 'NWORU, Charles Chijindu' },
  { index: '3410522', name: 'OWUSU, William Kofi' },
  { index: '3417622', name: 'YEBOAH, David Zahemen' },
  { index: '3363822', name: 'ADU-ASANTE, Michael' },
  { index: '3370222', name: 'ANAKPOR, David' },
  { index: '3376522', name: 'ASANTE, Kwabena Sefa' },
  { index: '3383522', name: 'BENYAH, Kofi Abordo' },
  { index: '3390622', name: 'ELIASU, Rahma Gariba' },
  { index: '8553921', name: 'KWARTENG, Marrion Daniel' },
  { index: '3403822', name: 'NYARKO, Samuel Okyere' },
  { index: '3410822', name: 'OWUSU-ANSAH, Jephtha Menya' },
  { index: '3417722', name: 'YEBOAH, Edmond' },
  { index: '3363922', name: 'ADU-BREMPONG, Nana Kojo' },
  { index: '3370322', name: 'ANANE, Eric Ankamah' },
  { index: '3376622', name: 'ASANTE, Kwame Junior' },
  { index: '3383622', name: 'BIMPONG, Clinton' },
  { index: '3390722', name: 'ENCHILL, Ransford Appiah' },
  { index: '3397322', name: 'KWOFIE, Benjamin Nana' },
  { index: '3403922', name: 'NYIM-ASARE, Papa Akwasi' },
  { index: '3410922', name: 'OWUSU-ANSAH, Yaw' },
  { index: '3417822', name: 'YEBOAH, Frank Dickson' },
  { index: '3364022', name: 'ADUMUA-DOWUONA, Phil Nortey' },
  { index: '3370422', name: 'ANANG, Michael' },
  { index: '3376822', name: 'ASARE, Benedict Nana' },
  { index: '3383722', name: 'BLETCHER, Paul Nii Bortey' },
  { index: '3390822', name: 'ESSANDOH, Prince Takyi' },
  { index: '3397422', name: 'KWOFIE, Kenneth Ryke' },
  { index: '3404022', name: 'OBENG, Kwame Ampadu' },
  { index: '3411022', name: 'OWUSU-MENSAH, Kwaku Sekyere' },
  { index: '3417922', name: 'YEBOAH, Godfred' },
  { index: '3364122', name: 'ADUSEI, Christian' },
  { index: '3370522', name: 'ANDAM-COBBOLD, Paapa Kobina' },
  { index: '3376922', name: 'ASARE, Emmanuel Nana' },
  { index: '3383922', name: 'BOADU, Obiri Yeboah Kwame' },
  { index: '3390922', name: 'ESSUMAN, Nuhu Kofi' },
  { index: '3397522', name: 'KWOFIE, Priscilla Anvoba' },
  { index: '3404112', name: 'OBIRI, Jessica Selase' },
  { index: '3411222', name: 'PATTERSON, Farouk Sowah' },
  { index: '3418022', name: 'YEBOAH, Isaac Akrong' },
  { index: '3364222', name: 'AFESEY, Mabel Delali' },
  { index: '3370622', name: 'ANDOH, Fredrick' },
  { index: '3377022', name: 'ASARE, Fredinald Owusu Achiaw' },
  { index: '3384122', name: 'BOAKYE, Fredrick' },
  { index: '3391022', name: 'ETUAH, Bright Annan' },
  { index: '3397622', name: 'KWOFIE, Shadrach Martin' },
  { index: '3404222', name: 'OBIRI-AGYEI, Tracy Owusua' },
  { index: '3411422', name: 'QUARCOO, Daniel Joseph Nii Anoi' },
  { index: '3418122', name: 'YEBOAH, Kofi Opoku' },
  { index: '3364322', name: 'AFFUL, Louisa Henewaa' },
  { index: '3370722', name: 'ANDOH, Nhyira Esi Bodwewa' },
  { index: '3377122', name: 'ASARE-ODEI, Francis Nana Asante' },
  { index: '3384422', name: 'BOAKYE-ANSAH, Saverena' },
  { index: '3391122', name: 'FIAKPORNU, Calvin Mawulorm' },
  { index: '3397722', name: 'KYEI, Christian Junior' },
  { index: '3404322', name: 'OBIRI-YEBOAH, Sylvester' },
  { index: '3411522', name: 'QUARCOO, Kelvin' },
  { index: '3418222', name: 'YEBOAH, Kwame Agyeman Baffour' },
  { index: '3364422', name: 'AFRAKOMA, Akua' },
  { index: '3370822', name: 'ANGUAH, Henry Fynn Otchere' },
  { index: '3377222', name: 'ASHON, Yoofi Adom Amissah' },
  { index: '3384522', name: 'BOAMAH, Joel' },
  { index: '3391222', name: 'FOKUO, James Oppong' },
  { index: '3397822', name: 'KYEI-MENSAH, Akwasi Oduro' },
  { index: '3404422', name: 'OBOUBI, Darren Larnyoh' },
  { index: '3411622', name: 'QUARSHIE, David Foli' },
  { index: '3418322', name: 'YEBOAH, Kyeremaa Alfreda' },
  { index: '3364522', name: 'AGBEKE, Joshua Bubune' },
  { index: '3370922', name: 'ANIM, Kofi Korang' },
  { index: '3377322', name: 'ASHONG, Daniel Nii Adote' },
  { index: '3384622', name: 'BOATENG, Franklin Gilbert' },
  { index: '3391322', name: 'FORDJOUR, Prince' },
  { index: '3397922', name: 'KYEREH, Jeffery' },
  { index: '3404522', name: 'OCANSEY, Robert Tetteh' },
  { index: '3411822', name: 'QUAYSON, Abigail Yaa' },
  { index: '3418422', name: 'YEBOAH, Neison Nti' },
  { index: '8528621', name: 'AGBEKO, Micheal Mawuli' },
  { index: '3371022', name: 'ANIM, Kwarteng Michael' },
  { index: '3377522', name: 'ASIEDU, Henry Owusu' },
  { index: '3384722', name: 'BOATENG, Jesreal Ken-Aboah' },
  { index: '3391422', name: 'FORGOR, Gideon Kombert' },
  { index: '3398022', name: 'LAMPTEY, Emmanuel Nene Adi' },
  { index: '3404622', name: 'OCRAN, Chris Marfo' },
  { index: '3411922', name: 'SACKEY, Abednego' },
  { index: '3418522', name: 'YEKUNYA, Prince' },
  { index: '3364622', name: 'AGBO, Fadl Adams' },
  { index: '3371122', name: 'ANIN, Evelyn Sarpong' },
  { index: '3377622', name: 'ASIEDU, Kyei Baffour' },
  { index: '3384822', name: 'BOATENG, Joel Owusu' },
  { index: '3391622', name: 'FOSU, Francis Boateng' },
  { index: '3398122', name: 'LAMPTEY, Kwaku Abednego' },
  { index: '3404722', name: 'OCRAN, Leonard' },
  { index: '3412022', name: 'SACKEY, Osbert Joseph Nii Aflah' },
  { index: '3418722', name: 'YIRENKYI, Samuel Aboagye' },
  { index: '3364722', name: 'AGBOR SEIDU, Mahfuz' },
  { index: '3371222', name: 'ANKOMAH, Kelvin' },
  { index: '3377722', name: 'ASIEDU, Rabbi Perez Kwakoa' },
  { index: '3384922', name: 'BOATENG, Kwabena Brefo' },
  { index: '3391822', name: 'FOSUHENE, Jayden' },
  { index: '3398222', name: 'LARTEY, David Nii' },
  { index: '3404822', name: 'ODAI, Samuel Nii-Afotey' },
  { index: '3412222', name: 'SAIBERT, Maryclare Tariro' },
  { index: '3418822', name: 'YOVONOO, Maranatha Aku' },
  { index: '3364822', name: 'AGGOR, Kobbie Eyram' },
  { index: '3371322', name: 'ANKRAH, Manasseh Papa Kwamena' },
  { index: '3377922', name: 'ASIGBEE, Jilon Elorm Kwame' },
  { index: '3385112', name: 'BOKORDEDZI, Gershwin Sy Amenueve' },
  { index: '3391922', name: 'FREEMAN, Nemenlah Erzuah' },
  { index: '3398322', name: 'LARTEY, Judah' },
  { index: '3404922', name: 'ODAME, Prince' },
  { index: '3412322', name: 'SAJI, Seyram Sefa' },
  { index: '3418922', name: 'YUSIF, Imran' },
  { index: '3364922', name: 'AGOTSE, Mawuena Kofi Samuel' },
  { index: '3371422', name: 'ANKRAH, Nii Kpakpo Oti' },
  { index: '3378022', name: 'ASILEVI, Andrews Edem Minta' },
  { index: '3385322', name: 'BONSU, Nana Adwoa Serwaa' },
  { index: '3392022', name: 'FYNN-SACKEY, Emmanuel Opoku' },
  { index: '3398522', name: 'LARTEY-MENSAH, Emmanuel Tetteh' },
  { index: '3405022', name: 'ODOI, Yussif Odokwei' },
  { index: '3412422', name: 'SALIFU DANSE, Godwin Wusunapi' },
  { index: '3419222', name: 'ZAGLA, Donatus' },
  { index: '3365022', name: 'AGYAPONG, Ebenezer Ntiakoh' },
  { index: '3419822', name: 'ANNAN, George Jnr' },
  { index: '3378122', name: 'ASIMENG, Kevin-Bernard Kofi' },
  { index: '3385522', name: 'BOSOMPEM, Yaw Barima Tawiah' },
  { index: '3392222', name: 'GBEDEMAH, Delight Elorm' },
  { index: '3398622', name: 'LAWEH, Emanuel Lamptey' },
  { index: '3405122', name: 'ODUM, Benjamin Serdem' },
  { index: '3412522', name: 'SALLO, Samuel' },
  { index: '3419322', name: 'ZIGGAH, Amy Ami Enam' },
  { index: '3365112', name: 'AGYAPONG, Samuel Oduro' },
  { index: '3371522', name: 'ANNING, Bright' },
  { index: '3378222', name: 'ASIPUNU, Desmond Dela' },
  { index: '3385622', name: 'BOYE, Ericson Martey' },
  { index: '3392322', name: 'GOMADO, Bill Horla' },
  { index: '3398722', name: 'MACCARTHY, Henorkam Tetteh' },
  { index: '3405322', name: 'ODURO-GYAMINAH, Bismark Nana Yaw Opoku' },
  { index: '3412722', name: 'SAMIRU, Nasser Jadagwa' },
  { index: '3419422', name: 'ZOUMBURI TAHIRU, Mardiyatu' },
  { index: '3365222', name: 'AGYEI, Akwasi Poku Ofori' },
  { index: '3371622', name: 'ANNORBAH, Marvinphil Sekoh' },
  { index: '3378322', name: 'ASUO, Edinam Kofi' },
  { index: '3385722', name: 'BREMPONG, Delassie Efua Cutie' },
  { index: '3392422', name: 'GOMADO, Bill Horla' },
  { index: '3398922', name: 'MANU, Richeal Pokuah' },
  { index: '3405422', name: 'OFORI ASANTE, Franklin' },
  { index: '3412922', name: 'SARFO, Isaac Kwaku' },
  { index: '3419522', name: 'ZULFAWU, Mohammed' },
  { index: '3365522', name: 'AGYEI, Michael Addai' },
  { index: '3371722', name: 'ANOKYE, Osei Cornelius' },
  { index: '3378422', name: 'ATAARA, Kwasi Aboagye Nkansah' },
  { index: '3385822', name: 'BREW, Eliza Anim' },
  { index: '3392522', name: 'GORMAN, Shaphat Fiifi' },
  { index: '3399022', name: 'MARFO, Derrick' },
  { index: '3405522', name: 'OFORI-KWANSAH, Wendy Sedinam' },
  { index: '3413022', name: 'SARFO, Oduro Yeboah' },
  { index: '3365722', name: 'AGYEMAN-DUAH, Gladys' },
  { index: '3371822', name: 'ANOKYE, Winifred' },
  { index: '3378522', name: 'ATIPAH, Reagan Akwetey' },
  { index: '3385922', name: 'CAIQUO, William Kyemenu' },
  { index: '3392622', name: 'GYABAA, Ebenezer' },
  { index: '3399112', name: 'MARFO, Felix Owusu Akwasi' },
  { index: '3405722', name: 'OFUATEY-KODJOE, Alex Junior' },
  { index: '3413122', name: 'SARKODIE - ADDO, Justice Junior' }
].map(student => {
  const username = generateUsername(student.name);
  return {
    name: student.name,
    studentId: student.index,
    username: username,
    email: `${username}@st.knust.edu.gh`,
    programmeStream: 'Bsc. Computer Science',
    programmeOption: assignProgrammeOption(),
    currentYear: 'Year 3',
    gender: determineGender(student.name),
    campus: 'KNUST-Kumasi',
    status: 'Continuing Ghanaian Student',
    indexNumber: student.index,
    password: student.index // Using student ID as default password
  };
});

// Initialize database with processed student data
database.students = studentsData;

// Complete Staff Data (without email)
const staffData = [
  { firstName: 'Ruth', lastName: 'Agyemang', pin: '34444421' },
  { firstName: 'John', lastName: 'Doe', pin: '35555555' },
  { firstName: 'Mary', lastName: 'Smith', pin: '36666666' },
  { firstName: 'James', lastName: 'Brown', pin: '37777777' },
  { firstName: 'Linda', lastName: 'Taylor', pin: '38888888' },
  { firstName: 'Samuel', lastName: 'Anderson', pin: '39999999' },
  { firstName: 'Joyce', lastName: 'Evans', pin: '31111111' },
  { firstName: 'Nathan', lastName: 'Williams', pin: '32222222' },
  { firstName: 'Irene', lastName: 'Johnson', pin: '33333333' },
  { firstName: 'Mabel', lastName: 'Adams', pin: '34444444' },
  { firstName: 'Felix', lastName: 'Clark', pin: '35555555' },
  { firstName: 'Cynthia', lastName: 'Thomas', pin: '36666666' },
  { firstName: 'Kwame', lastName: 'Boateng', pin: '37777777' },
  { firstName: 'Amma', lastName: 'Mensah', pin: '38888888' },
  { firstName: 'Yaw', lastName: 'Acheampong', pin: '39999999' },
  { firstName: 'Daniel', lastName: 'Owusu', pin: '31121212' },
  { firstName: 'Patricia', lastName: 'Asante', pin: '32232323' },
  { firstName: 'Kwesi', lastName: 'Ofori', pin: '33343434' },
  { firstName: 'Ama', lastName: 'Kwame', pin: '34454545' },
  { firstName: 'Benjamin', lastName: 'Adjei', pin: '35565656' },
  { firstName: 'Comfort', lastName: 'Akoto', pin: '36676767' },
  { firstName: 'Joseph', lastName: 'Addo', pin: '37787878' },
  { firstName: 'Sarah', lastName: 'Korsah', pin: '38898989' },
  { firstName: 'Francis', lastName: 'Mensah', pin: '39909090' },
  { firstName: 'Naomi', lastName: 'Baah', pin: '31101010' },
  { firstName: 'Kofi', lastName: 'Nyarko', pin: '32212121' },
  { firstName: 'Akosua', lastName: 'Duah', pin: '33323232' },
  { firstName: 'Michael', lastName: 'Ankrah', pin: '34434343' },
  { firstName: 'Theresa', lastName: 'Amoah', pin: '35545454' },
  { firstName: 'Samuel', lastName: 'Nti', pin: '36656565' }
];

// Process staff
database.staff = staffData.map(staff => ({
  fullName: `${staff.firstName} ${staff.lastName}`,
  staffId: staff.pin,
  username: generateUsername(`${staff.firstName} ${staff.lastName}`),
  password: staff.pin
}));

// Authentication functions
export function authenticateStudent(username, password, studentId) {
  console.log("Authenticating student with:", { username, studentId, password });
  
  const student = database.students.find(s => 
    s.username === username && 
    s.password === password && 
    s.studentId === studentId
  );
  
  if (student) {
    console.log("Found matching student:", student);
    return {
      success: true,
      student: {
        name: student.name,
        studentId: student.studentId,
        username: student.username,
        email: student.email,
        programmeStream: student.programmeStream,
        programmeOption: student.programmeOption,
        currentYear: student.currentYear,
        gender: student.gender,
        campus: student.campus,
        status: student.status,
        indexNumber: student.indexNumber,
        password: student.password // Include password for future updates
      }
    };
  }
  
  console.log("No matching student found");
  return {
    success: false,
    message: 'Invalid credentials. Please check your username, student ID, and password.'
  };
}

export function authenticateStaff(username, password, staffId) {
  console.log("Authenticating staff with:", { username, staffId, password });
  console.log("Available staff:", database.staff.map(s => ({ username: s.username, staffId: s.staffId })));
  
  const staff = database.staff.find(s => 
    s.username === username && 
    s.password === password && 
    s.staffId === staffId
  );
  
  if (staff) {
    console.log("Found matching staff:", staff);
    return {
      success: true,
      staff: {
        name: staff.fullName,
        staffId: staff.staffId,
        username: staff.username
      }
    };
  }
  
  console.log("No matching staff found");
  return {
    success: false,
    message: "Invalid credentials"
  };
}

// Function to update student password
export function updateStudentPassword(studentId, newPassword) {
  const student = database.students.find(s => s.studentId === studentId);
  
  if (!student) {
    return {
      success: false,
      message: "Student not found"
    };
  }

  // Update the password
  student.password = newPassword;
  
  return {
    success: true,
    message: "Password updated successfully"
  };
}

// Function to update staff password
export function updateStaffPassword(staffId, newPassword) {
  const staff = database.staff.find(s => s.staffId === staffId);
  
  if (!staff) {
    return {
      success: false,
      message: "Staff member not found"
    };
  }

  // Update the password
  staff.password = newPassword;
  
  return {
    success: true,
    message: "Password updated successfully"
  };
}

// Function to create an appointment
export function createAppointment(studentId, date, time, type) {
  // Check if student exists
  const student = database.students.find(s => s.studentId === studentId);
  if (!student) {
    return { success: false, message: 'Student not found' };
  }

  // Check if the time slot is already booked
  const isTimeSlotBooked = database.appointments.some(
    appointment => appointment.date === date && appointment.time === time
  );

  if (isTimeSlotBooked) {
    return { success: false, message: 'This time slot is already booked' };
  }

  // Create new appointment
  const appointment = {
    id: Date.now().toString(),
    studentId,
    date,
    time,
    type,
    createdAt: new Date().toISOString()
  };

  // Add to appointments array
  database.appointments.push(appointment);

  return { success: true, appointment };
}

// Function to create a notification
export function createNotification(studentId, notification) {
  const notificationObj = {
    id: Date.now().toString(),
    studentId,
    ...notification,
    read: false,
    createdAt: new Date().toISOString()
  };

  database.notifications.push(notificationObj);
  return notificationObj;
}

// Function to get student's notifications
export function getStudentNotifications(studentId) {
  return database.notifications
    .filter(n => n.studentId === studentId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// Function to mark notification as read
export function markNotificationAsRead(notificationId) {
  const notification = database.notifications.find(n => n.id === notificationId);
  if (notification) {
    notification.read = true;
    return true;
  }
  return false;
}

// Function to get available time slots for a staff member
export function getAvailableTimeSlots(staffId, date) {
  const bookedSlots = database.appointments
    .filter(apt => apt.staffId === staffId && apt.date === date)
    .map(apt => apt.time);

  // Define all possible time slots
  const allSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  return allSlots.filter(slot => !bookedSlots.includes(slot));
}

// Export the database and authentication functions
export default database;