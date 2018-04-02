var xhr = false,
    player = false;

function playerStatus() {
    player = $.ajax({
        url: '/player/status',
        beforeSend: function () {
            if (player && player.readyState !== 4) {
                player.abort();
            }
        },
    }).done(function (status) {
        if (status.mute === true) {
            $('.controls .mute').html('Unmute');
        } else {
            $('.controls .mute').html('Mute');
        }

        if (status.volume !== null) {
            $('.slider').val(status.volume);
        }

        if (status["media-title"] !== null) {
            var title = status["media-title"];
            $('body').addClass('playing');
            if (title.includes('mp3')) {
                $('.now-playing span').html('Fetching Information...');
            } else {
                $('.now-playing span').html(title);
            }
        } else {
            $('body').removeClass('playing');
        }
    });
}

function stopPlayer() {
    xhr = $.ajax({
        url: '/player/stop',
        beforeSend: function () {
            if (xhr && xhr.readyState !== 4) {
                xhr.abort();
            }
        },
    }).done(function (status) {
        if ($('body').hasClass('playing')) {
            $('body').removeClass('playing');
        }
        return status;
    });
}

function renderStations(result) {
    var container = $('.stations').html('');
    $.each(result, function (i, item) {
        if (item.item === 'station') {

            var card = '<div class="col-md-6">' +
                '<div class="card">' +
                '  <div class="image" style="background-image: url(' + item.image + ')"></div>' +
                '  <div class="card-body">' +
                '    <h5 class="card-title text-truncate">' + item.text + '</h5>' +
                '    <a href="/radio/play/' + item.guide_id + '" class="card-link play-stream">Play</a>' +
                '  </div>' +
                '</div>' +
                '</div>';

            container.append(card);
        }
    });
}

$(document).ready(function () {

    if ($('.stations').length) {
        xhr = $.ajax({
            url: "/radio/stations",
            beforeSend: function () {
                if (xhr && xhr.readyState !== 4) {
                    xhr.abort();
                }
            },
        }).done(function (result) {
            renderStations(result);
        });
    }

    $('.stations').on('click', '.play-stream', function (e) {
        e.preventDefault();

        let url = $(this).attr('href');

        xhr = $.ajax({
            url: url,
            beforeSend: function () {
                if (xhr && xhr.readyState !== 4) {
                    xhr.abort();
                }
            },
        }).done(function () {
            playerStatus();
        });

        return false;
    });

    $('.volume-slider .slider').on('change', function (e) {
        e.preventDefault();

        let level = $(this).val();

        xhr = $.ajax({
            url: '/player/volume',
            method: 'POST',
            data: {
                'volume': level
            },
            beforeSend: function () {
                if (xhr && xhr.readyState !== 4) {
                    xhr.abort();
                }
            },
        });
    });

    $('.volume-slider .stop').on('click', function (e) {
        e.preventDefault();
        stopPlayer();
        return false;
    });

    $('.volume-slider .mute').on('click', function (e) {
        e.preventDefault();
        var $this = $(this);

        xhr = $.ajax({
            url: '/player/mute',
            beforeSend: function () {
                if (xhr && xhr.readyState !== 4) {
                    xhr.abort();
                }
            },
        }).done(function (status) {
            if (status.message === 'OK' && $this.hasClass('muted')) {
                $this.removeClass('muted');
                $this.html('Mute');
            } else {
                $this.addClass('muted');
                $this.html('Unmute');
            }
        });
    });

    $('.stations-search').on('submit', function (e) {
        e.preventDefault();

        let query = $(this).find('input[name="search"]').val();

        xhr = $.ajax({
            url: '/radio/stations/search',
            method: 'POST',
            data: {
                'query': query,
            },
            beforeSend: function () {
                if (xhr && xhr.readyState !== 4) {
                    xhr.abort();
                }
            },
        }).done(function (result) {
            renderStations(result);
        });

        return false;
    });

    playerStatus();
    setInterval(function () {
        playerStatus();
    }, 5000);
});