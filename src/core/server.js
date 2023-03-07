const express= require('express');
const bodyParser=require('body-parser');
const passport = require('passport')
const session = require('express-session')
const reload = require('reload')
//const exec = require('child_process').exec;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const app=express();

var DriversessionLoggedin = ''
var AgentSessionLoggedin = ''

const bcrypt = require('bcrypt');
const saltRounds = 10;
//const salt = bcrypt.genSaltSync(saltRounds);

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({ extended: false }));


app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

var mysql = require('mysql');

//const { session } = require('passport');
// create a connection variable with the required details
var con = mysql.createConnection({
  host: "database-smartparking.cbahbw6yirdw.us-east-1.rds.amazonaws.com", // ip address of server running mysql
  user: "Soumaya", // user name to your mysql database
  password: "Soumaya25516122", // corresponding password
  database: "smartparking", // use the specified database
  multipleStatements : true
});
 
app.listen(3001,()=>{
  console.log("Port 3001");
})

// make to connection to the database.
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
 console.log('connection successful');
});

app.get('/', (req, res) => {
  res.json('The server is running on port 3001')
})

// get all agents from Agent table
app.get('/AgentList',(req, res) => {
  con.query('select * from smartparking.Agent', function(error, rows, fields){
    if(error) console.log(error)
    else{
      console.log(rows)
      res.send(rows)
    }
  })
})

// add an agent 
app.post('/AgentPost',(req,res)=>{

  const {cin,
   firstname, 
   lastname, 
    login,
    password, 
    phone, 
    cnss, 
    recrutdate,
    parking } = req.body;

  if(cin && firstname && lastname && login && password && phone && cnss && recrutdate && parking){
    try{
      con.query(`insert into Agent values ( ${cin}, '${firstname}', '${lastname}', '${login}', '${bcrypt.hashSync(password, saltRounds)}', ${phone}, '${cnss}', '${recrutdate}', ${parking})`)
      res.status(201).send({msg: 'Agent Added succesfully'})
      console.log('Agent added successfully')
    }catch (err){
      console.log(err)
    }
  }
})

// add driver 
app.post('/DriverPost',(req,res)=>{

  const {cin,
   firstname, 
   lastname, 
    login,
    password,
    phone,
    ptFidelity 
    } = req.body;

  if(cin && firstname && lastname && login && password && phone && ptFidelity ){
    try{
      con.query(`insert into SubscribedDriver values ( ${cin}, '${firstname}', '${lastname}', '${login}', '${bcrypt.hashSync(password, saltRounds)}', ${phone}, ${ptFidelity})`)
      res.status(201).send({msg: 'Driver Added succesfully'})
      console.log('Driver added successfully')
    }catch (err){
      console.log(err)
    }
  }
})

// Add Administrator
//console.log(bcrypt.hashSync('Soumaya12345', saltRounds))

// list of drivers

app.get('/DriverList', (req, res) => {
  con.query('select LoginSD, PasswordSD from smartparking.SubscribedDriver', function(error, rows, fields){
    if(error) console.log(error)
    else{
      console.log(rows)
      res.send(rows)
    }
  })
})

// Driver login process 
app.post('/LoginClient', async (req, res) => {
  const {login, password} = req.body;
  if( login && password ) {
    try{
      con.query('select LoginSD, PasswordSD from smartparking.SubscribedDriver', function(error, rows, fields){
        
        if(error) console.log(error) 
        else{
          var data = {}
          for(let i=0; i< rows.length; i++ ){
            data[rows[i].LoginSD] = rows[i].PasswordSD
          }
          console.log(data)
          if(Object.keys(data).find(element => element === login)){
            
            console.log(data[login])
            console.log(password)
            const validPassword = bcrypt.compareSync(password, data[login])
            if(!validPassword) {
              console.log('Invalid Password!')
              return res.redirect('/DriverLoginFail')
                 
              }

             else {
                req.session.loggedin = true
                req.sessionID = login
                DriversessionLoggedin = login
                console.log('Success!!')
                return res.redirect("/DriverLoginSuccess")
              }
          }
          else{
            console.log('Login not found!')
            return res.redirect('/DriverLoginNotFound')
          }
        }
      })

    }catch (err) {
      console.log(err)
    }
  }
  
})

