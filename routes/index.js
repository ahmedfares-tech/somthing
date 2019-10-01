/**
 * // 1- Finish Attend , 2- Fix Async & await issue
 * ? Somthing for collect money
 * ? Re Var all things with mine codes
 * ! finish login
 */

/**
 *  ?CODE BASE => S/T + R/I/M + Number
 * ! CODE BASE => Student/Teacher + Registeration/Info/Mix + Number
 */
TODO:
/**
 * !1 - Edit Navbar (* Fix Mobile Version, *Put Dropdown for all stuff, *Fix Links and sublinks)
 * !2 - Fix Login Style
 * *3- Search (*ID, *Number, *CourseCode, *Name) && Ajax auto response
 * !4 - Put Page For Change User Password
 * *5 - List Student For Each Course
 * *6 - put Missing things to tables
 * *7 - History For Attend (CourseCodeHistory , StudentHistory)
 * *8 - Collect (Center,Teacher,Student) => Money In one page
 * *9 - ID Section Put ajax for show name for kill errors
 * *10 - Update Data (Teacher=>{CourseData:{courseDay,CourseTime,Costs},TeacherNumber})
 * *10 - Update Data (Students =>{CourseCode With Him Data such DAY,Time,COST,TEachername})
 * *11 - Fix In COST Any symbols !Dots Only for Decimal Numbers
 * *12 - In Attend Table Ajax
 * *13 - Run StudentMix and TeacherMix for get data after post new data
 * *14 - PUT Sessions and validator
 * *15 - Controller For Fast Use And best Apperance 
 * *16 - Login with Passport.js
 */
var express = require("express");
var router = express.Router();
var app = express();
const days_function = require("../models/Global/day");
const httpmsgs = require("http-msgs");
const date = require("date-and-time");
const attend = require("../models/Global/Attend");
const bycrypt = require('bcryptjs')
//Controllers Start

const login = require('../models/login/login');
const TM00 = require("../models/teacher/TeacherMix");
const SM00 = require("../models/Student/StudentMix");
const addcourse = require("../models/Global/courses");
const addgrades = require("../models/Global/Grade");

// Var Routing Directions

const routingcontroller = require("../controller/routeing");

// Student Controller

const StudentController = require("../controller/StudentController");

// Teacher Controller

const TeacherController = require("../controller/TeacherController");

//End Of Controller

/* GET home page. */

router.get("/student", routingcontroller.StudentRouting);

router.get("/teacher", routingcontroller.TeachersRouting);
router.get("/init", routingcontroller.initlatiz);
//FOR Code in index.js only remove after move to controllers
var TeacherREG = require("../models/teacher/TeacherReg");
var TeacherData = require("../models/teacher/TeacherData");
var StudentREG = require("../models/Student/StudentReg");
var StudentData = require("../models/Student/StudentCourses");
//FOR Code in index.js only remove after move to controllers

//STUDENT DATA

// Registeration for New Student
router.post("/studentREG", StudentController.STREG);

// Registeration New Course For Student
router.post("/StudentCoursesREG", StudentController.STCA);

// Search For Student
router.post("/studentSearch", StudentController.STSEA);

// END OF STUDENT DAT

// Student Tables

router.get("/ListStudent", StudentController.ListStudent);

// End Student Tables

// Students Course Tables

//Get Courses That Registered for Student
router.get("/ListStudentCourse/:id", StudentController.StudentsCourse);

// END Students Course Tables

// Teacher Data

// Registeration For New Teacher
router.post("/teacherREG", TeacherController.TCREG);

// Registration New Course For Teacher
router.post("/teacherCourseREG", TeacherController.TCCREG);

// Search for Teacher
router.post("/TeacherSearch", TeacherController.TCSEA);

//End Teacher Data

// TeachersTable
router.get('/signup', (req, res, next) => {
  const admindata = new login({
    username: "admin",
    password: bycrypt.hashSync("123456789#*#", 10)
  })
  admindata.save((error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log(result)
    }
  })
})
// List Teachers Table

