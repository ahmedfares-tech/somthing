<<<<<<< HEAD
// Var For CAll Schemas For Teachers
var TeacherREG = require('../models/teacher/TeacherReg');
var TeacherData = require('../models/teacher/TeacherData');
var coursescode = require('../models/Global/CoursesCodes');

TeacherRegistertion = (req, res, next) => {
  // Find All Teacher for give new teacher second ID
  TeacherREG.find({}, (error, result) => {
    // If Happen Any Error
    if (error) {
      console.log(error)
    }

    else {
      // variable to get length of teacher Schema
      var newteacherid = result.length;
      // Save data in (newteacher) to start store it 
      const newteacher = new TeacherREG({
        TeacherID: newteacherid + 1,
        TeacherName: req.body.TeacherName,
        TeacherNumber: req.body.TeacherNumber,
        TeacherCourse: req.body.TeacherCourse
      })
      //Store Data from (newteacher) in Schema
      newteacher.save((error, result) => {
        //If Error Happing
        if (error) {
          console.log(error)
        }
        else {
          console.log(result)
        }
      }) // End of Storing Data
    }
  }) // End of Function
}

TeacherCourseRegisteration = (req, res, next) => {
  var GetTeacherIDFORM = req.body.TEACHERIDCHECK
  TeacherREG.find({ TeacherID: GetTeacherIDFORM }, (error, result) => {
    if (error) {
      console.log(error)
    }
    else {
      var Teachercoursename = result[0].TeacherCourse.substring(0, 3)
      var TeacherNameForCode = result[0].TeacherName

      console.log(TeacherNameForCode)
      var CheckTeacherExist = result.length;
      if (CheckTeacherExist <= 0) {
        console.log('UserNotFound')
      }
      else {
        TeacherData.find({ TeacherStaticID: GetTeacherIDFORM }, (error, result) => {
          if (error) {
            console.log(error)
          }
          else {
            var TeacherCounterCourse = result.length
            coursescode.find({}, (error, result) => {
              if (error) {
                console.log(error);
              } else {
                var CoursesCodeCounter = result.length + 100
                const TeacherInfo = new TeacherData({
                  TeacherStaticID: GetTeacherIDFORM,
                  TeacherCourseCounter: TeacherCounterCourse + 1,
                  TeacherCourseGrade: req.body.Grade,
                  TeacherCourseTime: {
                    CourseDay: req.body.Day,
                    CourseTime: req.body.TH + ':' + req.body.TM + ' ' + req.body.TAP

                  },
                  CourseCode: Teachercoursename + CoursesCodeCounter,
                  TotalCost: req.body.TotalCost,
                  TeacherCost: req.body.TeacherCost,
                  CenterCost: req.body.CenterCost
                })
                const coursecode = new coursescode({
                  TeacherID: GetTeacherIDFORM,
                  TeacherName: TeacherNameForCode,
                  CourseCode: Teachercoursename + CoursesCodeCounter,
                })
                TeacherInfo.save((error, result) => {
                  if (error) {
                    console.log(error)
                  }
                  else {
                    coursecode.save((error, result) => {
                      if (error) {
                        console.log(error)
                      } else {
                       // console.log(result)
                      }
                    })
                     console.log(result)
                  }
                })
              }
            })

          }
        })
      }

    }
  })
}

TeacherSearch = (req, res, next) => {
  var check = req.body.TeacherSearchType;
  if (check == 'ID') {
    var TeacherSearchID = req.body.TeacherSearch;
    TeacherREG.find({ TeacherID: TeacherSearchID }, (error, result) => {
      if (error) {
        console.log(error)
      }
      else {
        var CheckEmptyArray = result.length;
        if (CheckEmptyArray <= 0) {
          console.log('Not Found')
        }
        else {
          console.log(result)
        }
      }
    })
  }
  else {
    var TeacherSearchName = req.body.TeacherSearch;
    TeacherREG.find({ TeacherName: TeacherSearchName }, (error, result) => {
      if (error) {
        console.log(error)
      }
      else {
        var CheckEmptyArray = result.length;
        if (CheckEmptyArray <= 0) {
          console.log('Not Found')
        }
        else {
          console.log(result)
        }
      }
    })
  }
}


