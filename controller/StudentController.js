<<<<<<< HEAD
// Var For CAll Schemas For Students
var StudentReg = require('../models/Student/StudentReg');
var StudentsCourses = require('../models/Student/StudentCourses');
var getcoursecode = require("../models/teacher/TeacherMix");
var login = require('../models/login/login');
//Registeration New Student
StudentRegisteration = (req, res, next) => {
  // Find Function to find the length to put id for new User
  StudentReg.find({}, "Studentid", (error, result) => {
    // Error with database well give us error
    if (error) {
      console.log(error)
    }
    // If It's okey and find the Students Database
    else {
      // variable for get Length of Studentid in database
      var HMStudent = result.length;

      // Collect Data from SChema and Form hbs
      const StudentRegisteration = new StudentReg({
        Studentid: HMStudent + 1,
        StudentName: req.body.StudentName,
        Phones: {
          studentphone: req.body.StudentNumber,
          parentsphone: req.body.StudentParentsPhone,
          whatsappphone: req.body.StudentWhatsappPhone,
        },
        courseGrade: req.body.StudentGrade,
        AnotherData: {
          SchoolName: req.body.StudentSchoolName,
        },
        REGcost: req.body.StudentRegisterationAmount
      })//End Of Collect Data

      //Save Data To Database
      StudentRegisteration.save((error, result) => {
        // If there is error in save
        if (error) {
          console.log(error)
        }
        // Print the result of saving
        else {
          console.log(result)
          res.redirect('/student')
        }
      })
    }//End of Else
  }) // End of find function
};

// Registeration New Course For Student
StudentCourseAdd = (req, res, next) => {
  var coursename = req.body.CourseName
  var teachername = req.body.TeacherName
  var coursegrade = req.body.CourseGRADE_add
  var courseday = req.body.Day
  var coursetime = req.body.time
  var coursecost = req.body.StudentCourseCost
  // console.log(coursename + '=>' + teachername + '=>' + coursegrade + '=>' + courseday + '=>' + coursetime + '=>' + coursecost);

  getcoursecode.find({ CourseName: coursename, TeacherName: teachername, CourseGrade: coursegrade, CourseDay: courseday, CourseTime: coursetime, TotalCost: coursecost }, (error, coursecode) => {
    var code = coursecode[0].CourseCode

    // Variable for get ID from Form

    var StudentID = req.body.StudentIDVal
    // Find If Student in Our Database or not
    StudentReg.find({ Studentid: StudentID }, (error, result) => {
      if (error) {
        //Error is somthing happen
        console.log(error)
      }
      else {
        //Get length of result to check if he exist or not
        var checkifresultarray = result.length;
        //If else for check of empty
        if (checkifresultarray == 0) {
          // Error Message
          console.log('Not Found')
          // If it have value
        } else {
          // Search for Student from Form in Course Students Data Base
          StudentsCourses.find({ StudentIDStatic: StudentID }, (error, result) => {
            // If Somthing Happend
            if (error) {
              console.log(error)
              //If It is okey
            } else {
              // Counter For Spseeefic Student (Count How Course He Reg)
              var StudentCourseCounter = result.length;
              // Get data from Page to put it in Database
              const Studentcourseadd = new StudentsCourses({
                // Get StudentID from page and other data
                StudentIDStatic: req.body.StudentIDVal,
                // 
                StudentCourseID: StudentCourseCounter + 1,
                CourseGrade: req.body.CourseGRADE_add,
                StudentCourseInformation: {
                  CourseName: req.body.CourseName,
                  TeacherName: req.body.TeacherName,
                  CourseCode: code,
                  CourseDay: req.body.Day,
                  CourseTime: req.body.time
                  // missing Course Time Getting @@@@@@@
                },
                StudentCourseCost: req.body.StudentCourseCost,
              })
              // Put Getting Data To Database
              Studentcourseadd.save((error, result) => {
                if (error) {
                  console.log(error)
                }
                else {
                  console.log('Saved Data is:')
                  console.log(result)
                  res.redirect('/student')
                }
              })// End of saved Data Saved

            }// Else
          })//End Of function that add courses to some one


        }

      }
    })
  })
}