router.get("/ListTeachers", (req, res, next) => {
  login.find({}, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      var checkstatus = user[0].loginvalue
      if (checkstatus == true) {
        TeacherREG.find({}, (error, result) => {
          if (error) {
            console.log(error);
          } else {
            res.render("partials/Teachers/listTeachers", { Teachers: result });
          }
        });
      } else {
        res.redirect('/login')
      }
    }
  })

});

router.get("/ListTeachersCourse/:id", (req, res, next) => {
  login.find({}, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      var checkstatus = user[0].loginvalue
      if (checkstatus == true) {
        var TeacherIDFromURL = req.params.id;
        TM00.find({ TeacherID: TeacherIDFromURL }, (error, result) => {
          if (error) {
            console.log(error);
          } else {
            console.log(result);
            res.render("partials/Teachers/listTeachersCourse", {
              TeachersCourses: result
            });
          }
        });
      } else {
        res.redirect('/login')
      }
    }
  })

});
router.get("/mix", async (req, res, next) => {
  login.find({}, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      var checkstatus = user[0].loginvalue
      if (checkstatus == true) {
        counter = 0;
        SM00.deleteMany({}, (error, finish) => {
          if (error) {
            console.log(error);
          } else {
            console.log("DeLETED=============");
          }
        });
        StudentREG.find({}, { _id: 0, __v: 0 }, (error, studentinfo) => {
          if (error) {
            console.log(error);
          } else {
            StudentData.find({}, { _id: 0, __v: 0 }, (error, studentcourse) => {
              var allstudentcourses = studentcourse.length
              if (error) {
                console.log(error);
              } else {
                // console.log('studentinfo =>', studentinfo)
                // console.log('studeentcourse =>', studentcourse)
                var studentfulldata = studentinfo.map(studentin => {
                  //   console.log('studentin=>', studentin)
                  Studenttotal = [];
                  Studenttotal.push(
                    studentin,
                    studentcourse.filter(studentco => {
                      return studentin.Studentid === studentco.StudentIDStatic;
                    })
                  );

                  // console.log('Studenttotal =>', Studenttotal)

                  return Studenttotal;
                });
                for (var i = 0; i < studentfulldata.length; i++) {
                  var studentcourseslength = studentfulldata[i][1].length;
                  for (var j = 0; j < studentcourseslength; j++) {
                    var studentid = studentfulldata[i][0].Studentid;
                    var studentname = studentfulldata[i][0].StudentName;
                    var studentphone = studentfulldata[i][0].Phones.studentphone;
                    var parentsphone = studentfulldata[i][0].Phones.parentsphone;
                    var regcost = studentfulldata[i][0].REGcost;

                    var coursegrade = studentfulldata[i][1][j].CourseGrade;
                    var CourseName =
                      studentfulldata[i][1][j].StudentCourseInformation.CourseName;
                    var TeacherName =
                      studentfulldata[i][1][j].StudentCourseInformation.TeacherName;
                    var CourseDay =
                      studentfulldata[i][1][j].StudentCourseInformation.CourseDay;
                    var CourseTime =
                      studentfulldata[i][1][j].StudentCourseInformation.CourseTime;
                    var CourseCode =
                      studentfulldata[i][1][j].StudentCourseInformation.CourseCode;
                    var CourseCost = studentfulldata[i][1][j].StudentCourseCost;
                    // console.log('============START============');
                    // console.log(studentid);
                    // console.log(studentname);
                    // console.log(studentphone);
                    // console.log(parentsphone);
                    // console.log(regcost);
                    // console.log("===========MID===============");
                    // console.log(CourseName);
                    // console.log(TeacherName);
                    // console.log(CourseDay);
                    // console.log(CourseHour + ':' + CourseMinutes + '' + CourseAP);
                    // console.log(CourseCost);
                    // console.log("==========END==============");
                    // console.log("            ");
                    // console.log("            ");
                    // console.log("            ");

                    const mixed = new SM00({
                      StudentID: studentid,
                      StudentName: studentname,
                      StudentNumber: studentphone,
                      ParentsNumber: parentsphone,
                      TeacherName: TeacherName,
                      coursegrade: coursegrade,
                      courseName: CourseName,
                      courseDay: CourseDay,
                      courseTime: CourseTime,
                      courseCost: CourseCost,
                      CourseCode: CourseCode,

                    });
                    mixed.save((error, result) => {
                      if (error) {
                        console.log(error);
                      } else {
                        console.log(result);
                        console.log('allstudentcourses =>', allstudentcourses)
                        if (counter == allstudentcourses - 1) {
                          SM00.find({}, (error, result) => {
                            if (error) {
                              console.log(error);
                            } else {
                              var fuck = result.length;
                              var money = 0;
                              for (var i = 0; i < result.length; i++) {
                                var money = money + result[i].courseCost;
                              }

                              res.render("partials/Students/mix", {
                                data: result,
                                count: fuck,
                                money: money
                              });
                            }
                          });
                        }
                      }
                      counter++
                    });
                  }

                }
              }
            });
          }
        });
      } else {
        res.redirect('/login')
      }
    }
  })


});

