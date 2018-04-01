$(document).ready(function () {
    if ($('.stations').length) {
        $.ajax({
            url: "/tunein/stations",
        }).done(function (result) {
            let container = $('.stations');
            $.each(result, function (i, item) {
                let card = '<div class="col-sm-6 col-md-4 col-lg-3">' +
                    '<div class="card">' +
                    '  <img class="card-img-top" src="' + item.image + '" alt="Card image cap">' +
                    '  <div class="card-body">' +
                    '    <h5 class="card-title">' + item.text + '</h5>' +
                    '    <h6 class="card-subtitle mb-2 text-muted">' + item.subtext + '</h6>' +
                    '    <a href="/tunein/play/' + item.guide_id + '" class="card-link play-stream">Play</a>' +
                    '    <a href="/tunein/stop/" class="card-link stop-stream">Stop</a>' +
                    '  </div>' +
                    '</div>' +
                    '</div>';

                container.append(card);
            });
        });
    }

    $('.stations').on('click', '.play-stream', function (e) {
        e.preventDefault();

        let url = $(this).attr('href');

        $.ajax({
            url: url,
        }).done(function () {
            console.log('Playing');
        });

        return false;
    });

    $('.stations').on('click', '.stop-stream', function (e) {
        e.preventDefault();

        let url = $(this).attr('href');

        $.ajax({
            url: url,
        }).done(function (status) {
            console.log(status);
        });

        return false;
    });
});