// Search for Student
StudentSearch = (req, res, next) => {
  var checksearchoption = req.body.StudentSearchType
  if (checksearchoption == 'ID') {
    //var for get Student ID From User
    var StudentIDSearch = req.body.StudentSearch;
    //Search For Id In DataBase
    StudentReg.find({ Studentid: StudentIDSearch }, '', (error, result) => {
      //If There error Log it
      if (error) {
        console.log(error)
      }
      else {
        // var for check for array is empyte ( User Exist )
        var CheckOfExistforStudent = result.length;
        // IF ElSE FOR Check if array is empyte
        if (CheckOfExistforStudent == 0) {
          //will be editd with sessions
          console.log('Not Found')
        }
        else {
          // if all gone done print result
          console.log(result)
        } // end of else
      }// end for uper else
    })// end of find function
  } else {
    //var for get Student ID From User
    var StudentNameSearch = req.body.StudentSearch;
    //Search For Id In DataBase
    StudentReg.find({ StudentName: StudentNameSearch }, '', (error, result) => {
      //If There error Log it
      if (error) {
        console.log(error)
      }
      else {
        // var for check for array is empyte ( User Exist )
        var CheckOfExistforStudent = result.length;
        // IF ElSE FOR Check if array is empyte
        if (CheckOfExistforStudent == 0) {
          //will be editd with sessions
          console.log('Not Found')
        }
        else {
          // if all gone done print result
          console.log(result)
        } // end of else
      }// end for uper else
    })// end of find function
  }

};

// TABLES

// Student Table

StudentTable = (req, res, next) => {
  login.find({}, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      var checkstatus = user[0].loginvalue
      if (checkstatus == true) {
        //find All Students that registered on our system
        StudentReg.find({}, (error, result) => {
          if (error) {
            console.log(error)
          } else {
            //SEND All Students to the table
            res.render('partials/Students/listStudents', { Student: result })
          }
        })
      } else {
        res.redirect('/login')
      }
    }
  })

}

// Student Course Table

StudentCoursesTable = (req, res, next) => {

  login.find({}, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      var checkstatus = user[0].loginvalue
      if (checkstatus == true) {
        // var for get id from url
        var StudentIDForCourse = req.params.id;
        // Go to Schema and find the student id he get from url
        StudentsCourses.find({ StudentIDStatic: StudentIDForCourse }, (error, result) => {
          // print if somthing happened
          if (error) {
            console.log(error)
          }
          // Render the page with given content from schema
          else {
            res.render('partials/Students/listStudentsCourse', { StudentCourses: result })
          } // End of else
        }) // End of find
      } else {
        res.redirect('/login')
      }
    }
  })


}


module.exports = {
  STREG: StudentRegisteration,
  STCA: StudentCourseAdd,
  STSEA: StudentSearch,
  //tables

  ListStudent: StudentTable,

  StudentsCourse: StudentCoursesTable
}