router.post("/addcourse", (req, res, next) => {
  login.find({}, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      var checkstatus = user[0].loginvalue
      if (checkstatus == true) {
        var course = req.body.GCourses;
        addcourse.find({ CourseName: course }, (error, result) => {
          if (error) {
            console.log(error);
          } else {
            if (result == "") {
              addcourse.find({}, (error, result) => {
                if (error) {
                  console.log(error);
                } else {
                  var howmuchcourse = result.length;
                  //CourseCounter
                  const newcourse = new addcourse({
                    CourseCounter: howmuchcourse + 1,
                    CourseName: req.body.GCourses
                  });
                  newcourse.save((error, result) => {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log(result);
                      res.redirect("/new");
                    }
                  });
                }
              });
            } else {
              res.send(
                "This " +
                result[0].CourseName +
                " Course Is Exist with ID: " +
                result[0].CourseCounter
              );
            }
          }
        });
      } else {
        res.redirect('/login')
      }
    }
  })

});
router.get("/new", (req, res, next) => {
  login.find({}, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      var checkstatus = user[0].loginvalue
      if (checkstatus == true) {
        addcourse.find({}, (error, result) => {
          if (error) {
            console.log(error);
          } else {
            res.render("partials/Courses/Courses", { data: result });
          }
        });
      } else {
        res.redirect('/login')
      }
    }
  })

});


router.get("/", (req, res, next) => {

});

