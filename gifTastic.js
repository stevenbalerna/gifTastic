$(document).ready(function () {
    var topics = ['michael jordan', 'kobe bryant', 'tim duncan', 'lebron james', 'steph curry', 'kemba walker', 'kawhi leonard', 'damian lillard'];

    // create the topics array buttons, or empty and add a new button
    function buttonAction() {
        $('#buttons').empty();

        for (var i = 0; i < topics.length; i++) {
            /// create the buttons
            var b = $('<button>');
            b.addClass('expression');
            b.attr('data-name', topics[i]);
            b.text(topics[i]);
            $('#buttons').append(b);
        }
    }
    
    buttonAction();


    // function once buttons are fixed
    $(document).on('click', '.expression', function () {

            var players = $(this).html();

            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + players + "&api_key=P43NACn6c3K90N1gZHgD3PNnEnm8NTTt&limit=10";
            // console.log(queryURL);
            $.ajax({
                    url: queryURL,
                    method: 'GET'
                })
                .done(function (response) {

                    var results = response.data;


                    $('#entryView').empty();
                    // something to loop through the data
                    for (var j = 0; j < results.length; j++) {
                        var imageView = results[j].images.fixed_height.url;
                        var still = results[j].images.fixed_height_still.url;
                        var rating = results[j].rating;
                        
                        // Container to hold the image and rating
                        var imageDiv = $('<div>');
                        
                        // rating
                        var displayRating = $('<p>').text("Rating " + rating);
                        
                        // image 
                        var entryImage = $('<img>')
                            .attr("src", still)
                            .attr('data-animate', imageView)
                            .attr('data-still', still)
                            .attr('data-state', 'still')
                            .attr('class', 'p-2')
                            .on('click', playGif);

                        imageDiv.append(displayRating, entryImage);

                        //something to pull the rating
                        $('#entryView').prepend(imageDiv);
                    }
                });  // response function

                function playGif() { 
                    var state = $(this).attr('data-state');
                    console.log(state);
                    if ( state == 'still'){
                        $(this).attr('src', $(this).data('animate'));
                        $(this).attr('data-state', 'animate');
                    } else {
                        $(this).attr('src', $(this).data('still'));
                        $(this).attr('data-state', 'still');
                    }

                }




            // feature to add new button


    });

    // handler for addng a new button to the page (for gifs!)
    $(document).on('click', '#addEntry', function(){
        if ($('#entry-input').val().trim() == '') {
            alert('Please Add NBA Player');
        } else {
            var players = $('#entry-input').val().trim();
            topics.push(players);
            $('#entry-input').val('');
            buttonAction();
            return false;
        }
    });

});