module.exports = {
  TCREG: TeacherRegistertion,
  TCCREG: TeacherCourseRegisteration,
  TCSEA: TeacherSearch
=======
// Var For CAll Schemas For Teachers
var TeacherREG = require('../models/teacher/TeacherReg');
var TeacherData = require('../models/teacher/TeacherData');
var coursescode = require('../models/Global/CoursesCodes');

TeacherRegistertion = (req, res, next) => {
  // Find All Teacher for give new teacher second ID
  TeacherREG.find({}, (error, result) => {
    // If Happen Any Error
    if (error) {
      console.log(error)
    }

    else {
      // variable to get length of teacher Schema
      var newteacherid = result.length;
      // Save data in (newteacher) to start store it 
      const newteacher = new TeacherREG({
        TeacherID: newteacherid + 1,
        TeacherName: req.body.TeacherName,
        TeacherNumber: req.body.TeacherNumber,
        TeacherCourse: req.body.TeacherCourse
      })
      //Store Data from (newteacher) in Schema
      newteacher.save((error, result) => {
        //If Error Happing
        if (error) {
          console.log(error)
        }
        else {
          console.log(result)
        }
      }) // End of Storing Data
    }
  }) // End of Function
}

TeacherCourseRegisteration = (req, res, next) => {
  var GetTeacherIDFORM = req.body.TEACHERIDCHECK
  TeacherREG.find({ TeacherID: GetTeacherIDFORM }, (error, result) => {
    if (error) {
      console.log(error)
    }
    else {
      var Teachercoursename = result[0].TeacherCourse.substring(0, 3)
      var TeacherNameForCode = result[0].TeacherName

      console.log(TeacherNameForCode)
      var CheckTeacherExist = result.length;
      if (CheckTeacherExist <= 0) {
        console.log('UserNotFound')
      }
      else {
        TeacherData.find({ TeacherStaticID: GetTeacherIDFORM }, (error, result) => {
          if (error) {
            console.log(error)
          }
          else {
            var TeacherCounterCourse = result.length
            coursescode.find({}, (error, result) => {
              if (error) {
                console.log(error);
              } else {
                var CoursesCodeCounter = result.length + 100
                const TeacherInfo = new TeacherData({
                  TeacherStaticID: GetTeacherIDFORM,
                  TeacherCourseCounter: TeacherCounterCourse + 1,
                  TeacherCourseGrade: req.body.Grade,
                  TeacherCourseTime: {
                    CourseDay: req.body.Day,
                    CourseTime: req.body.TH + ':' + req.body.TM + ' ' + req.body.TAP

                  },
                  CourseCode: Teachercoursename + CoursesCodeCounter,
                  TotalCost: req.body.TotalCost,
                  TeacherCost: req.body.TeacherCost,
                  CenterCost: req.body.CenterCost
                })
                const coursecode = new coursescode({
                  TeacherID: GetTeacherIDFORM,
                  TeacherName: TeacherNameForCode,
                  CourseCode: Teachercoursename + CoursesCodeCounter,
                })
                TeacherInfo.save((error, result) => {
                  if (error) {
                    console.log(error)
                  }
                  else {
                    coursecode.save((error, result) => {
                      if (error) {
                        console.log(error)
                      } else {
                       // console.log(result)
                      }
                    })
                     console.log(result)
                  }
                })
              }
            })

          }
        })
      }

    }
  })
}

TeacherSearch = (req, res, next) => {
  var check = req.body.TeacherSearchType;
  if (check == 'ID') {
    var TeacherSearchID = req.body.TeacherSearch;
    TeacherREG.find({ TeacherID: TeacherSearchID }, (error, result) => {
      if (error) {
        console.log(error)
      }
      else {
        var CheckEmptyArray = result.length;
        if (CheckEmptyArray <= 0) {
          console.log('Not Found')
        }
        else {
          console.log(result)
        }
      }
    })
  }
  else {
    var TeacherSearchName = req.body.TeacherSearch;
    TeacherREG.find({ TeacherName: TeacherSearchName }, (error, result) => {
      if (error) {
        console.log(error)
      }
      else {
        var CheckEmptyArray = result.length;
        if (CheckEmptyArray <= 0) {
          console.log('Not Found')
        }
        else {
          console.log(result)
        }
      }
    })
  }
}


module.exports = {
  TCREG: TeacherRegistertion,
  TCCREG: TeacherCourseRegisteration,
  TCSEA: TeacherSearch
>>>>>>> InCompleated"
}