router.get("/home", async (req, res, next) => {
  login.find({}, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      var checkstatus = user[0].loginvalue
      if (checkstatus == true) {
        counter = 0;
        TeacherCheck = [];
        fuck = [];
        TeacherREG.findAsync({}, { _id: 0, TeacherName: 1, TeacherID: 1, TeacherNumber: 1, TeacherCourse: 1 },
          (error, users) => {
            if (error) {
              console.log(error);
            } else {
              TeacherCheck.push(users);
              // console.log(TeacherCheck)
              TeacherData.find({}, { _id: 0, __v: 0 }, (error, courses) => {
                var hmcourse = courses.length
                if (error) {
                  console.log(error);
                } else {
                  TM00.deleteMany({}, (error, result) => {
                    if (error) {
                      console.log(error);
                    } else {
                      // console.log("5lsna mn el data el 2dema");
                    }
                  });
                  // console.log('TeacherREG => ', users)
                  var gettablefuck = users.map(user => {
                    //  console.log('Users=>', user)
                    Teachercourse = [];
                    Teachercourse.push(
                      user,
                      courses.filter(course => {
                        return user.TeacherID === course.TeacherStaticID;
                      })
                    );
                    return Teachercourse;
                  });

                  var HMUSERS = gettablefuck.length;

                  //    console.log('HMUSERS=>', HMUSERS)
                  for (var i = 0; i < HMUSERS; i++) {
                    //  console.log(gettablefuck[i]);
                    var other = gettablefuck[i][1].length;
                    // console.log(other)
                    for (var j = 0; j < other; j++) {
                      var TeacherID = gettablefuck[i][1][j].TeacherStaticID;
                      var TeacherName = gettablefuck[i][0].TeacherName;
                      var TeacherCourseName = gettablefuck[i][0].TeacherCourse;
                      var TeacherNumber = gettablefuck[i][0].TeacherNumber;

                      var Courseday =
                        gettablefuck[i][1][j].TeacherCourseTime.CourseDay;
                      var CourseTime =
                        gettablefuck[i][1][j].TeacherCourseTime.CourseTime;
                      var TeacherCourseGrade =
                        gettablefuck[i][1][j].TeacherCourseGrade;
                      var CourseCode = gettablefuck[i][1][j].CourseCode;
                      var TotalCost = gettablefuck[i][1][j].TotalCost;
                      var TeacherCost = gettablefuck[i][1][j].TeacherCost;
                      var CenterCost = gettablefuck[i][1][j].CenterCost;

                      const Mixed = new TM00({
                        TeacherID: TeacherID,
                        TeacherName: TeacherName,
                        TeacherNumber: TeacherNumber,
                        CourseName: TeacherCourseName,
                        CourseDay: Courseday,
                        CourseGrade: TeacherCourseGrade,
                        CourseTime: CourseTime,
                        TotalCost: TotalCost,
                        TeacherCost: TeacherCost,
                        CenterCost: CenterCost,
                        CourseCode: CourseCode
                      });
                      Mixed.save((error, result) => {
                        if (error) {
                          console.log(error);
                        } else {
                          // console.log("KOSM NODEJS wel MONGODB =>", result)
                          console.log('counter => ', counter)
                          if (counter == hmcourse - 1) {
                            const today = days_function.days();
                            console.log('render function start <======')
                            TM00.findAsync({}, (error, result) => {
                              if (error) {
                                console.log(error);
                              } else {
                                // console.log(result)
                                res.render("partials/Home.hbs", { data: result, count: result.length });
                              }
                            });

                          }

                        }
                        counter++
                      });
                    }
                    //      console.log("Teacher REG =>",gettablefuck[i][0].TeacherName)


                  }
                  // console.log(gettablefuck[0][1][4])
                }
              });

            }

          }
        );

      } else {
        res.redirect('/login')
      }
    }
  })


});

router.post("/addgrade", (req, res, next) => {
  var Grade = req.body.GGrade;

  addgrades.find({ GradeLevel: Grade }, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      if (result == "") {
        addgrades.find({}, (error, result) => {
          if (error) {
            console.log(error);
          } else {
            var howmuchgrade = result.length;

            const newgrade = new addgrades({
              GradeCounter: howmuchgrade + 1,
              GradeLevel: req.body.GGrade
            });
            newgrade.save((error, result) => {
              if (error) {
                console.log(error);
              } else {
                console.log(result);
                res.redirect("/grades");
              }
            });
          }
        });
      } else {
        res.send(
          "This " +
          result[0].GradeLevel +
          " Course Is Exist with ID: " +
          result[0].GradeCounter
        );
      }
    }
  });
});
router.get("/grades", (req, res, next) => {
  login.find({}, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      var checkstatus = user[0].loginvalue
      if (checkstatus == true) {
        addgrades.find({}, (error, grades) => {
          if (error) {
            console.log(error);
          } else {
            res.render("partials/Courses/Grade", { data: grades });
          }
        });
      } else {
        res.redirect('/login')
      }
    }
  })

});

router.post("/ajaxcoursename", (req, res, next) => {
  teacherarry = [];
  var coursename = req.body.coursenameretive;
  //console.log(coursename)
  TeacherREG.find({ TeacherCourse: coursename }, (error, Teacher) => {
    if (error) {
      console.log(error);
    } else {
      //console.log(coursename)
      for (var i = 0; i < Teacher.length; i++) {
        teacherarry.push(Teacher[i].TeacherName);
      }
      console.log(teacherarry);
      httpmsgs.sendJSON(req, res, { TeacherNamE: teacherarry });
    }
  });
});

router.post("/ajaxcoursegrade", (req, res, next) => {
  var CN = req.body.CN;
  var TN = req.body.TN;
  gradearry = [];
  console.log(CN + "<==>" + TN);
  TM00.find(
    { CourseName: CN, TeacherName: TN },
    { _id: 0, __v: 0 },
    (error, grade) => {
      if (error) {
        console.log(error);
      } else {
        //  console.log(grade)
        for (var i = 0; i < grade.length; i++) {
          gradearry.push(grade[i].CourseGrade);
        }
        //  console.log(gradearry)

        gradefilteredarry = gradearry.filter((item, index) => {
          return gradearry.indexOf(item) === index;
        });
        console.log(gradefilteredarry);
        httpmsgs.sendJSON(req, res, { grades: gradefilteredarry });
      }
    }
  );
});

