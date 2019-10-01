$(document).ready(() => {
    var attendbutton = document.getElementsByName("attendadd")
    var removebutton = document.getElementsByName('attendremove')
    var coursecode = document.getElementById('coursecod').value
    $(attendbutton).click((e) => {

        $.post(

            "/ajaxattendbutton",
            { CCO: coursecode },
            res => {
                console.log(res.getthat)
                $('#counter').empty();
                $('#counter').append(res.getthat)
            },

        );
    })
    $(removebutton).click((e) => {
        $.post(

            "/ajaxremovebutton",
            { CCO: coursecode },
            res => {
                console.log(res.getthat)
                $('#counter').empty();
                $('#counter').append(res.getthat)
            },

        );
    })
}, 10000)