/**
    login.find({}, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      var checkstatus = user[0].loginvalue
      if (checkstatus == true) {

      } else {
        res.redirect('/login')
      }
    }
  })
=======
// Var For CAll Schemas For Students
var StudentReg = require('../models/Student/StudentReg');
var StudentsCourses = require('../models/Student/StudentCourses');
var getcoursecode = require("../models/teacher/TeacherMix");
var login = require('../models/login/login');
//Registeration New Student
StudentRegisteration = (req, res, next) => {
  // Find Function to find the length to put id for new User
  StudentReg.find({}, "Studentid", (error, result) => {
    // Error with database well give us error
    if (error) {
      console.log(error)
    }
    // If It's okey and find the Students Database
    else {
      // variable for get Length of Studentid in database
      var HMStudent = result.length;

      // Collect Data from SChema and Form hbs
      const StudentRegisteration = new StudentReg({
        Studentid: HMStudent + 1,
        StudentName: req.body.StudentName,
        Phones: {
          studentphone: req.body.StudentNumber,
          parentsphone: req.body.StudentParentsPhone,
          whatsappphone: req.body.StudentWhatsappPhone,
        },
        courseGrade: req.body.StudentGrade,
        AnotherData: {
          SchoolName: req.body.StudentSchoolName,
        },
        REGcost: req.body.StudentRegisterationAmount
      })//End Of Collect Data

      //Save Data To Database
      StudentRegisteration.save((error, result) => {
        // If there is error in save
        if (error) {
          console.log(error)
        }
        // Print the result of saving
        else {
          console.log(result)
          res.redirect('/student')
        }
      })
    }//End of Else
  }) // End of find function
};

// Registeration New Course For Student
StudentCourseAdd = (req, res, next) => {
  var coursename = req.body.CourseName
  var teachername = req.body.TeacherName
  var coursegrade = req.body.CourseGRADE_add
  var courseday = req.body.Day
  var coursetime = req.body.time
  var coursecost = req.body.StudentCourseCost
  // console.log(coursename + '=>' + teachername + '=>' + coursegrade + '=>' + courseday + '=>' + coursetime + '=>' + coursecost);

  getcoursecode.find({ CourseName: coursename, TeacherName: teachername, CourseGrade: coursegrade, CourseDay: courseday, CourseTime: coursetime, TotalCost: coursecost }, (error, coursecode) => {
    var code = coursecode[0].CourseCode

    // Variable for get ID from Form

    var StudentID = req.body.StudentIDVal
    // Find If Student in Our Database or not
    StudentReg.find({ Studentid: StudentID }, (error, result) => {
      if (error) {
        //Error is somthing happen
        console.log(error)
      }
      else {
        //Get length of result to check if he exist or not
        var checkifresultarray = result.length;
        //If else for check of empty
        if (checkifresultarray == 0) {
          // Error Message
          console.log('Not Found')
          // If it have value
        } else {
          // Search for Student from Form in Course Students Data Base
          StudentsCourses.find({ StudentIDStatic: StudentID }, (error, result) => {
            // If Somthing Happend
            if (error) {
              console.log(error)
              //If It is okey
            } else {
              // Counter For Spseeefic Student (Count How Course He Reg)
              var StudentCourseCounter = result.length;
              // Get data from Page to put it in Database
              const Studentcourseadd = new StudentsCourses({
                // Get StudentID from page and other data
                StudentIDStatic: req.body.StudentIDVal,
                // 
                StudentCourseID: StudentCourseCounter + 1,
                CourseGrade: req.body.CourseGRADE_add,
                StudentCourseInformation: {
                  CourseName: req.body.CourseName,
                  TeacherName: req.body.TeacherName,
                  CourseCode: code,
                  CourseDay: req.body.Day,
                  CourseTime: req.body.time
                  // missing Course Time Getting @@@@@@@
                },
                StudentCourseCost: req.body.StudentCourseCost,
              })
              // Put Getting Data To Database
              Studentcourseadd.save((error, result) => {
                if (error) {
                  console.log(error)
                }
                else {
                  console.log('Saved Data is:')
                  console.log(result)
                  res.redirect('/student')
                }
              })// End of saved Data Saved

            }// Else
          })//End Of function that add courses to some one


        }

      }
    })
  })
}

// Search for Student
StudentSearch = (req, res, next) => {
  var checksearchoption = req.body.StudentSearchType
  if (checksearchoption == 'ID') {
    //var for get Student ID From User
    var StudentIDSearch = req.body.StudentSearch;
    //Search For Id In DataBase
    StudentReg.find({ Studentid: StudentIDSearch }, '', (error, result) => {
      //If There error Log it
      if (error) {
        console.log(error)
      }
      else {
        // var for check for array is empyte ( User Exist )
        var CheckOfExistforStudent = result.length;
        // IF ElSE FOR Check if array is empyte
        if (CheckOfExistforStudent == 0) {
          //will be editd with sessions
          console.log('Not Found')
        }
        else {
          // if all gone done print result
          console.log(result)
        } // end of else
      }// end for uper else
    })// end of find function
  } else {
    //var for get Student ID From User
    var StudentNameSearch = req.body.StudentSearch;
    //Search For Id In DataBase
    StudentReg.find({ StudentName: StudentNameSearch }, '', (error, result) => {
      //If There error Log it
      if (error) {
        console.log(error)
      }
      else {
        // var for check for array is empyte ( User Exist )
        var CheckOfExistforStudent = result.length;
        // IF ElSE FOR Check if array is empyte
        if (CheckOfExistforStudent == 0) {
          //will be editd with sessions
          console.log('Not Found')
        }
        else {
          // if all gone done print result
          console.log(result)
        } // end of else
      }// end for uper else
    })// end of find function
  }

};

// TABLES

// Student Table

StudentTable = (req, res, next) => {
  login.find({}, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      var checkstatus = user[0].loginvalue
      if (checkstatus == true) {
        //find All Students that registered on our system
        StudentReg.find({}, (error, result) => {
          if (error) {
            console.log(error)
          } else {
            //SEND All Students to the table
            res.render('partials/Students/listStudents', { Student: result })
          }
        })
      } else {
        res.redirect('/login')
      }
    }
  })

}

// Student Course Table

StudentCoursesTable = (req, res, next) => {

  login.find({}, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      var checkstatus = user[0].loginvalue
      if (checkstatus == true) {
        // var for get id from url
        var StudentIDForCourse = req.params.id;
        // Go to Schema and find the student id he get from url
        StudentsCourses.find({ StudentIDStatic: StudentIDForCourse }, (error, result) => {
          // print if somthing happened
          if (error) {
            console.log(error)
          }
          // Render the page with given content from schema
          else {
            res.render('partials/Students/listStudentsCourse', { StudentCourses: result })
          } // End of else
        }) // End of find
      } else {
        res.redirect('/login')
      }
    }
  })


}


module.exports = {
  STREG: StudentRegisteration,
  STCA: StudentCourseAdd,
  STSEA: StudentSearch,
  //tables

  ListStudent: StudentTable,

  StudentsCourse: StudentCoursesTable
}

/**
    login.find({}, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      var checkstatus = user[0].loginvalue
      if (checkstatus == true) {

      } else {
        res.redirect('/login')
      }
    }
  })
>>>>>>> InCompleated"
 */