router.post("/ajaxcourseday", (req, res, next) => {
  var CN = req.body.CN;
  var TN = req.body.TN;
  var CG = req.body.CG;
  console.log(CN + "<==>" + TN + "<==>" + CG);
  dayarry = [];
  TM00.find(
    { CourseName: CN, TeacherName: TN, CourseGrade: CG },
    { _id: 0, __V: 0 },
    (error, day) => {
      if (error) {
        console.log(error);
      } else {
        for (var i = 0; i < day.length; i++) {
          dayarry.push(day[i].CourseDay);
        }
        dayfilteredarry = dayarry.filter((item, index) => {
          return dayarry.indexOf(item) === index;
        });
        httpmsgs.sendJSON(req, res, { days: dayfilteredarry });
      }
    }
  );
});
router.post("/ajaxcoursetime", (req, res, next) => {
  var CN = req.body.CN;
  var TN = req.body.TN;
  var CG = req.body.CG;
  var CD = req.body.CD;
  timearry = [];
  console.log(CN + "=>" + TN + "=>" + CG + "=>" + CD);

  TM00.find(
    { CourseName: CN, TeacherName: TN, CourseGrade: CG, CourseDay: CD },
    { _id: 0, __v: 0 },
    (error, time) => {
      if (error) {
        console.log(error);
      } else {
        //        console.log(time);

        for (var i = 0; i < time.length; i++) {
          timearry.push(time[i].CourseTime);
        }

        httpmsgs.sendJSON(req, res, { time: timearry });
      }
    }
  );
});

router.post("/ajaxcoursecost", (req, res, next) => {
  var CN = req.body.CN;
  var TN = req.body.TN;
  var CG = req.body.CG;
  var CD = req.body.CD;
  var CT = req.body.CT;
  costarry = [];
  console.log(CN + "=>" + TN + "=>" + CG + "=>" + CD + "=>" + CT);
  TM00.find(
    {
      CourseName: CN,
      TeacherName: TN,
      CourseGrade: CG,
      CourseDay: CD,
      CourseTime: CT
    },
    { _id: 0, __v: 0 },
    (error, cost) => {
      for (var i = 0; i < cost.length; i++) {
        costarry.push(cost[i].TotalCost);
      }
      console.log(costarry);
      httpmsgs.sendJSON(req, res, { amount: costarry });
    }
  );
});


router.get("/attend", (req, res, next) => {
  /**
                       <input type="hidden" name="TeacherNameQ" value="{{this.TeacherName}}">
                    <input type="hidden" name="CourseNameQ" value="{{this.CourseName}}">
                    <input type="hidden" name="CourseDayQ" value="{{this.CourseDay}}">
                    <input type="hidden" name="CourseGradeQ" value="{{this.CourseGrade}}">
                    <input type="hidden" name="CourseTimeQ" value="{{this.CourseTime}}">
                    <input type="hidden" name="CourseCost" value="{{this.CourseCost}}">
   */
  // res.render("partials/Attend", { stattend: "active" });
  console.log('get is working too we can use it')
});
router.post("/attend", (req, res, next) => {
  const now = new Date();
  var dat = date.format(now, "DD/MM/YYYY");
  var TNQ = req.body.TeacherNameQ;
  var CNQ = req.body.CourseNameQ;
  var CDQ = req.body.CourseDayQ;
  var CGQ = req.body.CourseGradeQ;
  var CTQ = req.body.CourseTimeQ;
  var CSQ = req.body.TotalCost;
  var co = req.body.CourseCode;
  console.log(
    TNQ +
    "<==>" +
    CNQ +
    "<==>" +
    CDQ +
    "<==>" +
    CGQ +
    "<==>" +
    CTQ +
    "<==>" +
    CSQ
  );
  SM00.find(
    {
      TeacherName: TNQ,
      courseName: CNQ,
      courseDay: CDQ,
      coursegrade: CGQ,
      courseTime: CTQ,
      courseCost: CSQ
    },
    (error, STLIST) => {
      if (error) {
        console.log(error);
      } else {

        // console.log(studentinfo)
        res.render("partials/Attend", { attend: STLIST, stattend: "active", code: co, Date: dat, stattend: "active" });
      }
    }
  );
});