// Agent login process 
app.post('/LoginAgent', async (req, res) => {
  const {login, password} = req.body;
  if( login && password ) {
    try{
      con.query('select LoginAg, PasswordAg from  smartparking.Agent', function(error, rows, fields){
        
        if(error) console.log(error) 
        else{
          var data = {}
          for(let i=0; i< rows.length; i++ ){
            data[rows[i].LoginAg] = rows[i].PasswordAg
          }
          console.log(data)
          if(Object.keys(data).find(element => element === login)){
            
            console.log(data[login])
            console.log(password)
            const validPassword = bcrypt.compareSync(password, data[login])
            if(!validPassword) {
              console.log('Invalid Password!')
              return res.redirect('/AgentLoginFail')
                 
              }

             else {
                req.session.loggedin = true
                req.session.user = login
                AgentSessionLoggedin = login
                console.log('Success!!')
                return res.redirect("/AgentLoginSuccess")
              }
          }
          else{
            console.log('Login not found!')
            return res.redirect('/AgentLoginNotFound')
          }
        }
      })

    }catch (err) {
      console.log(err)
    }
  }
  
})

// Admin login process 
app.post('/LoginAdmin', async (req, res) => {
  const {login, password} = req.body;
  if( login && password ) {
    try{
      con.query('select LoginAd, PasswordAd from  smartparking.Administrator', function(error, rows, fields){
        
        if(error) console.log(error) 
        else{
          var data = {}
          for(let i=0; i< rows.length; i++ ){
            data[rows[i].LoginAd] = rows[i].PasswordAd
          }
          console.log(data)
          if(Object.keys(data).find(element => element === login)){
            
            console.log(data[login])
            console.log(password)
            const validPassword = bcrypt.compareSync(password, data[login])
            if(!validPassword) {
              console.log('Invalid Password!')
              return res.redirect('/AdminLoginFail')
                 
              }

             else {
                req.session.loggedin = true
                req.session.user = login
                console.log('Success!!')
                return res.redirect("/AdminLoginSuccess")
              }
          }
          else{
            console.log('Login not found!')
            return res.redirect('/AdminLoginNotFound')
          }
        }
      })

    }catch (err) {
      console.log(err)
    }
  }
  
})

// Driver Login result 
app.get('/DriverLoginSuccess', (req, res) => { res.send('Success')})
app.get('/DriverLoginFail', (req, res) => { res.send('Invalid Password')})
app.get('/DriverLoginNotFound', (req, res) => { res.send('Email not Found')})
// Agent Login result
app.get('/AgentLoginSuccess', (req, res) => { res.send('Success')})
app.get('/AgentLoginFail', (req, res) => { res.send('Invalid Password')})
app.get('/AgentLoginNotFound', (req, res) => { res.send('Email not Found')})
// Admin Login result
app.get('/AdminLoginSuccess', (req, res) => { res.send('Success')})
app.get('/AdminLoginFail', (req, res) => { res.send('Invalid Password')})
app.get('/AdminLoginNotFound', (req, res) => { res.send('Email not Found')})


// free spaces button in agent dashboard
app.get('/AgentfreeSpacesButton', (req, res) => {
  con.query('select smartparking.Parking.NbFreeSpaces from smartparking.Parking, smartparking.Agent where smartparking.Parking.IdParking = smartparking.Agent.IdParking', function(error, rows, fields){
    if(error) console.log(error)
    else{
      console.log(parseInt(Object.values(rows[0])))
      res.send(JSON.stringify(parseInt(Object.values(rows[0]))))
      //res.send(rows)
    }
  })
})

