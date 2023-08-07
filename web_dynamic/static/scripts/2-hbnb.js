$(document).ready(function() {
    const checkedAmenities = {};

    $('input[type="checkbox"]').on('change', function() {
        const amenityId = $(this).data('id');
        const amenityName = $(this).data('name');

        if ($(this).prop('checked')) {
            checkedAmenities[amenityId] = amenityName;
        }else{
            delete checkedAmenities[amenityId];
        }

        const amenitiesList = Object.values(checkedAmenities).join(', ');
        $('.amenities h4').text(amenitiesList);
    })
})


$(document).ready(function() {
    $.get("http://127.0.0.1:5001/api/v1/status/", function(data, textStatus) {
        if (data.status === "OK") {
            $('div#api_status').addClass("available");
        }else {
            $('div#api_status').removeClass("available")
        }
    })
})