router.post("/putattend", (req, res, next) => {
  const now = new Date();
  var attenddate = date.format(now, "DD/MM/YYYY");
  var studentid = req.body.StudentID;
  var studentname = req.body.StudentName;
  var coursecode = req.body.CourseCode;
  var coursepaid = req.body.CoursePaided;
  //console.log(studentid + "<==>" + studentname + "<==>" + coursecode + "<==>" + attenddate + "<==>" + coursepaid)
  attend.find({}, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      var getallattends = result.length;

      attend.find(
        { StudentID: studentid, CourseCode: coursecode },
        (error, result) => {
          if (error) {
            console.log(error);
          } else {
            var getstudentattendforcourse = result.length;

            attend.find(
              {
                StudentID: studentid,
                CourseCode: coursecode,
                attenddate: attenddate
              },
              (error, checkattend) => {
                //  console.log(checkattend.length)
                var checkking = checkattend.length;
                // IF There is no common data
                attend.find({ CourseCode: coursecode, attenddate: attenddate }, (error, result) => {

                  var coursetotal = result.length
                  if (checkking <= 0) {
                    const attendconfirm = new attend({
                      StudentID: studentid,
                      StudentNam: studentname,
                      totalattend: getallattends + 1,
                      studentattendcounter: getstudentattendforcourse + 1,
                      CourseTotalAttend: coursetotal + 1,
                      attenddate: attenddate,
                      CourseCode: coursecode,
                      AttendChange: true,
                      coursepaid: coursepaid
                    });
                    attendconfirm.save((error, result) => {
                      if (error) {
                        console.log(error);
                      } else {
                        console.log(result);
                      }
                    });
                  } else {
                    //  console.log(checkattend[0].AttendChange)
                    var getattendvalue = checkattend[0].AttendChange;
                    //    console.log('getattendvalue =>', getattendvalue)
                    const changeattendfalse = {
                      AttendChange: false
                    };

                    const changeattendtrue = {
                      AttendChange: true
                    };

                    attend.updateOne(
                      {
                        StudentID: studentid,
                        CourseCode: coursecode,
                        attenddate: attenddate
                      },
                      { $set: changeattendtrue },
                      (error, result) => {
                        if (error) {
                          console.log(error);
                        } else {
                          console.log(result);
                        }
                      }
                    );
                  }

                })
              }


            );
          }
        }
      );
    }
  });
});

router.post("/removeattend", (req, res, next) => {
  const now = new Date();
  var attenddate = date.format(now, "DD/MM/YYYY");
  var studentid = req.body.StudentID;
  var studentname = req.body.StudentName;
  var coursecode = req.body.CourseCode;
  var coursepaid = req.body.CoursePaided;

  attend.find(
    { StudentID: studentid, CourseCode: coursecode, attenddate: attenddate },
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        const attendchangefalse = {
          AttendChange: false
        }
        attend.updateOne({ StudentID: studentid, CourseCode: coursecode, attenddate: attenddate }, { $set: attendchangefalse }, (error, result) => {
          if (error) {
            console.log(error)
          } else {
            console.log(result)
          }
        })
      }
    }
  );
});


router.post('/ajaxattendbutton', async (req, res, next) => {
  await sleep(3000)
  var coursecode = req.body.CCO
  const now = new Date();
  var attenddate = date.format(now, "DD/MM/YYYY");
  attendcounterforhtml = [];
  attend.find({ attenddate: attenddate, CourseCode: coursecode }, (error, result) => {
    if (error) {
      console.log(error)
    }
    else {
      for (var i = 0; i < result.length; i++) {
        var checkfromvaild = result[i].AttendChange
        if (checkfromvaild == true) {
          // console.log('this is true value')
          attendcounterforhtml.push(checkfromvaild)

        }
        //  attendcounterforhtml.push()
        else {

        }
        // console.log('attendcounterforhtml =>', attendcounterforhtml)
      }
      var totalattendpushed = attendcounterforhtml.length;
      httpmsgs.sendJSON(req, res, { getthat: totalattendpushed })
      //   console.log('result=>', result)
    }
  })
})