// Agent dashboard free spaces table
app.get('/AgentfreeSpacesTable', (req, res) => {
  con.query('Select smartparking.ParkingSpace.IdSpace, smartparking.ParkingSpace.SpaceState from smartparking.ParkingSpace where smartparking.ParkingSpace.IdParking = (select smartparking.Parking.IdParking from smartparking.Parking) Order by smartparking.ParkingSpace.IdSpace ASC', function(error, rows, fields){
    if(error) console.log(error)
    else{
      console.log(rows)
      res.send(rows)
    }
  })
})

// Agent dashboard week's balance graph
app.get('/AgentBalanceGraph', (req, res) => {
  con.query('Select substring(dayname(smartparking.Transaction.TrDate), 1, 3), sum(smartparking.Transaction.Tr_Amount) from smartparking.Transaction where smartparking.Transaction.TrDate > (now() - interval 7 day) group by DAYNAME(smartparking.Transaction.TrDate) order by DAYNAME(smartparking.Transaction.TrDate) desc', function(error, rows, fields){
    if(error) console.log(error)
    else{
      console.log(rows)
      res.send(rows)
    }
  })
})


// today's balance button in agent dashboard
app.get('/AgentTodayBalanceButton', (req, res) => {
  con.query('Select sum(smartparking.Transaction.Tr_Amount) from smartparking.Transaction where (smartparking.Transaction.TrDate = curdate())', function(error, rows, fields){
    if(error) console.log(error)
    else{
      console.log(parseFloat(Object.values(rows[0])))
      res.send(parseFloat(Object.values(rows[0])).toPrecision(4))
      //res.send(rows)
    }
  })
})


// Agent dashboard balance details
app.get('/AgentBalanceDetails', (req, res) => {
  con.query('select distinct smartparking.Transaction.IdTransaction, smartparking.Transaction.Tr_Amount, smartparking.SubscribedDriver.FirstnameSD, smartparking.SubscribedDriver.LastNameSD, smartparking.Reservation.LicencePlate_Res, smartparking.Transaction.TrDate from smartparking.Transaction, smartparking.SubscribedDriver, smartparking.Reservation where Transaction.CIN_SD = SubscribedDriver.CIN_SD and SubscribedDriver.CIN_SD = Reservation.CIN_SD and (Transaction.TrDate between "2021-01-01" and "2021-12-30") group by smartparking.Transaction.IdTransaction  order by smartparking.Transaction.IdTransaction ', function(error, rows, fields){
    if(error) console.log(error)
    else{
      console.log(rows)
      res.send(rows)
    }
  })
})

// Admin dashboard number of parkings button
app.get('/AdminNbParkingsButton', (req, res) => {
  con.query('select count(*) from  smartparking.Parking', function(error, rows, fields){
    if(error) console.log(error)
    else{
      console.log(parseInt(Object.values(rows[0])))
      res.send(JSON.stringify(parseInt(Object.values(rows[0]))))
      //res.send(rows)
    }
  })
})

// Admin dashboard parking table
app.get('/AdminParkingsTable', (req, res) => {
  con.query('select smartparking.Parking.address, smartparking.Agent.FirstnameAg, smartparking.Agent.LastNameAg, (6 - smartparking.Parking.NbFreeSpaces) from smartparking.Agent, smartparking.Parking where smartparking.Parking.IdParking = smartparking.Agent.IdParking;', function(error, rows, fields){
    if(error) console.log(error)
    else{
      console.log(rows)
      res.send(rows)
      //res.send(rows)
    }
  })
})

// Admin dashboard number of agents button
app.get('/AdminNbAgentButton', (req, res) => {
  con.query("select count(*) from smartparking.Agent, smartparking.Parking where smartparking.Agent.IdParking = smartparking.Parking.IdParking and smartparking.Parking.address = 'Tunis'", function(error, rows, fields){
    if(error) console.log(error)
    else{
      console.log(parseInt(Object.values(rows[0])))
      res.send(JSON.stringify(parseInt(Object.values(rows[0]))))
      //res.send(rows)
    }
  })
})

