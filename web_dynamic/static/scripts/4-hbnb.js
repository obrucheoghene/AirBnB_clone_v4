$(document).ready(function () {
    const checkedAmenities = {};

    $('input[type="checkbox"]').on('change', function () {
        const amenityId = $(this).data('id');
        const amenityName = $(this).data('name');

        if ($(this).prop('checked')) {
            checkedAmenities[amenityId] = amenityName;
        } else {
            delete checkedAmenities[amenityId];
        }

        const amenitiesList = Object.values(checkedAmenities).join(', ');
        $('.amenities h4').text(amenitiesList);
    })
})


$(document).ready(function () {
    $.get("http://127.0.0.1:5001/api/v1/status/", function (data, textStatus) {
        if (data.status === "OK") {
            $('div#api_status').addClass("available");
        } else {
            $('div#api_status').removeClass("available")
        }
    })
})

$(document).ready(function () {

    $.post({
        url: "http://127.0.0.1:5001/api/v1/places_search/",
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (response) {

            response.forEach(place => {
                const fetchedPlace = 
                `<article>
                <div class="title_box">
                  <h2>${place.name}</h2>
                  <div class="price_by_night">${place.price_by_night}</div>
                </div>
                <div class="information">
                  <div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 && 's'}</div>
                      <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms != 1 && 's'}</div>
                      <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 && 's'}</div>
                </div>
                <div class="user">
                    </div>
                    <div class="description">
                  ${place.description || 'safe'}
                    </div>
              </article>`;

                $('section.places').append(fetchedPlace);
            });

        },
        error: function (error) {
            console.log('error', error)
        }

    })
})
