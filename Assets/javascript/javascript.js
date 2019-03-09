

$(document).ready(function () {
    console.log("ready")
    var topics = ["booze", "swimming", "traveling"];


    $("#create-new-button").on("click", function () {

        console.log("hit")
        console.log($("textarea").val().trim());
        topics.push($("textarea").val().trim());
        console.log(topics);
        $("#newButton").html("");
        var a = $("<button>");

    
        //giphy
       

        //create an aray with input data 
        //create an onclick function that creates button for nweest index in array.
        //send the input data to the giphy api
    })

    //giphy
    $("#newButton").on("click", "button", function () {
        $("#gif").html("");
        
       var topic= $(this).attr("data-topic");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topic + "&api_key=Bj0reKXOEaN4IUdyNnU5ZNFUrh2Z5uRs&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        var gifDiv = $("<div>");
                        var rating = results[i].rating;
                        var p = $("<p>").text("Rating: " + rating);
                        var inputImage = $("<img>");
                        inputImage.attr("src", results[i].images.fixed_height_still.url);
                        inputImage.attr("data-state", "still");
                        inputImage.attr("data-still", results[i].images.fixed_height_still.url);
                        inputImage.attr("data-animate", results[i].images.fixed_height.url);
                        inputImage.attr("class", "gif")

                        gifDiv.append(p);
                        gifDiv.append(inputImage);

                        $("#gif").prepend(gifDiv);
                        console.log(results);

                    }
                }

            });

    });
    
    $("div#gif").on("click", ".gif", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    createButtons();



});