// Admin dashboard Agents table
app.get('/AdminAgentsTable', (req, res) => {
  con.query('select smartparking.Agent.CINAg, smartparking.Agent.FirstnameAg, smartparking.Agent.LastNameAg, smartparking.Parking.address, smartparking.Agent.RecrutDateAg from smartparking.Agent, smartparking.Parking where smartparking.Agent.IdParking = smartparking.Parking.IdParking', function(error, rows, fields){
    if(error) console.log(error)
    else{
      console.log(rows)
      res.send(rows)
      //res.send(rows)
    }
  })
})

// Admin dashboard : remove Agent
app.post('/AdminDeleteAgent',(req,res)=>{

  const cin = req.body.cin;

  if(cin){
    try{
      con.query(`delete from smartparking.Agent where smartparking.Agent.CINAg=${cin}`)
      res.status(201).send({msg: 'Agent removed succesfully'})
      console.log('Agent removed successfully')
    }catch (err){
      console.log(err)
    }
  }
})

// Agent profile : get personal information
app.get('/AgentProfilePersonalInfo', (req, res) => {
  con.query(`select smartparking.Agent.FirstnameAg, smartparking.Agent.LastNameAg, smartparking.Agent.CINAg, smartparking.Agent.LoginAg  FROM smartparking.Agent where LoginAg = '${AgentSessionLoggedin}';`, function(error, rows, fields){
    if(error) console.log(error)
    else{
      console.log(rows)
      res.send(rows)
      //res.send(rows)
    }
  })
})
 

// Driver profile personal information
app.get('/DriverProfilePersonalInfo', (req, res) => {
  con.query(`select smartparking.SubscribedDriver.FirstnameSD, smartparking.SubscribedDriver.LastNameSD, smartparking.SubscribedDriver.CIN_SD, smartparking.SubscribedDriver.LoginSD from smartparking.SubscribedDriver where LoginSD = '${DriversessionLoggedin}';`, function(error, rows, fields){
    if(error) console.log(error)
    else{
      console.log(rows)
      res.send(rows)
      //res.send(rows)
    }
  })
})
 

// get parking longitude and latidude for driver home map
app.get('/DriverHomeParkingInfo', (req, res) => {
  con.query(`SELECT * FROM smartparking.Parking;`, function(error, rows, fields){
    if(error) console.log(error)
    else{
      console.log(rows)
      res.send(rows)
      //res.send(rows)
    }
  })
})

// get car feature for driver profile
app.get('/DriverProfileCarFeatures', (req, res) => {
  con.query(`SELECT licencePlateCar, CarSize, CarColor, CarBrand
  from smartparking.Car, smartparking.SubscribedDriver
  where smartparking.Car.CIN_SD = smartparking.SubscribedDriver.CIN_SD 
  and smartparking.SubscribedDriver.LoginSD = '${DriversessionLoggedin}';`, function(error, rows, fields){
    if(error) console.log(error)
    else{
      console.log(rows)
      res.send(rows)
      //res.send(rows)
    }
  })
})

// get history of reservation driver drawer
app.get('/DriverAllReservations', (req, res) => {
  
      con.query(`SELECT Reservation.LicencePlate_Res, Reservation.ArrivalDate_Res,  
      Reservation.ArrivalTime_Res, Reservation.Ispaid, Reservation.IdReservation,
      smartparking.Reservation.CIN_SD
        FROM smartparking.Reservation, smartparking.SubscribedDriver
        where smartparking.Reservation.CIN_SD = smartparking.SubscribedDriver.CIN_SD
        And smartparking.SubscribedDriver.LoginSD = '${DriversessionLoggedin}';`, function(error, rows, fields){
        if(error) console.log(error)
        else{
          console.log(rows)
          res.send(rows)
          //res.send(rows)
        }
      
  })
}
)

