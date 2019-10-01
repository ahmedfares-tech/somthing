$(document).ready(() => {
    $("#TeacherNamediv").hide();
    $("#CourseGradeDIV").hide();
    $("#CourseDay").hide();
    $("#CourseTimeDIV").hide();
    //Course Name Retive
    $("#StudentCourseName").change(e => {
        e.preventDefault();
        $("#TeacherName").empty();
        $("#CourseGRADE_add").empty();
        $("#coda").empty();
        $("#CourseTime").empty();
        $("#CourseCost").empty();
        $("#CourseGradeDIV").hide();
        $("#CourseDay").hide();
        $("#CourseTimeDIV").hide();
        $("#ButtonAddCourse").empty();
        $("#CourseCost").empty();
        var coursename = $("#StudentCourseName").val();
        $("#TeacherNamediv").show();
        $.post(
            "/ajaxcoursename",
            { coursenameretive: coursename },
            res => {
                var teacherretive = res.TeacherNamE;
                //   console.log(teacherretive)
                $("#TeacherName").append("<option>Choose Teacher Name</option>");
                $.each(teacherretive, (error, teachername) => {
                    $("#TeacherName").append("<option>" + teachername + "</option>");
                });
            },
            "json"
        );
    });
    //Course Name Retive
    //Course Grade Retive
    $("#TeacherName").change(e => {
        e.preventDefault();
        $("#CourseGRADE_add").empty();
        $("#coda").empty();
        $("#CourseTime").empty();
        $("#CourseDay").hide();
        $("#CourseTimeDIV").hide();
        $("#ButtonAddCourse").empty();
        $("#CourseCost").empty();
        var coursename = $("#StudentCourseName").val();
        var TeacherNAME = $("#TeacherName").val();
        $("#CourseGradeDIV").show();
        $.post(
            "/ajaxcoursegrade",
            { CN: coursename, TN: TeacherNAME },
            res => {
                var grade = res.grades;
                $("#CourseGRADE_add").append("<option>Choose Grade</option>");
                $.each(grade, (error, result) => {
                    $("#CourseGRADE_add").append("<option>" + result + "</option>");
                });
            },
            "json"
        );
    });

    //     Course Grade Retive
    //     CourseDay Retive
    $("#CourseGRADE_add").change(e => {
        e.preventDefault();
        $("#coda").empty();
        $("#CourseTime").empty();
        $("#CourseCost").empty();
        $("#CourseTimeDIV").hide();
        $("#ButtonAddCourse").empty();
        $("#CourseCost").empty();
        var coursename = $("#StudentCourseName").val();
        var TeacherNAME = $("#TeacherName").val();
        var CourseGrade = $("#CourseGRADE_add").val();
        $("#coda").append("<option>Choose Course Day</option>");
        $("#CourseDay").show();
        $.post(
            "/ajaxcourseday",
            { CN: coursename, TN: TeacherNAME, CG: CourseGrade },
            res => {
                var days = res.days;
                $.each(days, (error, result) => {
                    $("#coda").append("<option>" + result + "</option>");
                });
            },
            "json"
        );
    });
    //CourseTime Retive
    $("#coda").change(e => {
        e.preventDefault();
        $("#CourseTime").empty();
        $("#CourseCost").empty();
        $("#CourseTimeDIV").hide();
        $("#ButtonAddCourse").empty();
        $("#CourseCost").empty();
        var coursename = $("#StudentCourseName").val();
        var TeacherNAME = $("#TeacherName").val();
        var CourseGrade = $("#CourseGRADE_add").val();
        var courseday = $("#coda").val();
        //CourseTime Retive
        $("#CourseTimeDIV").show();
        $("#CourseTime").append("<option> Choose Your Time</option>");
        $.post(
            "/ajaxcoursetime",
            { CN: coursename, TN: TeacherNAME, CG: CourseGrade, CD: courseday },
            res => {
                var time = res.time;

                $.each(time, (error, result) => {
                    $("#CourseTime").append("<option>" + result + "</option>");
                });
            }
        );
    });

    $("#CourseTime").change(e => {
        e.preventDefault();

        $("#ButtonAddCourse").empty();
        var coursename = $("#StudentCourseName").val();
        var TeacherNAME = $("#TeacherName").val();
        var CourseGrade = $("#CourseGRADE_add").val();
        var courseday = $("#coda").val();
        var coursetime = $("#CourseTime").val();
        $.post(
            "/ajaxcoursecost",
            {
                CN: coursename,
                TN: TeacherNAME,
                CG: CourseGrade,
                CD: courseday,
                CT: coursetime
            },
            res => {
                var cost = res.amount;
                console.log(cost);
                //   console.log(cost)
                //    $('#CourseCost').append('<label>Working</label>')
                $("#CourseCost").empty();
                $("#CourseCost").append(
                    "<label>Course Cost: " +
            cost +
            "</label><div class= \"input-group\" id = \"costcont\"><input type=\"text\" class=\"form-control\" name=\"StudentCourseCost\" id=\"costt\" value=\"" +
            cost +
            "\" hidden><div class=\"input-group-append\"><span class=\"input-group-text\" hidden>L.E</span></div></div>"
                );
                $("#ButtonAddCourse").append(
                    "<button type=\"submit\" class=\"btn btn-dark\">Add to student</button>"
                );
            }
        );
    });
});

// $(document).ready(() => {
//     $('#studentcourseame').change((e) => {
//         e.preventDefault();
//         var text = $('#Courses').val();
//         $.post('/testajax', { data: text }, (res => {
//             var data = res.server
//             $('#Tach').empty();
//             $('#Tach').append('<option>Choose Teacher Name</option>')
//             $.each(data, (error, result) => {
//                 console.log(result)
//                 var datalength = result.length
//                 $('#Tach').append('<option>' + result.TeacherName + '</option>')
//             })
//         }), 'json')
//     })
// })
