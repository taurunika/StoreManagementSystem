$(document).ready(function () {
    var tablebody = $("tbody");
    tablebody.attr("id", "myTable");

    var orderTable = $("#order-table");

    var mArr = [];
    const logoutbtn = $("#logout-btn");
    logoutbtn.click(() => {
        localStorage.setItem("loginStatus", false)
        window.location.assign("../index.html")
    })

    $("#search-box").on({
        input: function () {                  //each time the input value changes, it triggers the function
            console.log($(this).val());
            var enteredVal = $(this).val().toLowerCase();

            var searchRes = [];
            for (var i = 0; i < mArr.length; i++) {   //iterating thru array
                if (mArr[i].fullName.toLowerCase().includes(enteredVal)) {
                    console.log(mArr[i]);
                    searchRes.push(mArr[i]);
                }
            }
            renderTable(searchRes);
        },

    });


    function createTable(data) {

        var trow = $("<tr>");
        trow.addClass("table-content");
        var td1 = $("<td>");
        td1.addClass("blur-text").text(data.id);

        var td2 = $("<td>");
        td2.addClass("bold-text");
        var avatarImg = $("<img>");
        avatarImg.attr('src', data.profilePic);
        td2.append(avatarImg);

        var td3 = $("<td>");
        td3.addClass("blur-text").text(data.fullName);

        var td4 = $("<td>");
        td4.addClass("bold-text").text(data.dob.split("-")[0] + " " + data.dob.split("-")[1] + ", " + data.dob.split("-")[2]);

        var td5 = $("<td>");
        td5.addClass("blur-text").text(data.gender);

        var td6 = $("<td>");
        td6.addClass("blur-text").text(data.currentCity + ", " + data.currentCountry);
        trow.append(td1, td2, td3, td4, td5, td6);

        return trow;
    }

    function renderTable(dataArr) {
        tablebody.html("");
        for (var i = 0; i < dataArr.length; i++) {
            tablebody.append(createTable(dataArr[i]));
        }
    }

    $.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users",
        function (response) {
            mArr = response;
            renderTable(mArr);
        }
    );


});