// delete reservation from driver reservations
app.post('/DeleteReservation',(req,res)=>{

  const { resId } = req.body;

  if(resId){
    try{
      con.query(` SET SQL_SAFE_UPDATES = 0;
      update smartparking.ParkingSpace
      set smartparking.ParkingSpace.SpaceState = 0
      where smartparking.ParkingSpace.IdReservation = ${resId} ; 
      
      update smartparking.ParkingSpace
      set smartparking.ParkingSpace.IdReservation = null
      where smartparking.ParkingSpace.IdReservation = ${resId} ; 
      
      delete from smartparking.Reservation
      where smartparking.Reservation.IdReservation = ${resId};
      update smartparking.Parking
      set NbFreeSpaces = NbFreeSpaces +1;
      SET SQL_SAFE_UPDATES = 1;`)
      res.status(201).send({msg: 'Reservation deleted succesfully'})
      console.log('Reservation deleted successfully')
    }catch (err){
      console.log(err)
    }
  }
})


// make reservation 
app.post('/MakeReservation',(req,res)=>{

  const {  cinRes, dateRes, timeRes, MatRes } = req.body;
  console.log( cinRes, dateRes, timeRes, MatRes)
  var idRes = 0
  if( cinRes && dateRes && timeRes && MatRes){
  try{
      
      con.query(`SELECT smartparking.Reservation.IdReservation
      FROM smartparking.Reservation 
      order by smartparking.Reservation.IdReservation desc 
      limit 1; `,  function(error, rows, fields){
                if(error) console.log(error)
            else{
              console.log(parseInt(Object.values(rows[0])))
              idRes = parseInt(Object.values(rows[0])) +1
            }
      })
      var data = {}
      con.query(`SELECT IdSpace, IdReservation, SpaceState FROM smartparking.ParkingSpace;`, function(error, rows, fields){
      if(error) console.log(error)
      else{
        for(let i=0; i< rows.length; i++ ){
          data[rows[i].IdSpace] = rows[i].IdReservation
        } 
        //console.log(data)
        for (const [key, value] of Object.entries(data)) {
          if(value === null){
            console.log(key, value)
            con.query(`SET SQL_SAFE_UPDATES = 0;
            insert into smartparking.Reservation values (
              ${idRes},
              ${cinRes},
              '${MatRes}',
              '${dateRes}',
              '${timeRes}',
              0
              );
              
              update smartparking.ParkingSpace
              set smartparking.ParkingSpace.IdReservation = ${idRes}
              where smartparking.ParkingSpace.IdSpace  =  ${key}  
              and smartparking.ParkingSpace.SpaceState = 0;
              
              update smartparking.ParkingSpace
              set smartparking.ParkingSpace.SpaceState = 1
              where smartparking.ParkingSpace.IdReservation = ${idRes};
              
              update smartparking.Parking
              set NbFreeSpaces = NbFreeSpaces -1;
              SET SQL_SAFE_UPDATES = 1;`)
              res.status(201).send({msg: 'Reservation Added succesfully'})
              console.log('Reservation Added successfully')
            break
          } else{ 
            continue
          }
        }
      }
    })

    }catch (err){
     console.log(err)
   }
  }
})