router.post('/ajaxremovebutton', async (req, res, next) => {
  await sleep(2000)
  var coursecode = req.body.CCO
  const now = new Date();
  var attenddate = date.format(now, "DD/MM/YYYY");
  attendcounterforhtml = [];
  attend.find({ attenddate: attenddate, CourseCode: coursecode }, (error, result) => {
    if (error) {
      console.log(error)
    }
    else {
      for (var i = 0; i < result.length; i++) {
        var checkfromvaild = result[i].AttendChange
        if (checkfromvaild == true) {
          // console.log('this is true value')
          attendcounterforhtml.push(checkfromvaild)

        }
        //  attendcounterforhtml.push()
        else {

        }
        // console.log('attendcounterforhtml =>', attendcounterforhtml)
      }
      var totalattendpushed = attendcounterforhtml.length;
      httpmsgs.sendJSON(req, res, { getthat: totalattendpushed })
      //   console.log('result=>', result)
    }
  })
})


function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
router.get('/login', (req, res, next) => {
  res.render('index', { login: 'hidden' })
})
router.post('/login', (req, res, next) => {
  var username = req.body.Username
  var password = req.body.pass
  login.find({ username: username }, (error, result) => {
    if (error) {
      console.log(error)
    }
    else {
      if (result.length <= 0) {
        console.log("USER NOT FOUND!")
      } else {
        var dbuser = result[0].username
        var dbpass = result[0].password
        bycrypt.compare(password, dbpass, (error, result) => {
          if (error) {
            console.log(error)
          } else {
            if (username == dbuser && result == true) {
              console.log('Login in succfully')
              const logedin = {
                loginvalue: true,
              }
              login.updateOne({ username: username }, { $set: logedin }, (error, result) => {
                if (error) {
                  console.log(error)
                } else {
                  console.log(result)
                }
              })
              res.redirect('/home')
            } if (result == false) {
              console.log('Password Wrong')
              res.redirect('/login')
            }
          }
        })

      }
    }
  })

})

router.get('/logout', (req, res, next) => {
  login.find({}, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      var username = result[0].username
      const logout = {
        loginvalue: false,
      }
      login.updateOne({ username: username }, { $set: logout }, (error, result) => {
        if (error) {
          console.log(error)
        } else {
          console.log(result)
          res.redirect('/login')
        }
      })
    }
  })

})

router.get('/admin', (req, res, next) => {
  res.render('partials/User/ChangePassword', { Active: 'active' })
})
router.post('/admin', (req, res, next) => {
  var current = req.body.old
  var newpass = req.body.new
  login.find({}, (error, result) => {
    var savedpass = result[0].password
    bycrypt.compare(current, savedpass, (error, result) => {
      if (error) {
        console.log(error)
      } else {
        if (result == true) {
          const updatepass = {
            password: bycrypt.hashSync(newpass, 10)
          }
          login.updateOne({ username: 'admin' }, { $set: updatepass }, (error, result) => {
            if (error) {
              console.log(error)
            } else {
              console.log(result)
            }
          })
        } else {
          console.log('current password is wrong')
        }
      }
    })
  })
})

router.post('/testing', (req, res, next) => {
  var TN = req.body.Teachername
  var CC = req.body.coursecode
  var CT = req.body.coursetime
  var CD = req.body.coureseday
  var CG = req.body.coursegrade
  console.log(TN + "=>" + CC + "=>" + CD + "=>" + CG)
  SM00.find({ TeacherName: TN, CourseCode: CC, courseDay: CD }, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      if (result.length <= 0) {
        console.log('There is no Students Yet!:(')
      } else {
        res.render('partials/Teachers/ListStudentForCourse', { data: result })
      }
    }
  })
})
module.exports = router;

