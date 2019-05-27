$(document).ready(function () {
        var topics = ['michael jordan', 'kobe bryant', 'tim duncan', 'lebron james', 'steph curry', 'kemba walker', 'kawhi leonard', 'damian lillard'];

        // create the topics array buttons
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

                var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + players + "&api_key=P43NACn6c3K90N1gZHgD3PNnEnm8NTTt&limit=9";
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
                            var imageDiv = $('<div>');
                            var imageView = results[j].images.fixed_height.url;
                            var still = results[j].images.fixed_height_still.url;

                            var entryImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                            entryImage.attr('data-state', 'still');
                            $('#entryView').prepend(entryImage);
                            entryImage.on('click', playGif);

                            //something to pull the rating
                            var rating = results[j].rating;
                            var displayRating = $('<p>').text("Rating " + rating);
                            $('entryView').prepend(displayRating);
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
                    }



                )
            }




        )


    }

)