// post reviews from driver support
app.post('/DriverSupportReviews', (req,res) =>{
  const {  SubjectRev, ContentRev, msgDateTime} = req.body;
  var cin = 0
  var idRev = 0
  if(SubjectRev && ContentRev ){
    try{
      con.query(`SELECT smartparking.Review.IdReview
      FROM smartparking.Review 
      order by smartparking.Review.IdReview desc 
      limit 1; `,  function(error, rows, fields){
            if(error) console.log(error)
            else{
              //console.log(parseInt(Object.values(rows[0])))
              idRev =  parseInt(Object.values(rows[0])) +1
              con.query(`SELECT smartparking.SubscribedDriver.CIN_SD
              FROM smartparking.SubscribedDriver
              where smartparking.SubscribedDriver.LoginSD = '${DriversessionLoggedin}'; `,  function(error, rows, fields){
                    if(error) console.log(error)
                    else{
                      //console.log(parseInt(Object.values(rows[0])))
                      cin =  parseInt(Object.values(rows[0]))
                      console.log(idRev)
                      console.log(cin)
                      con.query(`insert into smartparking.Review values( ${idRev}, '${SubjectRev}', "${ContentRev}", null, ${cin}, 13013425, 0, '${msgDateTime}');`)
                      res.status(201).send({msg: 'Review Added succesfully'})
                      console.log('Review Added successfully')
                    }
              })
            }
      })
      
      
    }catch (err) {
      console.log(err)
    
    }
  }
} )

// get number of unread reviews
app.get('/UnreadReviewsButton', (req, res) => {
  con.query(`select count(*) from smartparking.Review 
              where Lu=0;`, function(error, rows, fields){
    if(error) console.log(error)
    else{
      console.log(parseInt(Object.values(rows[0])))
      res.send(JSON.stringify(parseInt(Object.values(rows[0]))))
      //res.send(rows)
    }
  })
})

// get list of reviews for admin
app.get('/AdminReviewList', (req, res) => {
  con.query(`select  smartparking.SubscribedDriver.CIN_SD, idReview,  
  concat( smartparking.SubscribedDriver.FirstnameSD, " ", smartparking.SubscribedDriver.LastNameSD) as username,  
  concat( subjectRev, ":  ", contentRev ) AS messageText,
  concat(TIMESTAMPDIFF(HOUR, messageTime, now()), ' Hour(s) ago')  as messageTime1
  from smartparking.Review, smartparking.SubscribedDriver
  where Lu=0 and smartparking.Review.CIN_SD=smartparking.SubscribedDriver.CIN_SD
  group by smartparking.Review.CIN_SD;  `, function(error, rows, fields){
    if(error) console.log(error)
    else{
      console.log(rows)
      res.send(rows)
      //res.send(rows)
    }
  })
})

// get reviews of a certain user for admin chat screen
app.all('/AdminChatScreen', (req,res) =>{
  const {  cin } = req.body;
  
  if( cin ){
    try{
      con.query(`select IdReview as _id, ContentRev as text , messageTime as createdAt
      from smartparking.Review 
      where CIN_SD= ${cin};`,  function(error, rows, fields){
            if(error) console.log(error)
            else{
              con.query(`select  Review.CIN_SD as _id, concat( FirstnameSD," ", LastNameSD) as name
              from smartparking.SubscribedDriver, smartparking.Review
              where SubscribedDriver.CIN_SD = Review.CIN_SD and Review.CIN_SD=${cin};`, function(error, data, fields){
                
                
                for(let i=0; i<rows.length;i++){
                  rows[i]["user"] = data[i]
                }
                
              })
              con.query(`select IdReview+1000 as _id, ReplyRev as text , 
              messageTime as createdAt
              from smartparking.Review
              where CIN_SD= ${cin} ;`,function(error, data, fields){

                for(let i=0;i<data.length;i++){
                  data[i]["user"] = { _id: 13013425, name: "Soumaya Mhenni"}
                  rows.push(data[i])
                }
                
                var msg = []
                for(let i=0; i<rows.length;i++){
                  if(rows[i]._id <1000){
                    msg.push(rows[i])
                  }
                }
                
                var resp = []
                for(let i=0; i<rows.length;i++){
                  if(rows[i]._id >=1000){
                    resp.push(rows[i])
                  }
                }

                var alternate = []
                for(let i=0;i<msg.length; i++){
                  alternate.push(msg[i], resp[i])
                }
                console.log(alternate)
                res.send(alternate)
                

              })
              
            }
      
      })
      
    }catch (err) {
      console.log(err)
    
    }
  }
} )

