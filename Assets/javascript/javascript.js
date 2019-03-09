

$(document).ready(function () {
    console.log("ready")

    //variable array for buttons/ search topics
    var topics = ["ocean", "waterfall", "meditation"];

    //function to create new buttons
    function createButtons() {
        for (i = 0; i < topics.length; i++) {
            var newButton = $("<button>");
            newButton.attr("class", "giphy");
            newButton.text(topics[i]);
            newButton.attr("data-topic", topics[i]);
            $("#newButton").append(newButton);
        }
    }

    //onclick that calls button function and adds  user input to array
    $("#create-new-button").on("click", function () {

        console.log("hit")
        console.log($("textarea").val().trim());
        topics.push($("textarea").val().trim());
        console.log(topics);
        $("#newButton").html("");
        var a = $("<button>");
        createButtons();
    })

    //onclick event for API GET
    $("#newButton").on("click", "button", function () {
        $("#gif").html("");

        var topic = $(this).attr("data-topic");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topic + "&api_key=Bj0reKXOEaN4IUdyNnU5ZNFUrh2Z5uRs&limit=4";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;

                //for loop that adds received data to an array and creates new elements to place them in dynamically
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
    //onclick for animate/still of individual gifs. Had to grab them by 
    //class as well as the element and id because previous for loop was only worrking on every other gif
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


    //function call to create first 3 buttons from array items before onclick event
    createButtons();



});