// post admin reply to client review
app.post('/AdminReply', (req,res) =>{
  const {  reply, cin } = req.body;
  console.log(reply)
  const response = reply[0]["text"]
  
  if( reply && cin){
    try{
      con.query(`SET SQL_SAFE_UPDATES = 0;

      update smartparking.Review
      set smartparking.Review.Lu = 1
      where smartparking.Review.Lu = 0 and smartparking.Review.CIN_SD = ${cin} ;
      
      update smartparking.Review
      set smartparking.Review.ReplyRev = "${response}"
      where smartparking.Review.Lu = 1 and smartparking.Review.ReplyRev is null  ; 
      
      SET SQL_SAFE_UPDATES = 1;`)
      res.status(201).send({msg: 'Reply Added succesfully'})
              console.log('Reply Added successfully')
    }catch (err) {
      console.log(err)
    
    }
  }
})

// get longitude, latitude and cin for reservation list
app.all('/ReservationLongLat', (req, res)=>{
  const { idReser } =  req.body;
  if(idReser){
    try{
      con.query(`select smartparking.Parking.Longitude, smartparking.Parking.Latitude
      from smartparking.Parking, smartparking.Reservation
      where smartparking.Reservation.IdReservation= ${idReser}`, function(error, rows, fields){
        console.log(rows)
        res.send(rows)
      })
    }catch (err) {
      console.log(err)
    
    }
  }
}) 

//make payment
app.post('/MakePayment',(req,res)=>{

  const {  cinPay, datePay, AmountPay, resId} = req.body;
  console.log( cinPay, datePay, AmountPay, resId)
  var idPay = 0
  if( cinPay && datePay && AmountPay && resId){
  try{
      
      con.query(`SELECT smartparking.Transaction.IdTransaction
      FROM smartparking.Transaction 
      order by smartparking.Transaction.IdTransaction desc 
      limit 1; `,  function(error, rows, fields){
                if(error) console.log(error)
            else{
              console.log(parseInt(Object.values(rows[0])))
              idPay = parseInt(Object.values(rows[0])) +1
              con.query(`SET SQL_SAFE_UPDATES = 0;

              insert into smartparking.Transaction values 
              ( ${idPay},  ${cinPay}, ${AmountPay},  "0123456789", "1234", '2020-01-12', '${datePay.substr(0,10)}',${resId});
              
              update smartparking.Reservation
              set smartparking.Reservation.Ispaid=1 
              where smartparking.Reservation.IdReservation= ${resId};
              
              update smartparking.SubscribedDriver
              set smartparking.SubscribedDriver.FidelityPts = smartparking.SubscribedDriver.FidelityPts + 10
              where smartparking.SubscribedDriver.CIN_SD=${cinPay};

              update smartparking.ParkingSpace
              set smartparking.ParkingSpace.SpaceState = 0
              where smartparking.ParkingSpace.IdReservation = ${resId} ; 
              
              update smartparking.ParkingSpace
              set smartparking.ParkingSpace.IdReservation = null
              where smartparking.ParkingSpace.IdReservation = ${resId} ;
              
              update smartparking.Parking
              set NbFreeSpaces = NbFreeSpaces +1;

              SET SQL_SAFE_UPDATES = 1;`)
              res.status(201).send({msg: 'Transaction Added succesfully'})
              console.log('Transaction Added successfully')
            }
      }) 

    }catch (err){
     console.log(err)
   }
  }
})

// get payment history list
app.get('/PaymentHistory', (req, res) => {
  con.query(`SELECT IdTransaction, TrDate, Tr_Amount FROM smartparking.Transaction, smartparking.SubscribedDriver
  where smartparking.SubscribedDriver.CIN_SD= smartparking.Transaction.CIN_SD
  and smartparking.SubscribedDriver.LoginSD='${DriversessionLoggedin}';`, function(error, rows, fields){
    if(error) console.log(error)
    else{
      console.log(rows)
      res.send(rows)
      //res.send(rows)
    }
  })
})

// delete transaction from driver payment list
app.post('/DeletePayment',(req,res)=>{

  const { payId } = req.body;

  if(payId){
    try{
      con.query(`delete from smartparking.Transaction
      where smartparking.Transaction.IdTransaction = ${payId};`)
      res.status(201).send({msg: 'transaction deleted succesfully'})
      console.log('transaction deleted successfully')
    }catch (err){
      console.log(err)
    }
  }
})

// get total number of loyalty points
app.get('/TotalLoyaltyPts', (req, res) => {
  con.query(`SELECT FidelityPts FROM smartparking.SubscribedDriver
  where LoginSD='${DriversessionLoggedin}';`, function(error, rows, fields){
    if(error) console.log(error)
    else{
      console.log(parseInt(Object.values(rows[0])))
      res.send(JSON.stringify(parseInt(Object.values(rows[0]))))
      //res.send(rows)
    }
  })
})

// get driver cin
app.get('/DriverCin', (req, res) => {
  con.query(`SELECT CIN_SD FROM smartparking.SubscribedDriver
  where LoginSD='${DriversessionLoggedin}';`, function(error, rows, fields){
    if(error) console.log(error)
    else{
      console.log(parseInt(Object.values(rows[0])))
      res.send(JSON.stringify(parseInt(Object.values(rows[0]))))
      //res.send(rows)
    }
  })
})

// get reply from admin for driver notification

app.get('/AdminReplyNotif', (req, res) => {
  con.query(`SELECT smartparking.Review.IdReview, smartparking.Review.SubjectRev, smartparking.Review.ReplyRev, smartparking.Review.Lu 
  FROM smartparking.Review, smartparking.SubscribedDriver
  where smartparking.SubscribedDriver.CIN_SD=smartparking.Review.CIN_SD
  and smartparking.SubscribedDriver.LoginSD = '${DriversessionLoggedin}'
  order by IdReview desc
  limit 1;
  `, function(error, rows, fields){
    if(error) console.log(error)
    else{
      console.log(rows)
      res.send(rows)
      //res.send(rows)
    }
  })
})

// reset Agent password
app.post('/ResetAgentPassword',(req,res)=>{

  const { password } = req.body;
  console.log(password)
  if(password){
    try{
      con.query(` update smartparking.Agent 
      set smartparking.Agent.PasswordAg = '${bcrypt.hashSync(password, saltRounds)}'
      where smartparking.Agent.LoginAg = '${AgentSessionLoggedin}';`)
      res.status(201).send({msg: 'password reset succesfully'})
      console.log('password reset successfully')
    }catch (err){
      console.log(err)
    }
  }
})


// add parking 
app.post('/AddParking',(req,res)=>{

  const { idParking, long, lat, addr } = req.body;
  
  if(idParking && long && lat && addr ){
    try{
      con.query(`insert into smartparking.Parking values(
        ${idParking},
        ${long},
        ${lat},
        6,
        '${addr}');`)
      res.status(201).send({msg: 'parking added succesfully'})
      console.log('parking added successfully')
    }catch (err){
      console.log(err)
    }
  }
})


// remove parking 
app.post('/ParkingDelete',(req,res)=>{

  const { addr } = req.body;
  
  if( addr ){
    try{
      con.query(` SET SQL_SAFE_UPDATES = 0;
      delete from smartparking.Parking
      where smartparking.Parking.address = '${addr}';
       SET SQL_SAFE_UPDATES = 1;`)
      res.status(201).send({msg: 'parking deleted succesfully'})
      console.log('parking deleted successfully')
    }catch (err){
      console.log(err)
    }
  }
})